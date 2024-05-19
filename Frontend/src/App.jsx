import './App.css'
import About from './components/About'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notestates from './context/Notes/Notestates';
import Userstate from './context/User/Userstate'
import Alert from './components/Alert'
import Alertstate from './context/Alert/Alertstate'
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react'

function App() {
  const [progress, setprogresss] = useState();

  return (
    <>
      <Alertstate>
        <Userstate>
          <Notestates>
            <BrowserRouter>
              <LoadingBar
                color='#f11946'
                progress={progress}
                height={3}
                background="white"
              />

              <Navbar />
              <Alert />

              <Routes>
                <Route exact path="/" element={<Home setprogress={setprogresss} />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/login" element={<Login setprogress={setprogresss} />} />
                <Route exact path="/signup" element={<Signup setprogress={setprogresss} />} />
              </Routes>

            </BrowserRouter>

          </Notestates>
        </Userstate>
      </Alertstate>
    </>
  )
}

export default App
