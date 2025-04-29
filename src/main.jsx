import './index.css'
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'

const root = document.getElementById('root');
if (!root) {
  throw new Error("No *root* element detected in DOM to attach React renderer")
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)