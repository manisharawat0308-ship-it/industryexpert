import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'
import LoginPage from './pages/LoginPage'
import IndustryHub from './pages/IndustryHub'

// Lazy load all dashboards — only loads when user navigates to that route
const Dashboard = lazy(() => import('./pages/Dashboard'))
const SteelDashboard = lazy(() => import('./pages/SteelDashboard'))
const CementDashboard = lazy(() => import('./pages/CementDashboard'))
const PaperDashboard = lazy(() => import('./pages/PaperDashboard'))
const SugarDashboard = lazy(() => import('./pages/SugarDashboard'))
const AutoDashboard = lazy(() => import('./pages/AutoDashboard'))
const AutoAncillaryDashboard = lazy(() => import('./pages/AutoAncillaryDashboard'))
const TyreDashboard = lazy(() => import('./pages/TyreDashboard'))
const TextileDashboard = lazy(() => import('./pages/TextileDashboard'))
const ElectronicsDashboard = lazy(() => import('./pages/ElectronicsDashboard'))
const FMCGDashboard = lazy(() => import('./pages/FMCGDashboard'))
const PharmaDashboard = lazy(() => import('./pages/PharmaDashboard'))
const BFSIDashboard = lazy(() => import('./pages/BFSIDashboard'))
const AviationDashboard = lazy(() => import('./pages/AviationDashboard'))
const StartupsDashboard = lazy(() => import('./pages/StartupsDashboard'))
const HospitalityDashboard = lazy(() => import('./pages/HospitalityDashboard'))
const PaperQuiz = lazy(() => import('./pages/PaperQuiz'))
const IndustryQuiz = lazy(() => import('./pages/IndustryQuiz'))

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f9fc]">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#831c1d] rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-sm font-semibold text-gray-500">Loading Dashboard...</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/hub" element={<ProtectedRoute><IndustryHub /></ProtectedRoute>} />
        <Route path="/steel/*" element={<ProtectedRoute><SteelDashboard /></ProtectedRoute>} />
        <Route path="/cement/*" element={<ProtectedRoute><CementDashboard /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute><IndustryQuiz /></ProtectedRoute>} />
        <Route path="/paper/quiz" element={<ProtectedRoute><PaperQuiz /></ProtectedRoute>} />
        <Route path="/paper/*" element={<ProtectedRoute><PaperDashboard /></ProtectedRoute>} />
        <Route path="/sugar/*" element={<ProtectedRoute><SugarDashboard /></ProtectedRoute>} />
        <Route path="/automobile/*" element={<ProtectedRoute><AutoDashboard /></ProtectedRoute>} />
        <Route path="/auto-ancillary/*" element={<ProtectedRoute><AutoAncillaryDashboard /></ProtectedRoute>} />
        <Route path="/tyre/*" element={<ProtectedRoute><TyreDashboard /></ProtectedRoute>} />
        <Route path="/textile/*" element={<ProtectedRoute><TextileDashboard /></ProtectedRoute>} />
        <Route path="/electronics/*" element={<ProtectedRoute><ElectronicsDashboard /></ProtectedRoute>} />
        <Route path="/fmcg/*" element={<ProtectedRoute><FMCGDashboard /></ProtectedRoute>} />
        <Route path="/pharma/*" element={<ProtectedRoute><PharmaDashboard /></ProtectedRoute>} />
        <Route path="/bfsi/*" element={<ProtectedRoute><BFSIDashboard /></ProtectedRoute>} />
        <Route path="/aviation/*" element={<ProtectedRoute><AviationDashboard /></ProtectedRoute>} />
        <Route path="/startups/*" element={<ProtectedRoute><StartupsDashboard /></ProtectedRoute>} />
        <Route path="/hospitality/*" element={<ProtectedRoute><HospitalityDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/:industryId" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  )
}
