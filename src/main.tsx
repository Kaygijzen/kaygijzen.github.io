import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.tsx'
import DartscorePrivacy from './pages/DartscorePrivacy.tsx'
import DartScorePage from './pages/DartScorePage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dartscore-app" element={<DartScorePage />} />
        <Route path="/dartscore-privacy" element={<DartscorePrivacy />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
