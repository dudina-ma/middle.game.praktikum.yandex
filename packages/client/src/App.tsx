import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Main from './pages/Main/Main'
import Login from './pages/Login/Login'
import SignIn from './pages/SignIn/SignIn'
import Profile from './pages/Profile/Profile'
import Game from './pages/Game/Game'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import Forum from './pages/Forum/Forum'
import ForumTopic from './pages/ForumTopic/ForumTopic'
import NotFound from './pages/NotFound/NotFound'



        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/:topicId" element={<ForumTopic />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
