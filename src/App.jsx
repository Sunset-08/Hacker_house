import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import Home from './pages/Home'
import Builder from './pages/Builder'

// Stub components for optional future routes requested by the PRD
function VerifyPlaceholder() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center py-20 text-center font-mono">
      <span className="text-xs text-neon-coral mb-2">VERIFY_PORTAL // PH_5</span>
      <h2 className="text-xl text-white font-bold uppercase tracking-wider mb-2">QR ID Verification</h2>
      <p className="text-gray-400 text-xs uppercase tracking-wide">Verification module triggers in Phase 5.</p>
    </div>
  );
}

function ProfilePlaceholder() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center py-20 text-center font-mono">
      <span className="text-xs text-neon-coral mb-2">BUILDER_PROFILE // PH_5</span>
      <h2 className="text-xl text-white font-bold uppercase tracking-wider mb-2">Shared Builder Card</h2>
      <p className="text-gray-400 text-xs uppercase tracking-wide">Public sharing profile triggers in Phase 5.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/verify/:builderId" element={<VerifyPlaceholder />} />
          <Route path="/builder/:builderId" element={<ProfilePlaceholder />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </Router>
  )
}

export default App

