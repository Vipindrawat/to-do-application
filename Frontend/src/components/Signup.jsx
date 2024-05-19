import React, { useContext } from 'react'
import usercontext from '../context/User/Usercontext'
import alertcontext from '../context/Alert/Alertcontext'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const aler = useContext(alertcontext);
    const { alerthandle } = aler;
    //Used for routes navigation-
    const navigate = useNavigate();
    //Using state and function defined in context api-
    const data = useContext(usercontext)
    const { signupcred, creatinguser, setsignupcred, password, setpassword } = data;

    //Validation for checking whether both password and confirm password matches or not-
    const passvalidation = () => {
        const cpassword = document.getElementById("cpassword");
        const fipassword = document.getElementById("password");

        if (fipassword.value != cpassword.value) {
            cpassword.setCustomValidity("Passwords does not match");
        }
        else {
            cpassword.setCustomValidity('');
        }
    }
    //Onchange for name and email input form data-
    const onchange = (e) => {
        setsignupcred({ ...signupcred, [e.target.name]: e.target.value });
    }
    //Onchange for password and confirmpassword input form data-
    const onchangepass = (event) => {
        setpassword({ ...password, [event.target.name]: event.target.value });
        passvalidation();
    }
    //Onsubmit event function:
    const onsubmit = async (e) => {
        e.preventDefault();
        const json = await creatinguser(signupcred.name, signupcred.email, password.password);
        if (json.success == true) {
            localStorage.setItem('token', json.token);
            navigate('/');
            alerthandle("Success","Signup sucessfull", "green");
        }
        else {
            if (json.error == "email of this name already exists") {
                const vemail = document.getElementById("vemail");
                vemail.classList.remove("invisible");
                setTimeout(() => {
                    vemail.classList.add("invisible");
                }, 4000)
            }
            else {
                alerthandle("Error","Internal server  error", "red");
            }
        }
    }
    //Onclick for password visiblity mode-
    const onclick = () => {
        const password = document.getElementById("password");
        if (password.getAttribute("type") == "password") {
            password.setAttribute("type", "type");
        }
        else {
            password.setAttribute("type", "password");
        }
    }
    const conclick = () => {
        const cpassword = document.getElementById("cpassword");
        if (cpassword.getAttribute("type") == "password") {
            cpassword.setAttribute("type", "type");
        }
        else {
            cpassword.setAttribute("type", "password");
        }
    }

    return (

        <div className=" flex justify-center w-full ">

            <form onSubmit={onsubmit} className='rounded 2xl:w-2/6 lg:w-[46%] md:w-7/12 w-11/12 mt-7 bg-white flex justify-center ' action="/.js">
                <div className="sm:w-5/6 w-11/12 my-5 ">
                    <h1 className='text-center sm:font-light font-serif sm:text-3xl text-2xl text-blue-800 sm:my-4 my-2'>Sign up</h1>
                    <label htmlFor="name" className='font-serif sm:text-2xl text-xl text-purple-800 '>Name: </label><br />
                    <input className=' border-2 border-blue-500 rounded sm:h-14 h-11 w-full pl-3 mb-4 mt-1 placeholder-purple-400 text-blue-700 sm:text-base text-sm' type="text" onChange={onchange} placeholder='Name should be of atleast 3 characters' id='name' name='name' minLength="3" required /><br />

                    <div>
                        <label htmlFor="email" className='font-serif sm:text-2xl text-xl text-purple-800'>Email :</label><br />
                        <input type="email" required className="mb-0 border-2 border-blue-500 rounded sm:h-14 h-11 w-full  pl-3  mt-1 placeholder-purple-400 text-blue-700 sm:text-base text-sm" onChange={onchange} id='email' placeholder='Email should be a valid email' name='email' /><br /><p className='invisible text-pink-700' id="vemail">Sorry, User with this email already exists</p><br />
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className='font-serif sm:text-2xl  text-xl text-purple-800'>Password:</label><br />
                        <input className=' border-2 border-blue-500 rounded sm:h-14 h-11 w-full  pl-3 mb-4 mt-1  placeholder-purple-400 text-blue-700 sm:text-base text-xs' type="password" name="password" onChange={onchangepass} placeholder='Password should be of atleast 5 characters' id='password' minLength="5" required />
                        <i onClick={onclick} id="visiblity" className="fa-solid fa-eye sm:text-2xl text-xl absolute right-4 sm:top-[3.25rem] top-11 hover:cursor-pointer" style={{ color: "#490bda" }}></i><br />
                    </div>

                    <div className="relative">
                        <label htmlFor="cpassword" className='font-serif sm:text-2xl  text-xl text-purple-800'>Confirm Password:</label><br />
                        <input className=' border-2 border-blue-500 rounded sm:h-14 h-11 w-full  pl-3 mb-4 mt-1  placeholder-purple-400 text-blue-700 sm:text-base text-xs' type="password" name="cpassword" onChange={onchangepass} placeholder='Password should be of atleast 5 characters' id='cpassword' minLength="5" required />
                        <i onClick={conclick} className="fa-solid fa-eye sm:text-2xl text-xl absolute right-4 sm:top-[3.25rem] top-11 hover:cursor-pointer" style={{ color: "#490bda" }}></i><br />
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className='w-52 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded  mb-5 mt-2' >Create Account</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Signup
