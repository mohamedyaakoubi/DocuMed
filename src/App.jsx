import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './Pages/Navbar/Navbar';
import { Home } from './Pages/Home/Home'
import { About } from './Pages/About/About';
import {Contact} from './Pages/Contact/Contact';
import { LogIn } from './Pages/LogIn/LogIn';
import { SignUp } from './Pages/SignUp/SignUp';
import { Footer } from './Pages/Footer/Footer';
import {ClientDashboard} from './ClientComponents/ClientDashboard/ClientDashboard'

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Navbar />
              <main>
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/About" element={<About />} />
                      <Route path="/Contact" element={<Contact />} />
                      <Route path="/Login" element={<LogIn />} />
                      <Route path="/Signup" element={<SignUp />} />
                      <Route path="/ClientDashboard" element={<ClientDashboard />} />
                      <Route path="*" element={<Home />} />
                  </Routes>
              </main>
              <Footer />
          </BrowserRouter>
      </div>
  );
}

export default App;
