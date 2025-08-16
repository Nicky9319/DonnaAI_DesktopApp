import React, { useEffect } from 'react'
import HoverComponent from '../../common/components/HoverComponent'
import ClickThroughTestComponent from './ClickThroughTestComponent'

const MainPage = () => {
  // Ensure click-through is enabled when component mounts
  useEffect(() => {
    // Enable click-through for the entire widget window
    if (window.electronAPI?.setIgnoreMouseEvents) {
      window.electronAPI.setIgnoreMouseEvents(true);
      console.log('Widget window click-through enabled on mount');
    }
  }, []);

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
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          border: '2px solid #007bff',
          minWidth: '300px',
          textAlign: 'center',
          pointerEvents: 'auto'
        }}
      >
        <h1 style={{ margin: '0 0 10px 0', color: '#333' }}>Widget Box</h1>
        <p style={{ margin: '0 0 15px 0', color: '#666' }}>This is the encapsulated box inside the hover component</p>
        
        {/* Test content to verify click interaction */}
        <div style={{ marginTop: '20px' }}>
          <p style={{ margin: '0 0 10px 0', color: '#555' }}>Click interaction test:</p>
          <button 
            onClick={() => alert('Widget button clicked!')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',  
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Widget Button
          </button>
        </div>
      </HoverComponent>
    </div>
  );
};

export default MainPage
