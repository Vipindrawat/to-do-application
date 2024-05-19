import React from 'react'
import notecontext from '../context/Notes/Notecontext'
import { useContext } from 'react'
import Noteitem from './Noteitem'
import Addnote from './Addnote'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import alertcontext from '../context/Alert/Alertcontext'

// Initialization for ES Users for modal-
import {
  Modal,
  Ripple,
  initTE,
} from "tw-elements";

const Notes = (props) => {
  const { setprogress } = props;

  const data = useContext(alertcontext);
  const { alerthandle } = data;

  const navigate = useNavigate();
  //using useRef hook--
  const ref = useRef(null);
  const exitref = useRef(null);

  const [note, setnote] = useState({ ntitle: "", ndescription: "", ntag: "" });

  const change = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  }

  const clickbutton = () => {
    setprogress(10);
    editnote(note._id, note.ntitle, note.ndescription, note.ntag);
    setprogress(70);
    exitref.current.click();
    alerthandle("Success", "Note Edited successfully", "green");
    setprogress(100);
  }

  initTE({ Modal, Ripple });
  const Notes = useContext(notecontext);
  const { notes, shownotes, editnote } = Notes;

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
    else {
      shownotes();
    }
  }, [])

  let editclick = (currentnote) => {
    ref.current.click();
    setnote({ ntitle: currentnote.title, ndescription: currentnote.description, ntag: currentnote.tag, _id: currentnote._id });
  }

  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button" ref={ref}
        className=" rounded bg-primary px-6 hidden pb-2 pt-2.5 text-xs text-black font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        data-te-toggle="modal"
        data-te-target="#exampleModal"
        data-te-ripple-init
        data-te-ripple-color="light">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        data-te-modal-init
        className="backdrop-blur-sm fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
          <div
            className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div
              className="bg-gradient-to-l from-indigo-700 flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              {/* <!--Modal title--> */}
              <h5
                className=" text-2xl  font-serif leading-normal text-blue-800 mt-8"
                id="exampleModalLabel">
                EDIT NOTE
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="text-white box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* <!--Modal body--> */}
            <div className="relative flex-auto p-4 bg-gradient-to-r from-blue-400 " data-te-modal-body-ref>


              <div className='flex justify-center'>
                <form className='md:w-5/6 w-3/4 mt-7 ' action="/.js">
                  <label htmlFor="ntitle" className='font-serif text-3xl text-purple-900 '>Title:</label><br />
                  <input className=' border-2 border-indigo-700 rounded h-20 w-full pl-3 mb-4 mt-1 text-blue-700' type="text" onChange={change} value={note.ntitle} id='ntitle' name='ntitle' /><br />

                  <label htmlFor="ndescription" className='font-serif text-3xl text-purple-900'>Description :</label><br />
                  <textarea className="resize-x rounded-md border-2 border-indigo-700 w-full h-28 p-3 mt-1 text-blue-700" onChange={change} id='ndescription' value={note.ndescription} name='ndescription'></textarea><br />

                  <label htmlFor="ntag" className='font-serif text-3xl text-purple-900'>Tag:</label><br />
                  <input className=' border-2 border-indigo-700 rounded h-20 w-full pl-3 mb-4 mt-1 text-blue-700' type="text" name="ntag" onChange={change} value={note.ntag} id='ntag' /><br />

                </form>
              </div>



            </div>

            {/* <!--Modal footer--> */}
            <div
              className="bg-gradient-to-l from-indigo-700 flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <button
                type="button" ref={exitref}
                className="inline-block rounded bg-blue-700 text-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase  "
                data-te-modal-dismiss >
                Close
              </button>
              <button
                type="button" onClick={clickbutton}
                className="ml-1 inline-block rounded bg-blue-700 text-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <Addnote setprogress={setprogress} />
      <div className="container mx-auto flex justify-center">
        <div className="mb-8 md:w-5/6 w-3/4 mt-7">
          <h1 className='text-4xl text-purple-700 mb-4 mt-7' > Your Notes :</h1>
          <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
            {(notes == 0) && "No notes available"}
            {notes != 0 && notes.map((value) => {
              return <Noteitem note={value} editnote={editclick} key={value._id} setprogress={setprogress} />
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Notes;
