import React, { useState, useRef, useEffect } from 'react';

const WidgetMain = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [textInputOpen, setTextInputOpen] = useState(false);
  const [threadsModalOpen, setThreadsModalOpen] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textInputValue, setTextInputValue] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'ai' }
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 70, y: 20 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showActiveText, setShowActiveText] = useState(false);
  
  const widgetRef = useRef(null);
  const inputRef = useRef(null);
  const textInputRef = useRef(null);

  // Determine if widget should expand to the left or right
  const shouldExpandLeft = position.x > window.innerWidth / 2;

  // Handle dragging
  const handleMouseDown = (e) => {
    if (e.target.closest('.widget-controls')) return; // Don't drag when clicking controls
    
    setIsDragging(true);
    const rect = widgetRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    // Disable click-through while dragging
    if (window.electronAPI && window.electronAPI.setIgnoreMouseEvents) {
      window.electronAPI.setIgnoreMouseEvents(false);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Allow dragging to any position on screen (no constraints)
    setPosition({
      x: newX,
      y: newY
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    // Re-enable click-through after dragging if widget is not expanded
    if (!isExpanded && !textInputOpen && !threadsModalOpen && !isInteracting) {
      if (window.electronAPI && window.electronAPI.setIgnoreMouseEvents) {
        window.electronAPI.setIgnoreMouseEvents(true, { forward: true });
      }
    }
  };

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        // Only close if not interacting with text input
        if (!isInteracting) {
          setIsExpanded(false);
          setTextInputOpen(false);
          setThreadsModalOpen(false);
          setIsInteracting(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isInteracting]);

  // Enable/disable click-through based on widget state
  useEffect(() => {
    const shouldEnableClickThrough = !isExpanded && !textInputOpen && !threadsModalOpen && !isInteracting;
    
    if (window.electronAPI && window.electronAPI.setIgnoreMouseEvents) {
      if (shouldEnableClickThrough) {
        window.electronAPI.setIgnoreMouseEvents(true, { forward: true });
      } else {
        window.electronAPI.setIgnoreMouseEvents(false);
      }
    }
  }, [isExpanded, textInputOpen, threadsModalOpen, isInteracting]);

  // Update position when window resizes
  useEffect(() => {
    const handleResize = () => {
      // Don't constrain position on resize - let it stay where it is
      // Only adjust if widget would be completely off-screen
      if (position.x > window.innerWidth) {
        setPosition({ x: window.innerWidth - 70, y: position.y });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position.x, position.y]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newMessage = { id: Date.now(), text: inputValue, sender: 'human' };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = { id: Date.now() + 1, text: 'I received your message: ' + inputValue, sender: 'ai' };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleTextInputSend = () => {
    if (!textInputValue.trim()) return;
    
    const messageText = textInputValue; // Store the value before clearing
    const newMessage = { id: Date.now(), text: messageText, sender: 'human' };
    setMessages(prev => [...prev, newMessage]);
    setTextInputValue('');
    setTextInputOpen(false);
    setIsInteracting(false);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = { id: Date.now() + 1, text: 'I received your text: ' + messageText, sender: 'ai' };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
  };

  const handleTextInputToggle = () => {
    const newTextInputState = !textInputOpen;
    setTextInputOpen(newTextInputState);
    setIsInteracting(newTextInputState);
    
    // Focus the input after a short delay to ensure it's rendered
    if (newTextInputState) {
      setTimeout(() => {
        if (textInputRef.current) {
          textInputRef.current.focus();
        }
      }, 100);
    }
  };

  const handleThreadsOpen = () => {
    setThreadsModalOpen(true);
    setIsInteracting(true);
  };

  const handleThreadsClose = () => {
    setThreadsModalOpen(false);
    setIsInteracting(false);
  };

  return (
    <>
      {/* Full Screen Overlay for Dragging */}
      {isDragging && (
        <div 
          className="widget-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9998,
            cursor: 'grabbing'
          }}
        />
      )}
      
      <div 
        ref={widgetRef}
        className="widget-expanded"
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          zIndex: 9999,
          userSelect: 'none'
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Main Widget Button */}
        <div 
          className={`widget-button ${isExpanded ? 'expanded' : ''}`}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'rgba(128, 128, 128, 0.3)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            cursor: isDragging ? 'grabbing' : 'grab',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            transform: isDragging ? 'scale(1.1)' : 'scale(1)'
          }}
          onMouseEnter={() => {
            if (!isDragging) {
              setIsExpanded(true);
              setShowActiveText(true);
              // Disable click-through when hovering over widget
              if (window.electronAPI && window.electronAPI.setIgnoreMouseEvents) {
                window.electronAPI.setIgnoreMouseEvents(false);
              }
            }
          }}
          onMouseLeave={() => {
            if (!isDragging) {
              setShowActiveText(false);
              // Re-enable click-through when leaving widget (if not expanded)
              if (!isExpanded && !textInputOpen && !threadsModalOpen && !isInteracting) {
                if (window.electronAPI && window.electronAPI.setIgnoreMouseEvents) {
                  window.electronAPI.setIgnoreMouseEvents(true, { forward: true });
                }
              }
            }
          }}
        >
          <div style={{
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
            animation: 'pulse 2s infinite'
          }}></div>
        </div>

        {/* Active Text - Below the widget */}
        {showActiveText && (
          <div style={{
            position: 'absolute',
            top: '60px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 10000
          }}>
            Active
          </div>
        )}

        {/* Extended Widget Controls - Pure Horizontal Layout */}
        {isExpanded && (
          <div 
            className="widget-controls"
            style={{
              position: 'absolute',
              top: '0',
              left: shouldExpandLeft ? '-320px' : '60px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '25px',
              padding: '8px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              width: '300px',
              animation: 'slideDown 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={() => {
              setIsExpanded(true);
              // Disable click-through when hovering over controls
              if (window.electronAPI && window.electronAPI.setIgnoreMouseEvents) {
                window.electronAPI.setIgnoreMouseEvents(false);
              }
            }}
            onMouseLeave={() => {
              if (!isInteracting) {
                setIsExpanded(false);
                // Re-enable click-through when leaving controls (if not interacting)
                if (!textInputOpen && !threadsModalOpen && !isInteracting) {
                  if (window.electronAPI && window.electronAPI.setIgnoreMouseEvents) {
                    window.electronAPI.setIgnoreMouseEvents(true, { forward: true });
                  }
                }
              }
            }}
          >
            {/* Voice Button */}
            <button
              onClick={toggleVoice}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: voiceEnabled ? '#ef4444' : '#6b7280',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              {voiceEnabled ? (
                // Mic Off Icon
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                </svg>
              ) : (
                // Mic On Icon
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* Text Input Toggle Button */}
            <button
              onClick={handleTextInputToggle}
              style={{
                height: '40px',
                padding: '0 16px',
                border: '1px solid #d1d5db',
                borderRadius: '20px',
                backgroundColor: textInputOpen ? '#3b82f6' : 'white',
                color: textInputOpen ? 'white' : '#374151',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                flex: 1
              }}
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              Quick Text
            </button>

            {/* Open Threads Button */}
            <button
              onClick={handleThreadsOpen}
              style={{
                height: '40px',
                padding: '0 16px',
                border: '1px solid #d1d5db',
                borderRadius: '20px',
                backgroundColor: 'white',
                color: '#374151',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                flex: 1
              }}
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
              Threads
            </button>
          </div>
        )}

        {/* Text Input Widget */}
        {textInputOpen && (
          <div 
            className="widget-controls"
            onMouseEnter={() => {
              setIsInteracting(true);
              setIsExpanded(true);
              // Disable click-through when hovering over text input
              if (window.electronAPI && window.electronAPI.setIgnoreMouseEvents) {
                window.electronAPI.setIgnoreMouseEvents(false);
              }
            }}
            onMouseLeave={() => {
              setIsInteracting(false);
              // Re-enable click-through when leaving text input (if not interacting)
              if (!threadsModalOpen && !isInteracting) {
                if (window.electronAPI && window.electronAPI.setIgnoreMouseEvents) {
                  window.electronAPI.setIgnoreMouseEvents(true, { forward: true });
                }
              }
            }}
            style={{
              position: 'absolute',
              top: '60px',
              left: shouldExpandLeft ? '-320px' : '60px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              width: '300px',
              animation: 'slideDown 0.3s ease'
            }}
          >
            <div style={{ marginBottom: '8px' }}>
                             <input
                 ref={textInputRef}
                 type="text"
                 placeholder="Type your message..."
                 value={textInputValue}
                 onChange={(e) => setTextInputValue(e.target.value)}
                 onKeyPress={(e) => e.key === 'Enter' && handleTextInputSend()}
                 onFocus={() => {
                   setIsInteracting(true);
                   setIsExpanded(true);
                 }}
                 onBlur={() => {
                   // Don't immediately close on blur to allow clicking send button
                   setTimeout(() => {
                     if (!textInputRef.current?.contains(document.activeElement)) {
                       setIsInteracting(false);
                     }
                   }, 100);
                 }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}
              />
            </div>
            <button
              onClick={handleTextInputSend}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#3b82f6',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
              }}
            >
              Send Message
            </button>
          </div>
        )}

        {/* Threads Modal */}
        {threadsModalOpen && (
          <div 
            className="widget-modal"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10001
            }}
            onClick={handleThreadsClose}
          >
            <div 
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                width: '400px',
                maxHeight: '500px',
                overflowY: 'auto',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '20px' 
              }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Conversation Threads</h3>
                <button
                  onClick={handleThreadsClose}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    color: '#6b7280'
                  }}
                >
                  ×
                </button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    style={{
                      display: 'flex',
                      justifyContent: message.sender === 'human' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '80%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        backgroundColor: message.sender === 'human' ? '#3b82f6' : '#f3f4f6',
                        color: message.sender === 'human' ? 'white' : '#374151',
                        fontSize: '14px',
                        wordWrap: 'break-word'
                      }}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WidgetMain;
