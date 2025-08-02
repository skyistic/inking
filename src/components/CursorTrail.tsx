'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    OGL?: any;
  }
}

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<any>(null);
  const sceneRef = useRef<any>(null);
  const linesRef = useRef<any[]>([]);
  const mouseRef = useRef<any>(null);
  const animationIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    let mounted = true;

    const loadOGL = async () => {
      // Dynamically import OGL from CDN
      if (!window.OGL) {
        const script = document.createElement('script');
        script.type = 'module';
        script.innerHTML = `
          import {
            Polyline,
            Renderer,
            Transform,
            Geometry,
            Program,
            Mesh,
            Vec3,
            Vec2,
            Color
          } from "https://cdn.jsdelivr.net/npm/ogl@0.0.32/dist/ogl.mjs";
          
          window.OGL = {
            Polyline,
            Renderer,
            Transform,
            Geometry,
            Program,
            Mesh,
            Vec3,
            Vec2,
            Color
          };
          
          window.dispatchEvent(new CustomEvent('oglLoaded'));
        `;
        document.head.appendChild(script);

        return new Promise((resolve) => {
          window.addEventListener('oglLoaded', resolve, { once: true });
        });
      }
    };

    const initScene = () => {
      if (!mounted || !canvasRef.current || !window.OGL) return;

      const { Renderer, Transform, Polyline, Vec3, Color } = window.OGL;

      // Vertex shader
      const vertex = `
        attribute vec3 position;
        attribute vec3 next;
        attribute vec3 prev;
        attribute vec2 uv;
        attribute float side;

        uniform vec2 uResolution;
        uniform float uDPR;
        uniform float uThickness;

        vec4 getPosition() {
            vec2 aspect = vec2(uResolution.x / uResolution.y, 1);
            vec2 nextScreen = next.xy * aspect;
            vec2 prevScreen = prev.xy * aspect;

            vec2 tangent = normalize(nextScreen - prevScreen);
            vec2 normal = vec2(-tangent.y, tangent.x);
            normal /= aspect;
            normal *= 1.0 - pow(abs(uv.y - 0.5) * 1.9, 2.0);

            float pixelWidth = 1.0 / (uResolution.y / uDPR);
            normal *= pixelWidth * uThickness;

            float dist = length(nextScreen - prevScreen);
            normal *= smoothstep(0.0, 0.02, dist);

            vec4 current = vec4(position, 1);
            current.xy -= normal * side;
            return current;
        }

        void main() {
            gl_Position = getPosition();
        }
      `;

      const renderer = new Renderer({ 
        canvas: canvasRef.current,
        dpr: 2,
        alpha: true,
        premultipliedAlpha: false
      });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0); // Transparent background
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      const scene = new Transform();
      const lines: any[] = [];
      const mouse = new Vec3();

      rendererRef.current = renderer;
      sceneRef.current = scene;
      linesRef.current = lines;
      mouseRef.current = mouse;

      // Helper function for random values
      const random = (a: number, b: number) => {
        const alpha = Math.random();
        return a * (1.0 - alpha) + b * alpha;
      };

      // Color palette for random selection
      const colors = ["#e09f7d", "#ef5d60", "#ec4067", "#a01a7d", "#311847"];
      
      // Create a single line with color animation
      const colorUniform = { value: new Color(colors[0]) };
      const line = {
        spring: random(0.03, 0.06),
        friction: random(0.8, 0.9),
        mouseVelocity: new Vec3(),
        mouseOffset: new Vec3(random(-1, 1) * 0.0),
        points: [] as any[],
        // Color animation properties
        currentColor: new Color(colors[0]),
        targetColor: new Color(colors[1]),
        currentColorIndex: 0,
        targetColorIndex: 1,
        colorTransition: 0,
        colorSpeed: 0.005, // Speed of color transition
        nextColorChange: Date.now() + 2000 + Math.random() * 3000, // Random interval between 2-5 seconds
        colorUniform: colorUniform // Store reference to the uniform
      };

      // Create points array
      const count = 20;
      for (let i = 0; i < count; i++) {
        line.points.push(new Vec3());
      }

      const polyline = new Polyline(gl, {
        points: line.points,
        vertex,
        uniforms: {
          uColor: colorUniform,
          uThickness: { value: random(20, 50) }
        }
      });

      polyline.mesh.setParent(scene);
      (line as any).polyline = polyline;
      lines.push(line);

      // Resize function
      const resize = () => {
        if (!canvasRef.current) return;
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Set canvas size
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        canvasRef.current.style.width = width + 'px';
        canvasRef.current.style.height = height + 'px';
        
        // Set renderer size and viewport
        renderer.setSize(width, height);
        gl.viewport(0, 0, width, height);
        
        lines.forEach(line => line.polyline.resize());
      };

      // Initial resize
      resize();
      window.addEventListener('resize', resize);

      // Mouse handlers
      const updateMouse = (e: MouseEvent | TouchEvent) => {
        if (!canvasRef.current) return;
        
        let x, y;

        if ('touches' in e && e.touches.length) {
          x = e.touches[0].clientX;
          y = e.touches[0].clientY;
        } else if ('clientX' in e) {
          x = e.clientX;
          y = e.clientY;
        } else {
          return;
        }

        // Simple coordinate conversion - no getBoundingClientRect needed for fixed positioned canvas
        // Convert to -1 to 1 range
        const normalizedX = (x / window.innerWidth) * 2 - 1;
        const normalizedY = -((y / window.innerHeight) * 2 - 1); // Flip Y axis
        
        mouse.set(normalizedX, normalizedY, 0);
      };

      // Add event listeners
      window.addEventListener('mousemove', updateMouse);
      window.addEventListener('touchmove', updateMouse);
      window.addEventListener('touchstart', updateMouse);

      // Animation loop
      const tmp = new Vec3();
      
      const animate = () => {
        if (!mounted) return;

        lines.forEach(line => {
          // Update points
          for (let i = line.points.length - 1; i >= 0; i--) {
            if (!i) {
              // First point follows mouse with consistent spring physics
              const target = tmp.copy(mouse).add(line.mouseOffset);
              const force = tmp.copy(target).sub(line.points[i]).multiply(line.spring);
              line.mouseVelocity.add(force).multiply(line.friction);
              line.points[i].add(line.mouseVelocity);
            } else {
              // Other points follow the previous point
              line.points[i].lerp(line.points[i - 1], 0.85);
            }
          }

          // Handle color animation
          const now = Date.now();
          
          // Check if it's time to pick a new target color
          if (now >= line.nextColorChange && line.colorTransition >= 1) {
            // Pick a new random target color (different from current)
            let newColorIndex;
            do {
              newColorIndex = Math.floor(Math.random() * colors.length);
            } while (newColorIndex === line.targetColorIndex);
            
            line.currentColor.copy(line.targetColor);
            line.currentColorIndex = line.targetColorIndex;
            line.targetColor.set(colors[newColorIndex]);
            line.targetColorIndex = newColorIndex;
            line.colorTransition = 0;
            line.nextColorChange = now + 2000 + Math.random() * 3000; // Next change in 2-5 seconds
          }
          
          // Animate color transition
          if (line.colorTransition < 1) {
            line.colorTransition = Math.min(1, line.colorTransition + line.colorSpeed);
            
            // Smooth color interpolation
            const t = line.colorTransition;
            // Use smooth easing function for more natural transition
            const easedT = t * t * (3 - 2 * t);
            
            const r = line.currentColor.r + (line.targetColor.r - line.currentColor.r) * easedT;
            const g = line.currentColor.g + (line.targetColor.g - line.currentColor.g) * easedT;
            const b = line.currentColor.b + (line.targetColor.b - line.currentColor.b) * easedT;
            
            // Update the uniform color using the stored reference
            line.colorUniform.value.set(r, g, b);
          }

          line.polyline.updateGeometry();
        });

        renderer.render({ scene });
        animationIdRef.current = requestAnimationFrame(animate);
      };

      animate();

      // Cleanup function
      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousemove', updateMouse);
        window.removeEventListener('touchmove', updateMouse);
        window.removeEventListener('touchstart', updateMouse);
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
      };
    };

    loadOGL().then(() => {
      if (mounted) {
        const cleanup = initScene();
        return cleanup;
      }
    });

    return () => {
      mounted = false;
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
};

export default CursorTrail;