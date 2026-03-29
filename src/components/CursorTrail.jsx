import { useState, useEffect, useRef, useCallback } from 'react';
import './CursorTrail.css';

const PALETTE = [
  '#ff2d7b', '#ff6b35', '#b8ff00', '#6c2bd9', '#ffe14d',
  '#00d4ff', '#ff9ee7', '#7bffb2', '#ff4444', '#ff6b35',
  '#b8ff00', '#00d4ff'
];

const TRAIL_COUNT = 12;

export default function CursorTrail() {
  const [isDesktop, setIsDesktop] = useState(false);
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const trailRefs = useRef([]);
  const posRef = useRef({ x: -100, y: -100 });
  const trailPos = useRef(Array(TRAIL_COUNT).fill(null).map(() => ({ x: -100, y: -100 })));
  const rafRef = useRef(null);
  const [isLink, setIsLink] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const sparkleContainer = useRef(null);

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse)
    const mq = window.matchMedia('(pointer: fine)');
    setIsDesktop(mq.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleMove = useCallback((e) => {
    posRef.current = { x: e.clientX, y: e.clientY };
    
    // Check if hovering an interactive element
    const target = e.target;
    const interactive = target.closest('a, button, [role="button"], .btn');
    setIsLink(!!interactive);
  }, []);

  const handleDown = useCallback(() => setIsPressed(true), []);
  const handleUp = useCallback(() => setIsPressed(false), []);

  const handleClick = useCallback((e) => {
    // Sparkle burst
    if (!sparkleContainer.current) return;
    const count = 10;
    for (let i = 0; i < count; i++) {
      const spark = document.createElement('div');
      spark.className = 'cursor-sparkle';
      const angle = (i / count) * Math.PI * 2;
      const dist = 30 + Math.random() * 20;
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      spark.style.cssText = `
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        --dx: ${Math.cos(angle) * dist}px;
        --dy: ${Math.sin(angle) * dist}px;
        background: ${color};
        box-shadow: 0 0 6px ${color};
      `;
      sparkleContainer.current.appendChild(spark);
      setTimeout(() => spark.remove(), 600);
    }
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('click', handleClick);

    const animate = () => {
      // Update cursor ring
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;
      }

      // Update trail tiles with progressive lag
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const target = i === 0 ? posRef.current : trailPos.current[i - 1];
        const speed = 0.18 - i * 0.012;
        trailPos.current[i].x += (target.x - trailPos.current[i].x) * speed;
        trailPos.current[i].y += (target.y - trailPos.current[i].y) * speed;
        
        if (trailRefs.current[i]) {
          const scale = 1 - (i / TRAIL_COUNT) * 0.9;
          const rot = i * 15;
          trailRefs.current[i].style.transform = `translate(${trailPos.current[i].x}px, ${trailPos.current[i].y}px) translate(-50%, -50%) scale(${scale}) rotate(${rot}deg)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('click', handleClick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDesktop, handleMove, handleDown, handleUp, handleClick]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Trailing mosaic tiles */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={el => trailRefs.current[i] = el}
          className="cursor-tile"
          style={{
            background: PALETTE[i],
            zIndex: 99998 - i,
            opacity: 1 - (i / TRAIL_COUNT) * 0.7,
          }}
        />
      ))}
      
      {/* Cursor dot */}
      <div
        ref={dotRef}
        className={`cursor-dot ${isLink ? 'on-link' : ''} ${isPressed ? 'pressed' : ''}`}
      />
      
      {/* Cursor ring */}
      <div
        ref={cursorRef}
        className={`cursor-ring ${isLink ? 'on-link' : ''} ${isPressed ? 'pressed' : ''}`}
      />
      
      {/* Sparkle container */}
      <div ref={sparkleContainer} className="sparkle-container" />
    </>
  );
}
