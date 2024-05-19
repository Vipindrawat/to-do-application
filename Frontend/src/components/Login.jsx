import React, { useContext } from 'react'
import usercontext from '../context/User/Usercontext'
import { Link, useNavigate } from 'react-router-dom';
import alertcontext from '../context/Alert/Alertcontext';


const Login = (props) => {
  const { setprogress } = props;

  const alert = useContext(alertcontext);
  const { alerthandle } = alert;
  const navigate = useNavigate();
  //importing state and function from context api:
  const data = useContext(usercontext);
  const { credential, setcredential, loginuser } = data;

  const onsubmit = async (e) => {
    e.preventDefault();
    const json = await loginuser(credential.lemail, credential.lpassword);
    if (json.success == true) {
      localStorage.setItem("token", json.token);
      navigate('/');
      alerthandle("Success", "Login sucessfull", "green");
    }
    else {
      if (json.error == "Please enter valid credentials") {
        const valid = document.getElementById("valid");
        valid.classList.remove("invisible");
        setTimeout(() => {
          valid.classList.add("invisible");
        }, 2500);
      }
      else {
        alerthandle("Error", "Internal server error", "red");
      }
    }
  }

  const onchange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value });
  }

  const onclick = () => {
    setprogress(10);
    const lpassword = document.getElementById("lpassword");
    setprogress(40);
    if (lpassword.getAttribute("type") == "password") {
      lpassword.setAttribute("type", "type");
      setprogress(70);
    }
    else {
      lpassword.setAttribute("type", "password");
      setprogress(70);
    }
    setprogress(100);
  }

  return (
    <div className=" flex items-center flex-col w-full  ">

      <form onSubmit={onsubmit} className='rounded 2xl:w-2/6 lg:w-[46%] md:w-7/12 w-11/12 sm:mt-20 mt-7 bg-white flex justify-center ' action="/.js">
        <div className="sm:w-5/6 w-11/12 my-5 ">
          <h1 className='text-center sm:font-light font-serif sm:text-3xl text-2xl text-blue-800 sm:my-10 my-4'> Log in</h1>

          <label htmlFor="lemail" className='font-serif sm:text-2xl text-xl text-purple-800'>Email :</label><br />
          <input type="email" required className="mb-5 border-2 border-blue-500 rounded sm:h-14 h-11 w-full  pl-3  mt-1 placeholder-purple-400 text-blue-700 sm:text-base text-sm " onChange={onchange} id='lemail' placeholder='Email should be a valid email' name='lemail' /><br />

          <div className="relative">
            <label htmlFor="lpassword" className='font-serif sm:text-2xl  text-xl text-purple-800'>Password:</label><br />
            <input className=' border-2 border-blue-500 rounded sm:h-14 h-11 w-full  pl-3 sm:mb-5 mb-4 mt-1  placeholder-purple-400 text-blue-700 sm:text-base text-xs' type="password" name="lpassword" onChange={onchange} placeholder='Password should be of atleast 5 characters' id='lpassword' minLength="5" required />
            <i onClick={onclick} id="lvisiblity" className="fa-solid fa-eye sm:text-2xl text-xl absolute right-4 sm:top-[3.25rem] top-11 hover:cursor-pointer" style={{ color: "#490bda" }}></i><br />
            <p className='invisible text-pink-700' id="valid">Please enter valid credentials</p><br />
          </div>

          <div className="flex justify-end space-x-5">
            <button type="submit" className='w-44 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded sm:mb-11 mb-5 mt-2' >Log in</button>
            <Link to="/signup"><button className='w-44 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded  mb-5 mt-2' >Sign up</button></Link>
          </div>
        </div>
      </form>


    </div>
  )
}

export default Login
