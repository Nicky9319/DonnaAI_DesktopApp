import React from 'react';
import HoverComponent from '../../common/components/HoverComponent';

const HorizontalBar = () => {
  const position = { x: window.innerWidth - 80, y: 20 };
  const isOpen = true;
  const isNearRightEdge = position.x > window.innerWidth - 300;
  const barWidth = 220;
  const safeLeft = isNearRightEdge ?
    Math.max(10, position.x - barWidth - 20) :
    Math.min(window.innerWidth - barWidth - 10, position.x + 60);

  return (
    <HoverComponent>
      <div
        className={`horizontal-bar bar-open`}
        style={{
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
        }}
      >
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
          minWidth: '200px',
          animation: 'slideInFromLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {/* Type Something Button */}
          <button
            style={{
              background: '#007AFF',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 16px',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(0, 122, 255, 0.3)',
              whiteSpace: 'nowrap'
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Type
          </button>

          {/* Message Thread Button */}
          <button
            style={{
              background: '#00D09C',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 16px',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(0, 208, 156, 0.3)',
              whiteSpace: 'nowrap'
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            Thread
          </button>

          {/* Close button */}
          <button
            style={{
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
              transition: 'all 0.2s',
              marginLeft: '4px'
            }}
          >
            ×
          </button>
        </div>

        {/* Dropdown always visible */}
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '0',
          marginTop: '8px',
          background: '#000000',
          border: '1px solid #1C1C1E',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          zIndex: 10003,
          maxHeight: '400px',
          width: '350px',
          overflow: 'hidden',
          animation: 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'auto'
        }}>
          {/* Close button for dropdown */}
          <button
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: '#2D2D2F',
              border: 'none',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              color: '#FFFFFF',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              zIndex: 10004
            }}
          >
            ×
          </button>
          {/* Messages Area */}
          <div
            className="messages-container"
            style={{
              height: '280px',
              overflowY: 'auto',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              scrollbarWidth: 'thin',
              scrollbarColor: '#1C1C1E #000000'
            }}
          >
            <style>
              {`
                .messages-container::-webkit-scrollbar {
                  width: 6px;
                }
                .messages-container::-webkit-scrollbar-track {
                  background: #000000;
                  border-radius: 3px;
                }
                .messages-container::-webkit-scrollbar-thumb {
                  background: #1C1C1E;
                  border-radius: 3px;
                  transition: background 0.2s;
                }
                .messages-container::-webkit-scrollbar-thumb:hover {
                  background: #2D2D2F;
                }
              `}
            </style>
            {/* Example messages */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', animation: 'messageSlideIn 0.3s ease-out' }}>
              <div style={{
                maxWidth: '80%',
                padding: '8px 12px',
                borderRadius: '12px',
                background: '#1C1C1E',
                color: '#FFFFFF',
                fontSize: '12px',
                lineHeight: '1.4',
                wordWrap: 'break-word'
              }}>
                Hello! How can I help you today?
                <div style={{
                  fontSize: '10px',
                  opacity: 0.7,
                  marginTop: '4px',
                  textAlign: 'left'
                }}>
                  09:00
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', animation: 'messageSlideIn 0.3s ease-out' }}>
              <div style={{
                maxWidth: '80%',
                padding: '8px 12px',
                borderRadius: '12px',
                background: '#007AFF',
                color: '#FFFFFF',
                fontSize: '12px',
                lineHeight: '1.4',
                wordWrap: 'break-word'
              }}>
                I need help with my project
                <div style={{
                  fontSize: '10px',
                  opacity: 0.7,
                  marginTop: '4px',
                  textAlign: 'right'
                }}>
                  09:01
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', animation: 'messageSlideIn 0.3s ease-out' }}>
              <div style={{
                maxWidth: '80%',
                padding: '8px 12px',
                borderRadius: '12px',
                background: '#1C1C1E',
                color: '#FFFFFF',
                fontSize: '12px',
                lineHeight: '1.4',
                wordWrap: 'break-word'
              }}>
                I'd be happy to help! What kind of project are you working on?
                <div style={{
                  fontSize: '10px',
                  opacity: 0.7,
                  marginTop: '4px',
                  textAlign: 'left'
                }}>
                  09:02
                </div>
              </div>
            </div>
            <div />
          </div>
          {/* Input Area */}
          <div style={{
            padding: '12px',
            borderTop: '1px solid #1C1C1E',
            background: '#111111'
          }}>
            <div style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'flex-end'
            }}>
              <textarea
                className="dropdown-textarea"
                value=""
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  minHeight: '32px',
                  maxHeight: '80px',
                  padding: '8px 12px',
                  border: '1px solid #1C1C1E',
                  borderRadius: '16px',
                  fontSize: '12px',
                  resize: 'none',
                  outline: 'none',
                  fontFamily: 'inherit',
                  background: '#000000',
                  color: '#FFFFFF',
                  transition: 'border-color 0.2s'
                }}
                readOnly
              />
              <button
                disabled
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: 'none',
                  background: '#2D2D2F',
                  color: '#FFFFFF',
                  cursor: 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  transform: 'scale(0.9)'
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </HoverComponent>
  );
};

export default HorizontalBar;
