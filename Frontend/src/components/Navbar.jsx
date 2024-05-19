import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation()

  let buttonclick = () => {
    let dropdown = document.getElementById('dropdown');
    dropdown.classList.toggle('hidden');
  }

  useEffect(() => {
    let option = document.getElementById('option');
    let dropdown = document.getElementById('dropdown');
    let outin = document.getElementById('outin');
    let first = document.getElementById('first');
    let second = document.getElementById('second');
    let third = document.getElementById('third');

    window.addEventListener('click', function (event) {

      if (event.target != option && event.target != outin && event.target != first && event.target != second && event.target != third) {

        if (!dropdown.classList.contains('hidden')) {
          dropdown.classList.add('hidden');
        }
      }
    })
  }, [])

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <div className='navbar h-16 bg-blue-500 flex text-white justify-around items-center '>
        <div className="sm:text-4xl text-2xl font-serif  border-blue-400 text-blue-100">
          MyNoteBook
        </div>
        <div className='space-x-6 sm:flex sm:items-center text-base hidden' >
          <Link className={`hover:text-black hover:cursor-pointer ${location.pathname == '/' ? 'text-gray-300' : ''}`} to="/">Home</Link>

          <Link className={`hover:text-black hover:cursor-pointer ${location.pathname == '/about' ? 'text-gray-300' : ''}`} to="/about">About</Link>

          <Link className={`hover:text-black hover:cursor-pointer ml-8 ${(location.pathname == "/" || location.pathname == "/about") ? "hidden" : ""} ${location.pathname == '/login' ? "text-gray-300" : ""}`} to="/login">Login</Link>

          <Link className={`hover:text-black hover:cursor-pointer ${location.pathname == "/" || location.pathname == "/about" ? "hidden" : ""} ${location.pathname == '/signup' ? "text-gray-300" : ""}`} to="/signup">Signup</Link>

          <button className={`w-28 border-4 border-white bg-blue-700 hover:bg-blue-800 text-white font-medium py-1 px-1  rounded  text-base  ${(location.pathname == '/' || location.pathname == '/about') ? "" : "hidden"} `} onClick={logout} >Log out</button>

        </div>

        <div className="space-x-4 flex text-base  sm:hidden">
          <Link to="/" className="hover:text-black hover:cursor-pointer text-white" id="menu-item-0">Home</Link>
          <Link to="/about" className="hover:text-black hover:cursor-pointer text-white" id="menu-item-1">About</Link>
          <button className={` border-4 border-white bg-blue-700 hover:bg-blue-800 text-white font-medium py-1  ml-2 rounded px-2 text-base  ${(location.pathname == '/' || location.pathname == '/about') ? "" : "hidden"} `} onClick={logout} >Log out</button>
        </div>


        <div className={`relative ${(location.pathname == "/" || location.pathname == '/about') ? "hidden" : "inline-block"} text-left sm:hidden`}>
          <div>
            <button id="option" onClick={buttonclick} type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-800 border-2 border-white" aria-expanded="true" aria-haspopup="true">
              <div id="outin" className="flex flex-col">
                <div id='first' className="h-0.5 w-5 bg-white "></div>
                <div id='second' className="h-0.5 w-5 bg-white my-1"></div>
                <div id='third' className="h-0.5 w-5 bg-white"></div>
              </div>
            </button>
          </div>

          <div id="dropdown" className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
            <div className="py-1" role="none">

              <button className={` block w-full px-4 py-2 text-left text-sm" role="menuitem ${location.pathname == '/login' ? "text-gray-300" : "text-gray-700"}`} tabIndex="-1" id="menu-item-3"><Link to="/login">Login</Link></button>
              <button className={` block w-full px-4 py-2 text-left text-sm" role="menuitem ${location.pathname == '/signup' ? "text-gray-300" : "text-gray-700"}`} tabIndex="-1" id="menu-item-1"> <Link to="/signup">Signup</Link></button>

            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Navbar;
