import React, { useState, useRef, useEffect } from 'react';
import HoverComponent from '../../common/components/HoverComponent';
import HorizontalBar from './HorizontalBar';
import DropdownModal from './DropdownModal';

const DraggableWidget = () => {
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [showAurora, setShowAurora] = useState(false);
  const [isBarOpen, setIsBarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownType, setDropdownType] = useState('');
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
    setIsClicked(true);
    setIsBarOpen(true);
    setTimeout(() => setIsClicked(false), 200);
  };

  const handleCloseBar = () => {
    setIsBarOpen(false);
  };

  const handleTypeSomething = () => {
    setShowDropdown(true);
    setDropdownType('type');
    // Focus the textarea after a short delay to ensure the dropdown is rendered
    setTimeout(() => {
      const textarea = document.querySelector('.dropdown-textarea');
      if (textarea) {
        textarea.focus();
      }
    }, 100);
  };

  const handleOpenThread = () => {
    setShowDropdown(true);
    setDropdownType('thread');
    // Focus the textarea after a short delay to ensure the dropdown is rendered
    setTimeout(() => {
      const textarea = document.querySelector('.dropdown-textarea');
      if (textarea) {
        textarea.focus();
      }
    }, 100);
  };

  const handleCloseDropdown = () => {
    setShowDropdown(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
             onClick={(e) => {
               e.stopPropagation();
               handleClick();
             }}
             onMouseEnter={(e) => {
               if (!isClicked) {
                 e.target.style.transform = 'scale(1.05)';
                 e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.4)';
               }
             }}
             onMouseLeave={(e) => {
               if (!isClicked) {
                 e.target.style.transform = 'scale(1)';
                 e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
               }
             }}
           >
             {/* Blue inner circle */}
             <div 
               style={{
                 width: '25px',
                 height: '25px',
                 backgroundColor: '#007AFF',
                 borderRadius: '50%',
                 transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                 boxShadow: '0 0 20px rgba(0, 122, 255, 0.6), 0 0 40px rgba(0, 122, 255, 0.3), 0 0 60px rgba(0, 122, 255, 0.1)',
                 transform: isClicked ? 'scale(0.9)' : 'scale(1)',
                 animation: isClicked ? 'bounce 0.2s ease-out' : 'heartbeat 2s ease-in-out infinite',
                 filter: 'blur(1px)',
                 pointerEvents: 'none'
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

                    {/* Horizontal Bar */}
       {(isBarOpen || showDropdown) && (
         <HorizontalBar 
           isOpen={isBarOpen}
           onClose={handleCloseBar}
           onTypeSomething={handleTypeSomething}
           onOpenThread={handleOpenThread}
           position={position}
           showDropdown={showDropdown}
           onCloseDropdown={handleCloseDropdown}
           dropdownType={dropdownType}
         />
       )}

      {/* Dropdown Modal */}
      <DropdownModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        type={modalType}
      />
    </div>
  );
};

export default DraggableWidget;
