import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AnimeDetail from './pages/AnimeDetail';


function App() {
  return (
    <div className="App">
    
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/anime-detail" element={<AnimeDetail />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
