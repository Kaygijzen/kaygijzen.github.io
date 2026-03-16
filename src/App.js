import './App.css';
import {useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hiro from './components/Hiro';
import Skills from './components/Skills'
import Projects from './components/Projects';
import Honors from './components/Honors';
import Footer from './components/Footer';
import DartscorePrivacy from './components/DartscorePrivacy';
import AOS from 'aos';
import 'aos/dist/aos.css';


function Home() {
    useEffect(() => {
      document.title = 'Kay Gijzen';
      AOS.init();
    }, []);
    return (
        <div className="px-6 lg:px-20 xl:px-36 bg-dark-500">
            <Navbar />
            <Hiro />
            <Skills />
            <Honors />
            {/* <Projects /> */}
            <Footer />
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dartscore-privacy" element={<DartscorePrivacy />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
