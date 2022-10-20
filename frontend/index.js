import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './src/App.js'

const container = document.getElementById('root');
const root = createRoot(container);
console.log("made it")
root.render(<App />); 