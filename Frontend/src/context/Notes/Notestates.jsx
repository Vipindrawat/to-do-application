import React, { useState } from 'react'
import notecontext from "./Notecontext";


const Notestates = (props) => {

  const [notes, setnotes] = useState([]);

  const url = "http://localhost:5000"

  const shownotes = async () => {
    const response = await fetch(`${url}/api/notes/getnotes`, {
      method: "GET",

      headers: {
        "auth-token": localStorage.getItem("token")
      }
    });
    const res = await response.json();
    setnotes(res);
  }

  //Add a note --
  const addnote = async (title, description, tag) => {
    //Fetching data from api/backend-
    const response = await fetch(`${url}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    })
    //client side logic for adding a note:
    const data = await response.json();
    if (data.success == true) {
      setnotes(notes.concat(data.note));
    }
  }

  //Delete a note--
  const deletenote = async (id) => {
    //Fetching data from api/backend-and delting note in backend:
    const response = await fetch(`${url}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token")
      }
    })

    //client side code for deleting a note:
    const newnotes = notes.filter((note) => { return note._id != id });
    setnotes(newnotes);
  }

  //Edit a note--
  const editnote = async (id, title, description, tag) => {
    //Fetching data from api/backend-and editing note in backend:
    const response = await fetch(`${url}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag })
    })
    const json = await response.json();

    //Client  side code for editing a note:
    let newnotes = JSON.parse(JSON.stringify(notes));
    let element, i;
    for (i = 0; i < notes.length; i++) {
      element = notes[i];
      if (element._id == id) {
        newnotes[i].title = json.data.title;
        newnotes[i].description = json.data.description;
        newnotes[i].tag = json.data.tag;
        break;
      }
    }
    setnotes(newnotes);
  }

  return (
    <notecontext.Provider value={{ notes, shownotes, addnote, deletenote, editnote }}>
      {props.children}
    </notecontext.Provider>
  )
}

export default Notestates;
