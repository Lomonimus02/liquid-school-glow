import { useEffect, useRef } from 'react';

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const particles = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    // Initialize constellation stars
    const initParticles = () => {
      particles.current = [];
      const particleCount = 60;
      
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          color: `hsl(162, ${Math.random() * 40 + 60}%, ${Math.random() * 20 + 70}%)`
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw constellation
      particles.current.forEach((particle, index) => {
        // Mouse interaction - stars move away from mouse
        const dx = mousePos.current.x - particle.x;
        const dy = mousePos.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150 * 0.8;
          particle.vx -= dx * force * 0.002;
          particle.vy -= dy * force * 0.002;
          // Increase brightness when mouse is near
          particle.opacity = Math.min(1, particle.opacity + 0.3);
        } else {
          // Fade back to normal
          particle.opacity = Math.max(0.2, particle.opacity - 0.01);
        }

        // Gentle floating movement
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary bouncing
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Draw star
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Add glow effect for stars near mouse
        if (distance < 150) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = 0.1 * (1 - distance / 150);
          ctx.fill();
        }

        // Draw constellation connections
        particles.current.slice(index + 1).forEach(otherParticle => {
          const dx2 = particle.x - otherParticle.x;
          const dy2 = particle.y - otherParticle.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          
          if (distance2 < 120) {
            const lineOpacity = 0.3 * (1 - distance2 / 120);
            
            // Make connections brighter when mouse is near either star
            const mouseDistToParticle = Math.sqrt((mousePos.current.x - particle.x) ** 2 + (mousePos.current.y - particle.y) ** 2);
            const mouseDistToOther = Math.sqrt((mousePos.current.x - otherParticle.x) ** 2 + (mousePos.current.y - otherParticle.y) ** 2);
            const enhancedOpacity = Math.min(mouseDistToParticle, mouseDistToOther) < 150 ? lineOpacity * 2 : lineOpacity;
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(2, 191, 122, ${enhancedOpacity})`;
            ctx.lineWidth = enhancedOpacity > lineOpacity ? 2 : 1;
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default InteractiveBackground;