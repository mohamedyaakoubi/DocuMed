import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './Pages/Navbar/Navbar';
import {Home} from './Pages/Home/Home'
import { About } from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import { LogIn } from './Pages/LogIn/LogIn';
import { SignUp } from './Pages/SignUp/SignUp';
import { Footer } from './Pages/Footer/Footer';


function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Navbar />
              <main>
                  <Routes>
                      <Route path="/" element={<home />} />
                      <Route path="/About" element={<about />} />
                      <Route path="/Contact" element={<contact />} />
                      <Route path="/Login" element={<logIn />} />
                      <Route path="/Signup" element={<signUp />} />
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
