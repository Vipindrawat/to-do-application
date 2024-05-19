import React, { useContext } from 'react'
import notecontext from '../context/Notes/Notecontext';
import alertcontext from '../context/Alert/Alertcontext';
  
  const Noteitem = (props) => {
   const data=useContext(alertcontext);
   const {alerthandle}=data;

    const { note,editnote,setprogress } = props;

    const notes = useContext(notecontext);
    const { deletenote } = notes;

    const onchange = () => {
        setprogress(10);
        deletenote(note._id);
        setprogress(50);
        setprogress(70);
        alerthandle("Success","Note deleted successfully","green");
        setprogress(100);
    }

    return (
        <>
            <div className="w-sm w-full lg:w-full ">
                <div id='uni' className="  border-2 border-purple-400 rounded  p-4 flex flex-col justify-between leading-normal backdrop-filter backdrop-blur-xl bg-gray-100 ">
                    <div >
                        <div className="text-blue-600 font-medium text-xl mb-2">{note.title}</div>
                        <p className="text-gray-600 text-base">{note.description}</p>
                        <div className="flex justify-end space-x-5 mt-3 mb-1">
                            <i className="fa-solid fa-user-pen hover:cursor-pointer text-xl " onClick={()=>{editnote(note)}} style={{ color: " #11a4d4" }}></i>
                            <i className="fa-solid fa-trash hover:cursor-pointer text-xl" onClick={onchange} style={{ color: "#1492e1" }}></i>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Noteitem;
