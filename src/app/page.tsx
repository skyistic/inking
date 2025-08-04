"use client";
import styles from "./page.module.css";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Topbar from "./components/topbar";
import { Footer } from "./components/footer";
import { useState } from "react";
import CursorTrail from "@/components/CursorTrail";
import InViewPop from "@/components/InViewPop";

const bubbleProperties = "z-30 shadow-[inset_-0px_-0px_20px_#ffffff60] bg-white/40 backdrop-blur-sm rounded-3xl border-1 border border-white/40";
const shadowProperties = "shadow-[0_0px_40px_rgb(0,0,0,0.03)]";
const combinedShadowProperties = "shadow-[inset_0px_2px_10px_rgba(255,255,255,0.6),_0_4px_20px_rgba(0,0,0,0.06)] z-30 bg-white/40 backdrop-blur-sm rounded-3xl border-1 border border-white/40";

const SparkleIcon = ({ color, size }: { color: string, size: number }) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"><g fill="none"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill={color} d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM11 6.094l-.806 2.36a6 6 0 0 1-3.49 3.649l-.25.091l-2.36.806l2.36.806a6 6 0 0 1 3.649 3.49l.091.25l.806 2.36l.806-2.36a6 6 0 0 1 3.49-3.649l.25-.09l2.36-.807l-2.36-.806a6 6 0 0 1-3.649-3.49l-.09-.25zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026-.35l.35-1.027A1 1 0 0 1 19 2" strokeWidth="0.4" stroke={color}/></g></svg>
}

const PaletteIcon = ({ color, size }: { color: string, size: number }) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill={color} d="M12 2c5.523 0 10 4.477 10 10q-.002.975-.18 1.9c-.386 2.004-2.397 2.85-4.082 2.57l-1.74-.29a1.29 1.29 0 0 0-1.124.36c-.37.37-.547.879-.298 1.376c.423.846.429 1.812.055 2.603C14.131 21.58 13.11 22 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16l.195-.002c.258-.01.5-.06.628-.332a1 1 0 0 0-.036-.855c-.63-1.262-.302-2.71.673-3.685a3.29 3.29 0 0 1 2.867-.919l1.74.29c.957.16 1.668-.348 1.789-.975A8 8 0 0 0 12 4m-4.5 7a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m7-4a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m-5 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3" strokeWidth="0.4" stroke={color}/></g></svg>
}

const CalendarIcon = ({ color, size }: { color: string, size: number }) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill={color} d="M16 3a1 1 0 0 1 .993.883L17 4v1h2a2 2 0 0 1 1.995 1.85L21 7v12a2 2 0 0 1-1.85 1.995L19 21H5a2 2 0 0 1-1.995-1.85L3 19V7a2 2 0 0 1 1.85-1.995L5 5h2V4a1 1 0 0 1 1.993-.117L9 4v1h6V4a1 1 0 0 1 1-1m3 9H5v7h14zm0-5H5v3h14z" strokeWidth="0.4" stroke={color} /></g></svg>
}

