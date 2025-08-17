import React from 'react';
import HoverComponent from '../common/components/HoverComponent';

const ActionBar = () => {
  const position = { x: 1200, y: 20 };
  const isNearRightEdge = position.x > window.innerWidth - 300;
  const barWidth = 220;
  const safeLeft = isNearRightEdge ?
    Math.max(10, position.x - barWidth - 20) :
    Math.min(window.innerWidth - barWidth - 10, position.x + 60);

  return (
    <HoverComponent>
      <div style={{
        position: 'fixed',
        left: safeLeft,
        top: position.y + 15,
        transform: 'translateX(0)',
        opacity: 1,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 10002,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        pointerEvents: 'auto',
        width: 'fit-content',
        height: 'fit-content'
      }}>
        {/* Arrow pointing to widget */}
        <div style={{
          width: 0,
          height: 0,
          borderTop: '6px solid transparent',
          borderBottom: '6px solid transparent',
          borderRight: isNearRightEdge ? 'none' : '6px solid rgba(0, 0, 0, 0.9)',
          borderLeft: isNearRightEdge ? '6px solid rgba(0, 0, 0, 0.9)' : 'none',
          marginRight: isNearRightEdge ? '0' : '-1px',
          marginLeft: isNearRightEdge ? '-1px' : '0',
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
        }} />

        {/* Bar background */}
        <div style={{
          background: '#000000',
          backdropFilter: 'blur(10px)',
          borderRadius: '25px',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          border: '1px solid #1C1C1E',
          minWidth: '200px'
        }}>
          {/* Type Something Button */}
          <button style={{
            background: '#007AFF',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 16px',
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 8px rgba(0, 122, 255, 0.3)',
            whiteSpace: 'nowrap'
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Type
          </button>

          {/* Message Thread Button */}
          <button style={{
            background: '#00D09C',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 16px',
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 8px rgba(0, 208, 156, 0.3)',
            whiteSpace: 'nowrap'
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            Thread
          </button>

          {/* Close button */}
          <button style={{
            background: '#2D2D2F',
            border: 'none',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            color: '#FFFFFF',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '4px'
          }}>
            ×
          </button>
        </div>
      </div>
    </HoverComponent>
  );
};


export default ActionBar;
