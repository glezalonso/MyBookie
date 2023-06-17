import React from 'react'

// Router
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Unprotected from './Authorization/Unprotected'
import Protected from './Authorization/Protected'

// Unprotected Routes
import Login from './pages/Login'
import GenerateOTP from './pages/components/recovery/GenerateOTP'
import VerifyOTP from './pages/components/recovery/VeryfyOPT'
import ResetPassword from './pages/components/recovery/ResetPassword'
import _404 from './pages/_404'

// Protected Routes
import Home from './pages/Home'
import Sports from './pages/Sports'
import SportDetail from './pages/SportDetail'
import LeagueDetail from './pages/LeagueDetail'
import Players from './pages/Players'
import PlayerDetail from './pages/PlayerDetail'
import Teams from './pages/Teams'
import TeamDetail from './pages/TeamDetail'
import SeasonDetail from './pages/SeasonDetail'
import RoundDetail from './pages/RoundDetail'
import MatchDetail from './pages/MatchDetail'
import Users from './pages/Users'
import UserDetail from './pages/UserDetail'

// Zustand
import { useAuthStore } from './store/auth'

const App = () => {
  const isLogged = useAuthStore(state => state.isLogged)

  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route element={<Unprotected isLogged={isLogged}></Unprotected>}>
      <Route path="/" element={<Login />} />
      <Route path="recovery" element={<GenerateOTP/>} />
      <Route path="recovery/verifyOTP/:email" element={<VerifyOTP/>} />
      <Route path="recovery/verifyOTP/:email/resetPasword/:OTP" element={<ResetPassword/>} />
      <Route path="*" element={<_404 />} />
      </Route>

      <Route element={<Protected isLogged={isLogged} />}>
      <Route path='home'element={ <Home />} />
      <Route path='sports' element={<Sports />} />
      <Route path='sports/:sportId' element={<SportDetail />} />
      <Route path='users' element={<Users />} />
      <Route path='users/:userId' element={<UserDetail />} />
      <Route path='sports/:sportId/leagues/:leagueId' element={<LeagueDetail />} />
      <Route path='players/' element={<Players />} />
      <Route path='players/:playerId' element={<PlayerDetail />} />
      <Route path='teams' element={<Teams/>} />
      <Route path='teams/:teamId' element={<TeamDetail />} />
      <Route path='sports/:sportId/leagues/:leagueId/seasons/:seasonId' element={<SeasonDetail />} />
      <Route path='sports/:sportId/leagues/:leagueId/seasons/:seasonId/rounds/:roundId' element={<RoundDetail />} />
      <Route path='sports/:sportId/leagues/:leagueId/seasons/:seasonId/rounds/:roundId/matches/:matchId' element={<MatchDetail />} />
      </Route>
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
