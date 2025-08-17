import React from 'react';
import HoverComponent from '../common/components/HoverComponent';

// Use a constant for widget position to avoid disappearing on re-render
const WIDGET_LEFT = 1200; // Set this to a safe value for your screen, e.g. 1200px from left
const WIDGET_TOP = 20;

const FloatingWidget = () => {
  return (
    <>
      {/* Widget always visible at a fixed position */}
      <div style={{
        position: 'absolute',
        left: WIDGET_LEFT,
        top: WIDGET_TOP,
        width: '60px',
        height: '60px',
        pointerEvents: 'auto',
        cursor: 'grab',
        zIndex: 2147483647 // Maximum possible z-index
      }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Black outer cover wrapped in HoverComponent */}
          <HoverComponent>
            <div
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: '#000',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                border: '2px solid #333',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {/* Blue inner circle */}
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#007AFF',
                  borderRadius: '50%',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 0 15px rgba(0, 122, 255, 0.4), 0 0 30px rgba(0, 122, 255, 0.2), 0 0 45px rgba(0, 122, 255, 0.1)',
                  filter: 'blur(1px)',
                  pointerEvents: 'none',
                  position: 'relative',
                  animation: 'heartbeatColor 2s ease-in-out infinite'
                }}
              >
                {/* Additional glow layer for enhanced heartbeat effect */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    left: '-3px',
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0, 122, 255, 0.25) 0%, rgba(0, 122, 255, 0.08) 70%, transparent 100%)',
                    filter: 'blur(4px)',
                    animation: 'heartbeat 2s ease-in-out infinite',
                    animationDelay: '0.5s',
                    pointerEvents: 'none',
                    zIndex: 0
                  }}
                />
              </div>
            </div>
          </HoverComponent>
        </div>
      </div>

      {/* Hover text always visible below the widget */}
      <div style={{
        position: 'absolute',
        left: WIDGET_LEFT,
        top: WIDGET_TOP + 70,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        zIndex: 2147483646 // Just below the widget
      }}>
        Active
      </div>
    </>
  );
};

export default FloatingWidget;
