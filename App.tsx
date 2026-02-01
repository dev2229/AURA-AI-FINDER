import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import Results from './pages/Results.tsx';
import Categories from './pages/Categories.tsx';
import About from './pages/About.tsx';
import SubmitTool from './pages/SubmitTool.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#020203]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            <Route path="/submit" element={<SubmitTool />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;