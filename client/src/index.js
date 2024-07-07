/* 
    The index.js is the initial page for the app
    it determines the layout restrictions based on 
    screen size by identifying the height and width
*/

/* Import react third-party files */
import React from 'react';

/* Import react third-party DOM files */
import { createRoot } from 'react-dom/client';

/* Import react inhouse files */
import App from './App';

import './index.css'

// Function to detect the type of device
function detectDevice() {
  // Check for touch support
  var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;

  // Check screen size
  var screenWidth = window.innerWidth;
  var isMobile = screenWidth < 600;
  var isTablet = screenWidth >= 600 && screenWidth <= 1024;
  var isDesktop = screenWidth > 1024;

  // Check user agent for additional clues
  var isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  var isAndroid = navigator.userAgent.match(/Android/i);

  // Log the detected device type
  if (isTouchDevice) {
      if (isiOS) {
          console.log("This is an iOS touch device (likely iPhone or iPad).");
      } else if (isAndroid) {
          console.log("This is an Android touch device.");
      } else {
          console.log("This is a touch device.");
      }
  } else {
      if (isMobile) {
          console.log("This is a mobile device.");
      } else if (isTablet) {
          console.log("This is a tablet device.");
      } else if (isDesktop) {
          console.log("This is a desktop or laptop device.");
      } else {
          console.log("Unable to determine device type.");
      }
  }
}

// Call the function to detect the device
detectDevice();

// Execute wrappers and App
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
