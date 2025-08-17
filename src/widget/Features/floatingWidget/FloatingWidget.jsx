import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import HoverComponent from '../common/components/HoverComponent';
import { themeColors } from '../common/utils/colors';

// Use a constant for widget position to avoid disappearing on re-render
const WIDGET_LEFT = 1200; // Set this to a safe value for your screen, e.g. 1200px from left
const WIDGET_TOP = 20;

const FloatingWidget = () => {
  const messageCount = useSelector((state) => state.uiVisibility.messageCount);
  const [isHovered, setIsHovered] = useState(false);

  const handleWidgetClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Floating widget clicked!');
    console.log('Current message count:', messageCount);
    console.log('Widget position:', { left: WIDGET_LEFT, top: WIDGET_TOP });
    console.log('Click event:', e);
    // Add more functionality here as needed
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      {/* Widget always visible at a fixed position */}
      <div style={{
        position: 'absolute',
        left: WIDGET_LEFT,
        top: WIDGET_TOP,
        width: '50px',
        height: '50px',
        pointerEvents: 'auto',
        cursor: 'pointer',
        zIndex: 2147483647 // Maximum possible z-index
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      >
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
          <HoverComponent onClick={handleWidgetClick}>
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: themeColors.primaryBackground,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isHovered 
                  ? '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)' 
                  : '0 2px 10px rgba(0, 0, 0, 0.3)',
                border: `1px solid ${isHovered ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.15)'}`,
                outline: `1px solid ${isHovered ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                outlineOffset: '1px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                pointerEvents: 'auto'
              }}
            >
              {/* Notification Badge */}
              {messageCount > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    backgroundColor: themeColors.notificationBadge,
                    color: themeColors.notificationText,
                    borderRadius: '50%',
                    minWidth: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    fontFamily: 'Arial, sans-serif',
                    border: `1px solid rgba(255, 255, 255, 0.2)`,
                    outline: `1px solid rgba(255, 255, 255, 0.1)`,
                    outlineOffset: '1px',
                    zIndex: 10,
                    boxShadow: `0 2px 4px ${themeColors.notificationBadge}40, 0 0 0 1px rgba(255, 255, 255, 0.1)`
                  }}
                >
                  {messageCount > 99 ? '99+' : messageCount}
                </div>
              )}
              {/* Blue inner circle */}
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: themeColors.primaryBlue,
                  borderRadius: '50%',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isHovered 
                    ? `0 0 25px ${themeColors.primaryBlue}99, 0 0 50px ${themeColors.primaryBlue}66, 0 0 75px ${themeColors.primaryBlue}33`
                    : `0 0 15px ${themeColors.primaryBlue}66, 0 0 30px ${themeColors.primaryBlue}33, 0 0 45px ${themeColors.primaryBlue}1A`,
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
                    top: '-2px',
                    left: '-2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${themeColors.primaryBlue}40 0%, ${themeColors.primaryBlue}14 70%, transparent 100%)`,
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

      {/* Hover text only visible when hovering over the widget */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          left: WIDGET_LEFT,
          top: WIDGET_TOP + 60,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 2147483646, // Just below the widget
          animation: 'fadeIn 0.2s ease-in-out'
        }}>
          Active
        </div>
      )}
    </>
  );
};

export default FloatingWidget;
