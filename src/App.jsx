import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './Components/NavBar';
import { Home } from './Components/Home';
import { About } from './Components/About';
import Contact from './Components/Contact';
import { LogIn } from './Components/LogIn';
import { SignUp } from './Components/SignUp';
import { Footer } from './Components/Footer';
import { DashBoard } from './Components/DashBoard';

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <NavBar />
              <main>
                  <Routes>
                      <Route path="/" element={<home />} />
                      <Route path="/about" element={<about />} />
                      <Route path="/contact" element={<contact />} />
                      <Route path="/login" element={<logIn />} />
                      <Route path="/signup" element={<signUp />} />
                      <Route path="/ClientDashboard" element={<dashBoard />} />
                      <Route path="/ClientDashboard" element={<dashBoard />} />
                      <Route path="/ClientDashboard" element={<dashBoard />} />
                      <Route path="/ClientDashboard" element={<dashBoard />} />
                      <Route path="/ClientDashboard" element={<dashBoard />} />
                      <Route path="*" element={<Home />} />
                  </Routes>
              </main>
              <Footer />
          </BrowserRouter>
      </div>
  );
}

export default App;
