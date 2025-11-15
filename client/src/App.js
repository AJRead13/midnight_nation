import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Characters from './pages/Characters';
import Campaigns from './pages/Campaigns';
import Lore from './pages/Lore';
import Monsters from './pages/Monsters';
import Abilities from './pages/Abilities';
import Rules from './pages/Rules';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/characters" element={<Characters />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/lore" element={<Lore />} />
              <Route path="/monsters" element={<Monsters />} />
              <Route path="/abilities" element={<Abilities />} />
              <Route path="/rules" element={<Rules />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
