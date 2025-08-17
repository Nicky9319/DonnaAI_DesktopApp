import React from 'react';
import HoverComponent from '../../common/components/HoverComponent';

const DropdownModal = () => {
  return (
    <HoverComponent>
      <div
        className="dropdown-modal-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(5px)',
          zIndex: 10003,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.3s ease-out'
        }}
      >
        <div
          className="dropdown-modal"
          style={{
            width: '90%',
            maxWidth: '500px',
            height: '80%',
            maxHeight: '600px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '20px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Type Something
                </div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  Donna AI Assistant
                </div>
              </div>
            </div>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '5px',
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s'
              }}
            >
              ×
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            {/* Example messages */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', animation: 'messageSlideIn 0.3s ease-out' }}>
              <div style={{
                maxWidth: '70%',
                padding: '12px 16px',
                borderRadius: '18px',
                background: 'rgba(0, 0, 0, 0.05)',
                color: 'black',
                fontSize: '14px',
                lineHeight: '1.4',
                wordWrap: 'break-word'
              }}>
                Hello! How can I help you today?
                <div style={{
                  fontSize: '11px',
                  opacity: 0.7,
                  marginTop: '5px',
                  textAlign: 'left'
                }}>
                  09:00
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', animation: 'messageSlideIn 0.3s ease-out' }}>
              <div style={{
                maxWidth: '70%',
                padding: '12px 16px',
                borderRadius: '18px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontSize: '14px',
                lineHeight: '1.4',
                wordWrap: 'break-word',
                boxShadow: '0 2px 10px rgba(102, 126, 234, 0.3)'
              }}>
                I need help with my project
                <div style={{
                  fontSize: '11px',
                  opacity: 0.7,
                  marginTop: '5px',
                  textAlign: 'right'
                }}>
                  09:01
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', animation: 'messageSlideIn 0.3s ease-out' }}>
              <div style={{
                maxWidth: '70%',
                padding: '12px 16px',
                borderRadius: '18px',
                background: 'rgba(0, 0, 0, 0.05)',
                color: 'black',
                fontSize: '14px',
                lineHeight: '1.4',
                wordWrap: 'break-word'
              }}>
                I'd be happy to help! What kind of project are you working on?
                <div style={{
                  fontSize: '11px',
                  opacity: 0.7,
                  marginTop: '5px',
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
            padding: '20px',
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            background: 'rgba(255, 255, 255, 0.8)'
          }}>
            <div style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-end'
            }}>
              <textarea
                value=""
                placeholder="Type your message here..."
                style={{
                  flex: 1,
                  minHeight: '40px',
                  maxHeight: '120px',
                  padding: '12px 16px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '20px',
                  fontSize: '14px',
                  resize: 'none',
                  outline: 'none',
                  fontFamily: 'inherit',
                  background: 'white',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                readOnly
              />
              <button
                disabled
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(0, 0, 0, 0.1)',
                  color: 'white',
                  cursor: 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  transform: 'scale(0.9)'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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



export default DropdownModal;
