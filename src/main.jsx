import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './index.jsx'

if (!root) throw new Error("No root element detected in DOM")

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
