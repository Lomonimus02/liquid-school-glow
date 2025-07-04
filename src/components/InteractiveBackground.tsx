import { useEffect, useRef } from 'react';

// Helper function to calculate hover intensity for a line
const calculateLineHoverIntensity = (
  mouseX: number, mouseY: number,
  x1: number, y1: number,
  x2: number, y2: number
): number => {
  // Calculate distance from point to line segment
  const A = mouseX - x1;
  const B = mouseY - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;

  if (lenSq === 0) return 0; // Line has no length

  let param = dot / lenSq;

  let xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  const dx = mouseX - xx;
  const dy = mouseY - yy;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Return hover intensity based on distance (closer = higher intensity)
  const maxHoverDistance = 120; // Increased for better line interaction
  return distance < maxHoverDistance ? (maxHoverDistance - distance) / maxHoverDistance : 0;
};

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const particles = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    baseOpacity: number; // Base opacity of the particle
    color: string;
    originalX: number;
    originalY: number;
    currentHoverIntensity: number; // Unified hover intensity
  }>>([]);
  // connectionOpacities and connectionHoverStates are removed as their logic will be unified.
  const animationTime = useRef(0);

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

    // Initialize constellation stars in a chaotic irregular grid
    const initParticles = () => {
      particles.current = [];
      // connectionOpacities.current.clear(); // Removed
      // connectionHoverStates.current.clear(); // Removed
      const particleCount = 75;

      // Create irregular grid with random variations
      const baseRows = 8; // Increased for better initial distribution
      const baseCols = 10; // Adjusted for particleCount

      for (let i = 0; i < particleCount; i++) {
        // Create base grid position with chaos
        const row = Math.floor(i / baseCols);
        const col = i % baseCols;

        // Add significant randomness to break regular grid
        const baseX = (col / (baseCols - 1)) * canvas.width;
        const baseY = (row / (baseRows - 1)) * canvas.height;

        // Add chaotic offset - much larger variation
        const chaosX = (Math.random() - 0.5) * (canvas.width / baseCols) * 1.5;
        const chaosY = (Math.random() - 0.5) * (canvas.height / baseRows) * 1.5;

        const padding = 5; // Значительно уменьшенный отступ от краев
        let calculatedX = baseX + chaosX;
        let calculatedY = baseY + chaosY;

        // Гарантируем, что частицы остаются в пределах холста, но с минимальным отступом
        const finalX = Math.max(padding, Math.min(canvas.width - padding, calculatedX));
        const finalY = Math.max(padding, Math.min(canvas.height - padding, calculatedY));

        particles.current.push({
          x: finalX,
          y: finalY,
          vx: 0,
          vy: 0,
          size: Math.random() * 2 + 1,
          baseOpacity: Math.random() * 0.4 + 0.2, // Adjusted for potentially more subtle base stars
          color: `hsl(162, ${Math.random() * 40 + 60}%, ${Math.random() * 20 + 70}%)`,
          originalX: finalX,
          originalY: finalY,
          currentHoverIntensity: 0
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationTime.current += 0.016; // ~60fps

      // Update and draw constellation with smooth stretching effect
      particles.current.forEach((particle, index) => {
        // Calculate current mouse distance to particle
        const dx = mousePos.current.x - particle.x;
        const dxMouse = mousePos.current.x - particle.x;
        const dyMouse = mousePos.current.y - particle.y;
        const distanceMouseParticle = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        // Calculate target hover intensity based on mouse proximity to the particle
        // This will be the base for this particle's and its connections' hover effect
        const targetParticleHoverIntensity = distanceMouseParticle < 150 ? (150 - distanceMouseParticle) / 150 : 0;

        // Smoothly update the particle's current hover intensity
        particle.currentHoverIntensity += (targetParticleHoverIntensity - particle.currentHoverIntensity) * 0.08; // Slightly faster reaction

        // Mouse interaction for particle displacement
        if (particle.currentHoverIntensity > 0.01) {
          const stretchForce = particle.currentHoverIntensity * 0.25; // Can adjust force
          const targetX = particle.originalX + dxMouse * stretchForce;
          const targetY = particle.originalY + dyMouse * stretchForce;

          particle.x += (targetX - particle.x) * 0.07; // Smooth interpolation for position
          particle.y += (targetY - particle.y) * 0.07;
        } else {
          // Return to original position smoothly
          particle.x += (particle.originalX - particle.x) * 0.03; // Более плавный возврат
          particle.y += (particle.originalY - particle.y) * 0.03; // Более плавный возврат
        }

        // Determine particle opacity based on its hover intensity
        const currentParticleOpacity = Math.min(1, particle.baseOpacity + particle.currentHoverIntensity * 0.7);

        // Draw star
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = currentParticleOpacity;
        ctx.fill();

        // Add glow effect for stars if hovered
        if (particle.currentHoverIntensity > 0.1) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2.5 + particle.currentHoverIntensity * 2, 0, Math.PI * 2); // Glow size increases with hover
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = 0.15 * particle.currentHoverIntensity; // Glow opacity increases with hover
          ctx.fill();
        }
      });


      // Draw dynamic constellation connections (Second pass, after all particles updated)
      particles.current.forEach((particle, index) => {
        particles.current.slice(index + 1).forEach((otherParticle) => {
          const dx2 = particle.x - otherParticle.x;
          const dy2 = particle.y - otherParticle.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          const connectionRange = 180;
          if (distance2 < connectionRange) {
            // Determine hover intensity for the line.
            // It's primarily influenced by the most hovered of its two particles.
            // Also, consider direct mouse-to-line hover.
            const lineDirectHoverIntensity = calculateLineHoverIntensity(
              mousePos.current.x, mousePos.current.y,
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            );

            // The line's hover intensity is the max of its particles' hover or direct line hover
            const lineEffectiveHoverIntensity = Math.max(
              particle.currentHoverIntensity,
              otherParticle.currentHoverIntensity,
              lineDirectHoverIntensity * 1.2 // Give direct line hover a slight boost
            );

            // Base line opacity: always visible if particles are close, slightly dimmer for distant ones
            // No breathing/flicker for simplicity and to meet new requirements.
            const baseLineOpacity = 0.3 * (1 - distance2 / connectionRange); // Softer base

            // Final line opacity: base + boost from hover
            const finalLineOpacity = Math.min(0.9, baseLineOpacity + lineEffectiveHoverIntensity * 0.7);

            // Line width: base + boost from hover
            const baseLineWidth = 0.8; // Thinner base lines for a cleaner look
            const finalLineWidth = baseLineWidth + lineEffectiveHoverIntensity * 0.4; // Еще уменьшено влияние наведения на толщину

            if (finalLineOpacity > 0.02) { // Draw if reasonably visible
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(2, 191, 122, ${finalLineOpacity})`;
              ctx.lineWidth = finalLineWidth;
              ctx.stroke();

              // Add glow effect for lines if hovered (sync with particle glow logic) - REMOVED
              // if (lineEffectiveHoverIntensity > 0.1) {
              //   ctx.beginPath();
              //   ctx.moveTo(particle.x, particle.y);
              //   ctx.lineTo(otherParticle.x, otherParticle.y);
              //   // Glow opacity and width also scale with hover intensity
              //   ctx.strokeStyle = `rgba(2, 191, 122, ${lineEffectiveHoverIntensity * 0.3})`;
              //   ctx.lineWidth = finalLineWidth + 2 + lineEffectiveHoverIntensity * 3;
              //   ctx.stroke();
              // }
            }
          }
        });
      });

      ctx.globalAlpha = 1; // Reset global alpha
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