const BrushIcon = ({ color, size }: { color: string, size: number }) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill={color} d="M20.626 2.483a1.094 1.094 0 0 1 1.39 1.39l-.165.471l-.187.504l-.237.607l-.184.452l-.205.482l-.11.25l-.233.513c-.679 1.455-1.612 3.156-2.728 4.33c-1.065 1.12-2.673 2.153-3.96 2.886a5 5 0 0 1-1.36 4.557c-2.27 2.27-4.807 2.27-6.694 1.71a9.1 9.1 0 0 1-2.864-1.43l-.28-.223l-.585-.495a.394.394 0 0 1 .027-.624l.332-.237c.728-.53 1.479-1.182 1.658-2.08q.048-.25.073-.502l.05-.507a6 6 0 0 1 .074-.504c.138-.689.43-1.471 1.137-2.18a5 5 0 0 1 4.557-1.36c.733-1.287 1.765-2.895 2.886-3.96c1.174-1.116 2.875-2.05 4.33-2.728l.513-.233l.494-.215l.69-.285l.415-.163l.696-.26zm-9.394 10.785a3 3 0 0 0-4.242 0c-.353.352-.506.734-.591 1.157a6 6 0 0 0-.073.504l-.025.253a7 7 0 0 1-.099.757c-.18.904-.709 1.65-1.15 2.148a7.3 7.3 0 0 0 1.471.63c1.384.412 3.09.412 4.71-1.207a3 3 0 0 0 0-4.242m1.479-3.165c-.259.395-.505.798-.732 1.19a5 5 0 0 1 1.228 1.228c.391-.227.795-.473 1.19-.732l-.03-.067a3.3 3.3 0 0 0-.66-.93a3.4 3.4 0 0 0-.817-.603zm6.71-5.025c-.383.159-.799.34-1.229.54c-1.408.657-2.866 1.48-3.796 2.364q-.236.225-.47.493c.362.2.782.49 1.195.904c.414.413.703.833.904 1.195q.268-.234.493-.47c.884-.93 1.707-2.388 2.364-3.797c.2-.43.38-.846.54-1.229M6 1a1 1 0 0 1 .898.56l.048.117l.13.378a3 3 0 0 0 1.684 1.8l.185.07l.378.129a1 1 0 0 1 .117 1.844l-.117.048l-.378.13a3 3 0 0 0-1.8 1.684l-.07.185l-.129.378a1 1 0 0 1-1.844.117l-.048-.117l-.13-.378a3 3 0 0 0-1.684-1.8l-.185-.07l-.378-.129a1 1 0 0 1-.117-1.844l.117-.048l.378-.13a3 3 0 0 0 1.8-1.684l.07-.185l.129-.378A1 1 0 0 1 6 1m0 3.196A5 5 0 0 1 5.196 5q.448.355.804.804q.355-.448.804-.804A5 5 0 0 1 6 4.196" strokeWidth="0.4" stroke={color}/></g></svg>
}


