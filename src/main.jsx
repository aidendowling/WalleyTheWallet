import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BudgetsProvider } from './contexts/BudgetsContext.jsx'

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <BudgetsProvider>
      <App />
    </BudgetsProvider>
  </React.StrictMode>
)