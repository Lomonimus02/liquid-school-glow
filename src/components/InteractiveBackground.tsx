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
    opacity: number;
    color: string;
    originalX: number;
    originalY: number;
    hoverIntensity: number;
  }>>([]);
  const connectionOpacities = useRef<Map<string, number>>(new Map());
  const connectionHoverStates = useRef<Map<string, number>>(new Map());
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
      connectionOpacities.current.clear();
      connectionHoverStates.current.clear();
      const particleCount = 75;

      // Create irregular grid with random variations
      const baseRows = 6;
      const baseCols = 10;

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

        const finalX = Math.max(50, Math.min(canvas.width - 50, baseX + chaosX));
        const finalY = Math.max(50, Math.min(canvas.height - 50, baseY + chaosY));

        particles.current.push({
          x: finalX,
          y: finalY,
          vx: 0,
          vy: 0,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.6 + 0.3,
          color: `hsl(162, ${Math.random() * 40 + 60}%, ${Math.random() * 20 + 70}%)`,
          originalX: finalX,
          originalY: finalY,
          hoverIntensity: 0
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
        const dy = mousePos.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Update hover intensity with smooth transitions - reduced particle influence
        const targetHoverIntensity = distance < 150 ? (150 - distance) / 150 : 0;
        particle.hoverIntensity += (targetHoverIntensity - particle.hoverIntensity) * 0.06;

        // Mouse interaction - create smooth stretching effect
        if (particle.hoverIntensity > 0.01) {
          // Simple smooth stretching towards mouse
          const stretchForce = particle.hoverIntensity * 0.2;
          const targetX = particle.originalX + dx * stretchForce;
          const targetY = particle.originalY + dy * stretchForce;

          // Very smooth interpolation
          particle.x += (targetX - particle.x) * 0.06;
          particle.y += (targetY - particle.y) * 0.06;

          // Only brightness changes, no size changes
          particle.opacity = Math.min(1, particle.opacity + 0.02);
        } else {
          // Return to original position smoothly
          particle.x += (particle.originalX - particle.x) * 0.04;
          particle.y += (particle.originalY - particle.y) * 0.04;

          // Fade back to normal
          particle.opacity = Math.max(0.3, particle.opacity - 0.01);
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Add subtle glow effect for stars near mouse
        if (particle.hoverIntensity > 0.1) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = 0.1 * particle.hoverIntensity;
          ctx.fill();
        }

        // Draw dynamic constellation connections
        particles.current.slice(index + 1).forEach((otherParticle, otherIndex) => {
          const dx2 = particle.x - otherParticle.x;
          const dy2 = particle.y - otherParticle.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          // Increased connection range for more connections
          if (distance2 < 180) {
            // Create unique connection ID
            const connectionId = `${index}-${index + otherIndex + 1}`;

            // Dynamic connection opacity with breathing effect
            const breathingEffect = Math.sin(animationTime.current * 0.8 + index * 0.5) * 0.15 + 0.85;
            const randomFlicker = Math.sin(animationTime.current * 1.2 + connectionId.length) * 0.1 + 0.9;

            // Base line opacity with dynamic effects - increased base visibility
            const baseLineOpacity = 0.4 * (1 - distance2 / 180) * breathingEffect * randomFlicker;

            // Calculate hover effect - prioritize line-based interaction
            const lineHoverIntensity = calculateLineHoverIntensity(
              mousePos.current.x, mousePos.current.y,
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            );

            // Particle-based hover with reduced influence
            const combinedHoverIntensity = Math.max(particle.hoverIntensity, otherParticle.hoverIntensity) * 0.6;

            // Prioritize line hover over particle hover
            const finalHoverIntensity = Math.max(lineHoverIntensity, combinedHoverIntensity);

            // Get or initialize connection hover state
            if (!connectionHoverStates.current.has(connectionId)) {
              connectionHoverStates.current.set(connectionId, 0);
            }

            const currentHoverState = connectionHoverStates.current.get(connectionId) || 0;
            const targetHoverState = finalHoverIntensity;

            // Smooth hover state transition
            const newHoverState = currentHoverState + (targetHoverState - currentHoverState) * 0.1;
            connectionHoverStates.current.set(connectionId, newHoverState);

            // Get or initialize connection opacity for smooth transitions
            if (!connectionOpacities.current.has(connectionId)) {
              connectionOpacities.current.set(connectionId, baseLineOpacity);
            }

            const currentOpacity = connectionOpacities.current.get(connectionId) || 0;

            // Target opacity with responsive enhancement - much stronger boost for lines
            const hoverBoost = newHoverState * 0.8; // Doubled hover boost
            const targetOpacity = Math.min(0.95, baseLineOpacity + hoverBoost); // Higher max opacity

            // Smooth interpolation for opacity changes
            const lerpSpeed = 0.08; // Even more responsive
            const newOpacity = currentOpacity + (targetOpacity - currentOpacity) * lerpSpeed;
            connectionOpacities.current.set(connectionId, newOpacity);

            // Line width with responsive hover effect - more dramatic
            const baseLineWidth = 1.2; // Thicker base lines
            const lineWidth = baseLineWidth + newHoverState * 2.5; // More dramatic width change

            // Only draw if opacity is significant
            if (newOpacity > 0.03) { // Lower threshold for more visible lines
              // Draw the main line
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(2, 191, 122, ${newOpacity})`;
              ctx.lineWidth = lineWidth;
              ctx.stroke();

              // Add glow effect for lines with any hover (more prominent)
              if (newHoverState > 0.1) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.strokeStyle = `rgba(2, 191, 122, ${newHoverState * 0.4})`;
                ctx.lineWidth = lineWidth + 4;
                ctx.stroke();
              }

              // Add extra bright glow for strong hover
              if (newHoverState > 0.5) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.strokeStyle = `rgba(2, 191, 122, ${newHoverState * 0.3})`;
                ctx.lineWidth = lineWidth + 8;
                ctx.stroke();
              }
            }
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