const TextBubble = ({ text, className }: { text: string, className?: string }) => {
  return (
    <div className={`relative z-30 flex flex-col items-start justify-center gap-2 p-3 md:p-4 ${combinedShadowProperties} ${className}`}>
      <SparkleIcon color="black" size={20} />
      <span className="text-sm md:text-base text-start whitespace-pre-wrap">
        {text}
      </span>
    </div>
  );
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("Track");

  return (
    <main className="relative bg-white w-screen min-h-screen flex flex-col items-center justify-center">
    
      <div className="relative z-20">
        <CursorTrail />
      </div>

      {/* Topbar */}
      <div className="relative z-50 w-full flex flex-row items-center justify-between px-4 md:px-6 py-4">
        <img src="https://i.imgur.com/SVrdyVm.png" alt="logo" className="w-auto h-8 md:h-10" />
        <div className="flex flex-row items-center justify-center gap-4">
          <button onClick={() => {
            const about = document.getElementById('about');
            if (about) {
              about.scrollIntoView({ behavior: 'smooth' });
            }
          }} className="bg-black px-4 md:px-5 py-2.5 md:py-3 rounded-3xl flex items-center justify-center mr-3 md:mr-6">
            <span className="text-white text-sm tracking-wide font-medium">About</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center px-4">
        {/* Main INKING Title */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: 0, stiffness: 300, damping: 60 }}
          className="relative z-10 mb-6 md:mb-8"
        >
          <img src="https://i.imgur.com/9yAk7pa.png" alt="logo" className="w-full h-20 md:h-32 max-w-md md:max-w-none" />
        </motion.div>

        {/* Subtitle */}
        <motion.div 
          className="mb-8 md:mb-12 max-w-2xl px-4"
        >
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed">
            Supercharge your artistic journey with data-driven insights and personalized recommendations.
          </p>
        </motion.div>

        <motion.div 
          className="relative z-30 mb-12 md:mb-16 w-full max-w-4xl px-4"
        >
          <div className="bg-white/80 backdrop-blur-lg border border-gray-500/10 rounded-3xl gap-4 flex flex-col px-4 md:px-6 py-4 md:py-5 shadow-[inset_-0px_-0px_40px_#4646460A]">
            {/* Input Area */}
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="How can I help you today?"
                className="w-full bg-transparent text-gray-200 placeholder-gray-400 text-base md:text-lg outline-none"
                style={{ fontSize: '16px' }}
              />
            </div>
            <div className="flex w-full items-center justify-between gap-3 md:gap-4">
              {/* Left Action Buttons */}
              <div className="flex gap-2">
              <button className="w-8 h-8 md:w-10 md:h-10 border border-gray-400 rounded-xl flex items-center justify-center opacity-50">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-300" fill="none" stroke="#ef5d60" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <button className="w-8 h-8 md:w-10 md:h-10 border border-gray-400 rounded-xl flex items-center justify-center opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="md:w-6 md:h-6"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#ec4067" d="M5.636 10.586a3.5 3.5 0 1 1 4.95-4.95l7.778 7.778a3.5 3.5 0 0 1-4.95 4.95l-4.066-4.066a1.25 1.25 0 1 1 1.768-1.768l3.712 3.713a1 1 0 0 0 1.415-1.415l-3.713-3.712a3.25 3.25 0 0 0-4.596 4.596L12 19.778A5.5 5.5 0 1 0 19.778 12L12 4.222A5.5 5.5 0 1 0 4.222 12l.353.353A1 1 0 1 0 5.99 10.94z" strokeWidth="0.4" stroke="#ec4067"/></g></svg>
                </button>
                <button className="w-8 h-8 md:w-10 md:h-10 border border-gray-400 rounded-xl flex items-center justify-center opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="md:w-6 md:h-6"><g fill="none" fillRule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="#a01a7d" d="M18 14a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2h-2a1 1 0 1 1 0-2h2v-2a1 1 0 0 1 1-1M16 3a1 1 0 0 1 1 1v1h2a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1H5v7h6a1 1 0 1 1 0 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2V4a1 1 0 0 1 2 0v1h6V4a1 1 0 0 1 1-1m3 4H5v3h14z" strokeWidth="0.4" stroke="#a01a7d"/></g></svg>
                </button>
              </div>
              
              {/* Right Side - Model and Send */}
              <div className="flex items-center gap-4">
                
                {/* Send Button */}
                <button className="w-8 h-8 md:w-10 md:h-10 bg-[#e09f7d] rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2">
          <p className="text-gray-600 text-sm">
            Powered by <a href="https://artfol.app/?utm_source=inking" className="underline font-medium">Artfol</a>
          </p>
        </div>
      </div>

      <div className="w-full bg-gray-300 py-10 grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:gap-8 items-center justify-center text-center px-8 md:px-8 md:overflow-x-auto">
        <img src="/images/1003.png" alt="logo" className="opacity-90 w-auto h-10 sm:h-14 invert justify-self-center md:flex-shrink-0" />
        <img src="/images/1000.png" alt="logo" className="opacity-90 w-auto h-12 sm:h-16 justify-self-center md:flex-shrink-0" />
        <img src="/images/1001.png" alt="logo" className="opacity-90 w-auto h-10 sm:h-14 invert brightness-0 justify-self-center md:flex-shrink-0" />
        <img src="/images/1002.png" alt="logo" className="opacity-90 w-auto h-12 sm:h-16 invert justify-self-center md:flex-shrink-0" />
      </div>


      <div className="max-w-[1200px] relative pb-0 sm:pb-10 pt-10  z-10 w-full h-fit flex flex-col md:flex-row items-center justify-center text-center px-4 md:px-8 gap-4">
        <div className="relative z-20 w-full h-full flex sm:hidden flex-col items-center justify-center mt-8 md:mt-0">
          <InViewPop>
            <img src="https://i.imgur.com/jd4eu4G.png" alt="logo" className="p-3 md:p-6 w-full h-auto" />
          </InViewPop>
        </div>
        <div className="relative z-20 w-full h-full flex flex-col items-center justify-center">
          <div className="relative w-full md:pl-[10%] aspect-[1]">
            <InViewPop action="up">
              <img src="https://i.imgur.com/Z9B4BpX.jpg" alt="logo" className={`w-full object-cover rounded-2xl ${shadowProperties}`} />
            </InViewPop>
            <div className="absolute bottom-4 md:bottom-8 left-2 z-10 flex flex-col items-start justify-center gap-2 md:gap-4">
              <TextBubble text="Increasing the hair contrast by 20% will allow for better background separation." className="text-black/80 font-medium text-start w-5/6 md:w-2/3 text-sm md:text-base" />
              <TextBubble text="Darken the lower third to create better visual weight distribution." className="text-black/80 font-medium text-start w-5/6 md:w-2/3 text-sm md:text-base" />
            </div>
          </div>
        </div>
        <div className="relative z-20 w-full h-full hidden sm:flex flex-col items-center justify-center mt-8 md:mt-0">
          <InViewPop>
            <img src="https://i.imgur.com/jd4eu4G.png" alt="logo" className="p-3 md:p-6 w-full h-auto" />
          </InViewPop>
        </div>
        <div 
          className="absolute left-10 transform -translate-x-1/2 pointer-events-none"
          style={{
            background: 'radial-gradient(50% 50% at 50% 50%, rgba(223, 228, 68, 0.48) 0%, rgba(239, 250, 117, 0) 100%)',
            opacity: 0.4,
            width: '1845px',
            height: '1530px',
            zIndex: -1
          }}
        />
      </div>
      <div className="max-w-[1200px] relative py-10 z-10 w-full h-fit flex flex-col md:flex-row items-stretch justify-center text-center px-4 md:px-8 gap-4">
        <div className={`${shadowProperties} relative z-20 border border-gray-500/10 bg-white rounded-2xl w-full h-full flex flex-col items-start justify-start p-4 md:p-6 gap-3 md:gap-4`}>
          <PaletteIcon color="black" size={28} />
          <span className="text-black/60 text-base md:text-lg font-regular text-start whitespace-pre-wrap">
          Get personalized insights on your composition, color theory, and visual balance.
          </span>
        </div>
        <div className={`${shadowProperties} relative z-20 border border-gray-500/10 bg-white rounded-2xl w-full h-full flex flex-col items-start justify-start p-4 md:p-6 gap-3 md:gap-4`}>
          <CalendarIcon color="black" size={28} />
          <span className="text-black/60 text-base md:text-lg font-regular text-start whitespace-pre-wrap">
          Track your technical progress with detailed analysis of your artistic development.
          </span>
        </div>
        <div className={`${shadowProperties} relative z-20 border border-gray-500/10 bg-white rounded-2xl w-full h-full flex flex-col items-start justify-start p-4 md:p-6 gap-3 md:gap-4`}>
          <BrushIcon color="black" size={28} />
          <span className="text-black/60 text-base md:text-lg font-regular text-start whitespace-pre-wrap">
            Gain deep analysis into your style evolution and technique consistency over time.
          </span>
        </div>
        <div 
          className="absolute top-0 right-0 transform translate-x-1/2 pointer-events-none"
          style={{
            background: 'radial-gradient(50% 50% at 50% 50%, rgba(250, 117, 248, 0.28) 0%, rgba(250, 117, 248, 0) 100%)',
            opacity: 0.4,
            width: '1845px',
            height: '1230px',
            zIndex: -1
          }}
        />
      </div>
      <div className="relative max-w-[1200px] py-10 z-10 w-full h-fit flex flex-col items-stretch justify-center text-center px-4 md:px-8 gap-4">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <InViewPop>
            <img src="/images/1012.png" alt="logo" className="w-auto h-16 md:h-24" />
          </InViewPop>
        </div>
        <div className="flex flex-row items-center justify-center">
          <p className="text-base md:text-lg text-gray-700 font-medium leading-relaxed w-[90%] md:w-[80%] mt-6 text-center">
          Keep a journal of your progress as our data-driven AI model recommends how to improve your work and build a stronger portfolio. Whether you're working on sketches or finished pieces, get real-time insights that help you make better creative decisions.
          </p>
        </div>
        
        {/* Tab Selector */}
        <div className="flex justify-center mb-8">
          <div className={`${combinedShadowProperties.replace("bg-white/40", "")} bg-red-200 rounded-2xl flex flex-row items-center justify-center gap-2 md:gap-4 p-2`}>
            <button
              onClick={() => setActiveTab("Track")}
              className={`px-4 md:px-6 py-2.5 md:py-3 rounded-2xl font-medium transition-all duration-200 text-sm md:text-base ${
                activeTab === "Track"
                  ? `bg-white text-black ${shadowProperties}`
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Track
            </button>
            <button
              onClick={() => setActiveTab("Log")}
              className={`px-4 md:px-6 py-2.5 md:py-3 rounded-2xl font-medium transition-all duration-200 text-sm md:text-base ${
                activeTab === "Log"
                  ? `bg-white text-black ${shadowProperties}`
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Log
            </button>
          </div>
        </div>
        
        {activeTab === "Track" && (
          <div className="w-[95%] sm:w-[95%] ml-0 sm:ml-[5%] relative z-20 w-full pr-0 md:pr-[15%] h-fit">
            <InViewPop action="up">
              <img src={"/images/1011.png"} alt="logo" className={`border-2 border-gray-500/10 w-full h-auto rounded-2xl ${shadowProperties}`} />
            </InViewPop>
            <div style={{bottom: '-10px'}} className="absolute right-2 mr-0 md:mr-[10%] z-10 hidden sm:flex flex-col items-end justify-center gap-2 md:gap-4">
              <TextBubble text="Your sketching pace has improved 40% this month." className="text-black/80 font-medium text-start text-base md:text-xl w-4/5 md:w-1/2" />
              <TextBubble text="Based on your past work, schedule 2.5 hours for character sketches instead of 1.5 hours." className="text-black/80 font-medium text-start text-sm md:text-base w-4/5 md:w-1/2" />
              <TextBubble text="Your finished pieces improve when you sketch the day before coloring. Let sketches sit overnight before coloring." className="text-black/80 font-medium text-start text-sm md:text-base w-4/5 md:w-1/2" />
            </div>
              <div className="mt-4 w-full relative flex sm:hidden flex-col items-end justify-center">
               <span className={` px-4 py-2 text-black/80 font-medium text-start text-base w-full flex flex-row items-center gap-4 justify-center`}>
               <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                 <SparkleIcon color="black" size={28} />
               </div>
               <p>Your sketching pace has improved 40% this month.</p>
               </span>
               <span className={`px-4 py-2 text-black/80 font-medium text-start text-base w-full flex flex-row items-center gap-4 justify-center`}>
               <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                 <SparkleIcon color="black" size={28} />
               </div>
               <p>Based on your past work, schedule 2.5 hours for character sketches instead of 1.5 hours.</p>
               </span>
               <span className={`px-4 py-2 text-black/80 font-medium text-start text-base w-full flex flex-row items-center gap-4 justify-center`}>
               <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                 <SparkleIcon color="black" size={28} />
               </div>
               <p>Your finished pieces improve when you sketch the day before coloring. Let sketches sit overnight before coloring.</p>
               </span>
             </div>
          </div>
        )}
        {activeTab === "Log" && (
          <div className="w-[95%] sm:w-[95%] ml-0 sm:ml-[5%] relative z-20 w-full pr-0 md:pr-[15%] h-fit">
            <InViewPop action="up">
              <img src={"/images/1010.png"} alt="logo" className={`border-2 border-gray-500/10 w-full h-auto rounded-2xl ${shadowProperties}`} />
            </InViewPop>
            <div style={{bottom: '20%'}} className="absolute right-2 mr-0 md:mr-[10%] z-10 hidden sm:flex flex-col items-end justify-center gap-2 md:gap-4">
              <TextBubble text="You abandon portrait projects 2x more often than other subjects. Break portraits into smaller daily goals: Day 1 - structure, Day 2 - features, Day 3 - details to increase completion rate." className="text-black/80 font-medium text-start text-sm md:text-base w-4/5 md:w-1/2" />
            </div>
            <div className="mt-4 w-full relative flex sm:hidden flex-col items-end justify-center gap-2">
              <span className={` p-4 text-black/80 font-medium text-start text-base w-full flex flex-row items-center gap-4 justify-center`}>
              <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                <SparkleIcon color="black" size={28} />
              </div>
              <p>You abandon portrait projects 2x more often than other subjects. Break portraits into smaller daily goals: Day 1 - structure, Day 2 - features, Day 3 - details to increase completion rate.</p>
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="w-full h-full mt-10 flex flex-col items-center justify-center">
        <InViewPop>
          <img src="/images/1013.png" alt="logo" className="w-auto h-16 md:h-24" />
        </InViewPop>
      </div>
      <div className="max-w-[1200px] flex flex-row items-center justify-center px-4">
        <p className="text-base md:text-lg text-gray-700 font-medium leading-relaxed w-[90%] md:w-[80%] mt-6 text-center">
        Ask anything! Inking never alters your art or generates images for you, instead, it offers insights to help you grow and improve as an artist. Stuck for ideas? Get personalized drawing suggestions based on your style, past work, and creative goals. 
        </p>
      </div>
           {/* AI Recommendation Interface */}
      <div className="relative max-w-[1200px] py-12 md:py-16 z-10 w-full h-fit flex flex-col items-center justify-center px-4 md:px-8">
        
        {/* User Input */}
        <div className="w-full max-w-4xl">
          <InViewPop action="up" delay={0.3}>
          <div className={`${shadowProperties} rounded-2xl bg-white p-4 md:p-6 mb-6`}>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <img src="https://cdna.artstation.com/p/assets/images/images/019/512/560/large/madalena-cerda-jpeg-image-0ca401e86692-39.jpg?1563832276" alt="logo" className="w-full h-full rounded-full" />
              </div>
              <p className="text-gray-800 text-base md:text-lg leading-relaxed">
                I want to explore a new subject matter but keep my existing style.
              </p>
            </div>
          </div>
          </InViewPop>
          
          {/* AI Response */}
          <InViewPop action="up" delay={0.4}>
            <div className={`${shadowProperties} rounded-2xl bg-white p-4 md:p-6 mb-6 md:mb-8`}>
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <SparkleIcon color="white" size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-4">
                    Based on your current style and drawing progress, I'd recommend exploring more <strong>action poses</strong>. This will help improve your understanding of anatomy and movement, especially since much of your recent work has focused on still or static figures. I've also put together an action plan tailored to your past progress and drawing speed to help guide you through this next step.
                  </p>
                </div>
              </div>
            </div>
          </InViewPop>
        </div>

        {/* Recommendation Cards */}
        <div className="grid grid-cols-3 w-[200%] sm:w-full max-w-none sm:max-w-4xl gap-4 sm:gap-6">
          
          {/* Card 1 */}
          <InViewPop>
            <div className={`${combinedShadowProperties.replace("border-white/40", "border-gray-300/10")} rounded-2xl p-4 md:p-6 h-full flex flex-col justify-between`}>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">Basic action poses</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium text-sm md:text-base">Sketch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium text-sm md:text-base">Time: 1 - 2 hours</span>
                  </div>
                </div>
              </div>
              <button className="bg-white text-gray-800 px-4 py-2 rounded-xl border border-gray-500/10 font-medium text-sm md:text-base">
                Start Practice
              </button>
            </div>
          </InViewPop>

          {/* Card 2 */}
          <InViewPop>
            <div className={`${combinedShadowProperties.replace("bg-white/40", "").replace("border-white/40", "border-gray-500/10")} bg-white border rounded-2xl p-4 md:p-6 h-full flex flex-col justify-between`}>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">Blocking with colors</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium text-sm md:text-base">Coloring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium text-sm md:text-base">Time: 1 hour</span>
                  </div>
                </div>
              </div>
              <button className={`${combinedShadowProperties.replace("bg-white/40", "").replace("border-white/40", "border-gray-500/10")} bg-white text-gray-800 px-4 py-2 rounded-xl border border-gray-300/10 font-medium text-sm md:text-base`}>
                Start Practice
              </button>
            </div>
          </InViewPop>

          {/* Card 3 */}
          <InViewPop>
            <div className={`${combinedShadowProperties.replace("border-white/40", "border-gray-500/10")} rounded-2xl p-4 md:p-6 h-full flex flex-col justify-between`}>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">Poses with multiple people</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium text-sm md:text-base">Sketch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium text-sm md:text-base">Time: 2 hours</span>
                  </div>
                </div>
              </div>
              <button className="bg-white text-gray-800 px-4 py-2 rounded-xl border border-gray-500/10 font-medium text-sm md:text-base">
                Start Practice
              </button>
            </div>
          </InViewPop>
        </div>

        {/* Background Gradient */}
        <div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 pointer-events-none"
          style={{
            background: 'radial-gradient(50% 50% at 50% 50%, rgba(248, 0, 0, 0.15) 0%, rgba(247, 85, 85, 0) 100%)',
            opacity: 0.5,
            width: '1200px',
            height: '1200px',
            zIndex: -1
          }}
        />
      </div> 
      
      <InViewPop>
        <div className="relative max-w-[1200px] my-10 px-8 z-10 w-full h-fit flex flex-col sm:flex-row items-stretch justify-center text-center gap-4">
          {/* https://mir-s3-cdn-cf.behance.net/project_modules/fs/ab723877268563.5c829061bd6ea.jpg */}
          <div className={`${shadowProperties} relative z-20 w-full sm:aspect-[2] bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row items-center justify-center`}>
            <div className="relative z-20 w-full h-full aspect-[1] min-h-[200px] md:min-h-[400px] flex flex-col items-center justify-center">
              <img src="/images/1014.png" className="absolute top-0 left-0 w-full aspect-square object-cover inset-0" />
            </div>
            <div className="relative z-20 py-8 sm:py-0 w-full h-full gap-4 flex flex-col items-center justify-center px-4 md:px-0">
              <div className="flex flex-col items-start justify-center w-3/4 h-auto z-20">
                <img src="/images/1015.png" alt="logo" className="w-full w-[95%] sm:w-3/4 h-auto" />
              </div>
              <span className="text-black/80 font-semibold text-start text-base md:text-lg w-[95%] sm:w-3/4">
              Every artist is unique, and so is their path to improvement. Inking doesn't give generic advice, it analyzes your specific work patterns, style choices, and creative habits to deliver insights tailored exclusively to you.
              </span>
            </div>
          </div>
          <div 
            className="absolute -z-10 top-0 left-0 transform -translate-x-1/2 -translate-y-[20%] pointer-events-none"
            style={{
              background: 'radial-gradient(50% 50% at 50% 50%, rgba(40, 40, 239, 0.28) 0%, rgba(250, 117, 124, 0) 100%)',
              opacity: 0.4,
              width: '1845px',
              height: '1230px',
              zIndex: 1
            }}
          />
        </div>
      </InViewPop>
      <div id="about" className="relative max-w-[1200px] py-10 my-0 sm:my-10 z-10 w-full h-fit flex flex-col md:flex-row items-stretch justify-center text-center px-4 md:px-8 gap-4">
        <div className="relative z-20 w-full h-full min-h-[300px] md:min-h-[400px] flex flex-col items-center justify-center gap-4">
           <img src="/images/1016.png" className="h-12 md:h-16 w-auto" />
          <span className="text-black/80 font-semibold text-center sm:text-start text-base md:text-lg w-full md:w-3/4">
          We built Artfol to support artists, and now we're building the tools that will help artists of all skills improve.  We believe AI can be used as a tool to help artists grow, and we're excited to see what the future holds.
          <br/><br/>
          Join over 500,000 artists on Artfol today and start sharing art and making friends. 
          </span>
        </div>
        <div className="relative z-10 w-full h-full min-h-[300px] md:min-h-[400px] flex flex-col items-center justify-center">
          <div className="absolute top-0 left-0 w-full h-full bg-black/10 rounded-2xl inset-0 z-20" />
          <img src="https://cdn.dribbble.com/userupload/26085269/file/original-5c358d51927c77fba334cf08483d2841.jpg?resize=752x564&vertical=center" className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl inset-0" />
          <div className="relative z-40 w-full h-full gap-4 flex flex-col items-center justify-center">
            <img src="/images/1017.png" className="w-16 h-16 md:w-20 md:h-20" />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
              window.open('https://artfol.app?utm_source=inking&utm_medium=referral&utm_campaign=inking_bottom_cta', '_blank');
            }} className="relative z-40 bg-white px-4 md:px-5 py-3 md:py-4 rounded-3xl flex items-center justify-center">
              <span className="text-black text-sm md:text-base tracking-wide font-medium">Join Artfol</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-black h-32 md:h-40 flex flex-col items-center justify-center text-center px-4 md:px-8">
        <img src="/images/1018.png" alt="logo" className="w-3/4 md:w-1/2 h-auto invert" />
      </div>
    </main>
  );
}
