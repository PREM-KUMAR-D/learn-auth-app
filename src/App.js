import { BrowserRouter as Router, Routes, Route } from 'react-router';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>

      <Layout>
        <Routes>
          <Route path='/' exact element={<HomePage/>} />
          <Route path='/auth' element={<AuthPage/>} />

          <Route path='/profile' element={<UserProfile/>} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
