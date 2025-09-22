import React from 'react';
import './AIAssistant.css';

// This component renders the correct icon and text based on the AI's status
const RenderHelper = ({ status }) => {
  switch (status) {
    case 'loading':
      return (
        <>
          <div className="ai-icon loader"></div>
          <span className="ai-status-text">Loading Model...</span>
        </>
      );
    case 'listening':
      return (
        <>
          <div className="ai-icon waves"></div>
          <span className="ai-status-text">Listening...</span>
        </>
      );
    case 'processing':
      return (
        <>
          <div className="ai-icon dots">
            <span></span><span></span><span></span>
          </div>
          <span className="ai-status-text">Processing...</span>
        </>
      );
    case 'error':
      return (
        <>
          <div className="ai-icon">
            <ErrorIcon />
          </div>
          <span className="ai-status-text">Error</span>
        </>
      );
    // NEW: 'ready' is the state after the model loads but before listening starts
    case 'ready':
    case 'inactive':
    default:
      return (
        <>
          <div className="ai-icon">
            <MicIcon />
          </div>
          <span className="ai-status-text">Voice Assistant</span>
        </>
      );
  }
};

const AIAssistant = ({ status, onClick }) => {
  const statusClass = `ai-status-${status}`;
  // UPDATED: The button is now enabled when it's ready OR when it's already listening (to allow stopping).
  const isButtonDisabled = !['ready', 'listening'].includes(status);

  return (
    <button 
      className={`ai-assistant-button ${statusClass}`} 
      onClick={onClick} 
      disabled={isButtonDisabled}
    >
      <RenderHelper status={status} />
    </button>
  );
};


// Simple SVG Icon Components (UNCHANGED)
const MicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
  </svg>
);

const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);


export default AIAssistant;