import React from 'react'
import '../styles.css'

const SetupPage = () => {
  console.log('SetupPage component loaded');
  
  const handleContinue = () => {
    console.log('Continue button clicked');
    // Send event to main process to continue with app setup
    if (window.electronAPI && window.electronAPI.setupContinue) {
      window.electronAPI.setupContinue();
    } else {
      console.error('electronAPI not available');
    }
  }

  return (
    <div className="setup-container">
      <div className="setup-content">
        <h1>Welcome to DonnaAI</h1>
        <p>Setup is complete. Click continue to start using DonnaAI.</p>
        <button 
          className="continue-button"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default SetupPage
