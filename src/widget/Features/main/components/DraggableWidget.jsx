import React, { useState, useRef, useEffect } from 'react';
import HoverComponent from '../../common/components/HoverComponent';

const DraggableWidget = () => {
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [showAurora, setShowAurora] = useState(false);
  const widgetRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.button === 0) { // Left mouse button only
      setIsDragging(true);
      const rect = widgetRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      // Keep widget within screen bounds
      const maxX = window.innerWidth - 60;
      const maxY = window.innerHeight - 60;
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    setShowAurora(true);
    setTimeout(() => {
      setShowAurora(false);
    }, 3000);
  };

  // Add global mouse event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div className="main-page widget-click-through" style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'fixed', 
      top: 0, 
      left: 0,
      backgroundColor: 'transparent',
      pointerEvents: 'none',
      zIndex: 9999,
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none'
    }}>
      <HoverComponent 
        className="widget-interactive"
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          width: '60px',
          height: '60px',
          pointerEvents: 'auto',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={widgetRef}
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseDown={handleMouseDown}
        >
          {/* Black outer cover */}
          <div style={{
            width: '50px',
            height: '50px',
            backgroundColor: '#000',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            border: '2px solid #333'
          }}>
            {/* Blue inner circle */}
            <div 
              style={{
                width: '35px',
                height: '35px',
                backgroundColor: '#007bff',
                borderRadius: '50%',
                cursor: 'pointer'
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            />
          </div>
        </div>
      </HoverComponent>

      {/* Hover text that appears below the widget */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          left: position.x,
          top: position.y + 70,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 10000
        }}>
          Active
        </div>
      )}

      {/* Aurora effect at the top of the window */}
      {showAurora && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 10001,
          overflow: 'hidden'
        }}>
          {/* Ripple expansion effect from click point */}
          <svg 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <defs>
              <radialGradient id="auroraGradient" cx="50%" cy="0%" r="50%">
                <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8">
                  <animate attributeName="stopColor" values="#00ffff;#ff00ff;#ffff00;#00ffff" dur="3s" repeatCount="1" />
                </stop>
                <stop offset="30%" stopColor="#ff00ff" stopOpacity="0.6">
                  <animate attributeName="stopColor" values="#ff00ff;#ffff00;#00ffff;#ff00ff" dur="3s" repeatCount="1" />
                </stop>
                <stop offset="60%" stopColor="#ffff00" stopOpacity="0.4">
                  <animate attributeName="stopColor" values="#ffff00;#00ffff;#ff00ff;#ffff00" dur="3s" repeatCount="1" />
                </stop>
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              
              <filter id="turbulence">
                <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="turbulence">
                  <animate attributeName="baseFrequency" values="0.02;0.05;0.02" dur="3s" repeatCount="1" />
                </feTurbulence>
                <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="20" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
            
            {/* Wave 1 */}
            <ellipse 
              cx="50%" 
              cy="0" 
              rx="0" 
              ry="0" 
              fill="url(#auroraGradient)" 
              filter="url(#turbulence)"
              opacity="0"
            >
              <animate attributeName="rx" values="0;800;1200" dur="3s" repeatCount="1" />
              <animate attributeName="ry" values="0;200;300" dur="3s" repeatCount="1" />
              <animate attributeName="opacity" values="0;0.8;0" dur="3s" repeatCount="1" />
            </ellipse>
            
            {/* Wave 2 */}
            <ellipse 
              cx="50%" 
              cy="0" 
              rx="0" 
              ry="0" 
              fill="url(#auroraGradient)" 
              filter="url(#turbulence)"
              opacity="0"
            >
              <animate attributeName="rx" values="0;600;1000" dur="3s" begin="0.3s" repeatCount="1" />
              <animate attributeName="ry" values="0;150;250" dur="3s" begin="0.3s" repeatCount="1" />
              <animate attributeName="opacity" values="0;0.6;0" dur="3s" begin="0.3s" repeatCount="1" />
            </ellipse>
            
            {/* Wave 3 */}
            <ellipse 
              cx="50%" 
              cy="0" 
              rx="0" 
              ry="0" 
              fill="url(#auroraGradient)" 
              filter="url(#turbulence)"
              opacity="0"
            >
              <animate attributeName="rx" values="0;400;800" dur="3s" begin="0.6s" repeatCount="1" />
              <animate attributeName="ry" values="0;100;200" dur="3s" begin="0.6s" repeatCount="1" />
              <animate attributeName="opacity" values="0;0.4;0" dur="3s" begin="0.6s" repeatCount="1" />
            </ellipse>
          </svg>
          
          {/* Particle system */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '300px',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(138, 43, 226, 0.2) 0%, transparent 70%)',
            animation: 'auroraGlow 3s ease-out',
          }}>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${45 + (Math.random() * 10)}%`,
                  top: '0',
                  width: '4px',
                  height: '4px',
                  backgroundColor: ['#00ffff', '#ff00ff', '#ffff00'][i % 3],
                  borderRadius: '50%',
                  boxShadow: `0 0 10px ${['#00ffff', '#ff00ff', '#ffff00'][i % 3]}`,
                  animation: `particleFall 3s ease-out ${i * 0.1}s`,
                  opacity: 0
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DraggableWidget;
