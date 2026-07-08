import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import DartscorePrivacy from './pages/DartscorePrivacy.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dartscore-privacy" element={<DartscorePrivacy />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
