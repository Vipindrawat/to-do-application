import React, { useContext, useState } from 'react'
import notecontext from '../context/Notes/Notecontext'
import alertcontext from '../context/Alert/Alertcontext';

const Addnote = (props) => {
   const {setprogress}=props;

    const data = useContext(alertcontext);
    const {alerthandle}=data;

    const notes = useContext(notecontext);
    const { addnote } = notes;
    const [note, setnote] = useState({ title: "", description: "", tag: "" });

    const change = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    const clickbutton = (e) => {
        setprogress(10);
        e.preventDefault();
        setprogress(20);
        addnote(note.title, note.description, note.tag);
        setprogress(70);
        setnote({ title: "", description: "", tag: "" });
        alerthandle("Success","Note added successfully","green");
        setprogress(100);
    }

    return (
        <div>
            <div className='container m-auto flex flex-col items-center'>
                <h1 className='mt-4 sm:text-4xl text-2xl font-serif mb-1 text-violet-800'>ADD NOTE:</h1>
                <form onSubmit={clickbutton} className='md:w-5/6 w-3/4 mt-3 ' action="/.js">

                    <label htmlFor="title" className='font-serif text-4xl text-purple-700 '>Title:</label><br />
                    <input className=' border-2 border-purple-500 rounded h-20 w-full pl-3 mb-4 mt-1 placeholder-purple-400 text-blue-700' type="text" onChange={change} placeholder='Title should be atleast 3 characters' id='title' name='title' minLength="3" required value={note.title == "" ? "" : note.title} /><br />

                    <label htmlFor="description" className='font-serif text-4xl text-purple-700'>Description :</label><br />
                    <textarea minLength="3" required className="h-28 resize-x rounded-md border-2 border-purple-500 w-full p-3 mt-1 placeholder-purple-400 text-blue-700" onChange={change} id='description' placeholder='Description should be atleast 5 characters' name='description' value={note.description == "" ? "" : note.description}></textarea><br />

                    <label htmlFor="tag" className='font-serif text-4xl text-purple-700'>Tag:</label><br />
                    <input className=' border-2 border-purple-500 rounded h-20 w-full pl-3 mb-4 mt-1  placeholder-purple-400 text-blue-700' type="text" name="tag" onChange={change} placeholder='Tag should be atleast 2 characters' id='tag' minLength="2" required value={note.tag == "" ? "" : note.tag} /><br />

                    <div className="flex justify-center">
                        <button type="submit" disabled={(note.title.length < 3 || note.description.length < 5 || note.tag.length < 2 ? true : false)} className='w-52 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded ' >Save</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Addnote;
