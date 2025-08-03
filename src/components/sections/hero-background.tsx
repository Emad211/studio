"use client"

import React, { useRef, useEffect, useState } from 'react';

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [themeColors, setThemeColors] = useState({ primary: 'hsl(266, 100%, 50%)', background: 'hsl(0, 0%, 7%)' });

  useEffect(() => {
    // This effect runs once on mount to get the initial theme colors.
    // It's important that this is done on the client side.
    const computedStyle = getComputedStyle(document.documentElement);
    const primaryColor = `hsl(${computedStyle.getPropertyValue('--primary').trim()})`;
    const backgroundColor = `hsl(${computedStyle.getPropertyValue('--background').trim()})`;
    setThemeColors({ primary: primaryColor, background: backgroundColor });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor(x: number, y: number, speedX: number, speedY: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1.5 + 1;
        this.speedX = speedX;
        this.speedY = speedY;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.02;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = themeColors.primary;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
        particles = [];
        const numberOfParticles = (canvas.width * canvas.height) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const speedX = (Math.random() * 0.5 - 0.25);
            const speedY = (Math.random() * 0.5 - 0.25);
            particles.push(new Particle(x, y, speedX, speedY));
        }
    }

    function connectParticles() {
        let opacityValue = 1;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    opacityValue = 1 - (distance / 100);
                    ctx.strokeStyle = `hsla(266, 100%, 50%, ${opacityValue})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
      if (!ctx) return;
      // Fill the background first
      ctx.fillStyle = themeColors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    }
    
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.x;
      mouse.y = event.y;
    }

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [themeColors]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
}
