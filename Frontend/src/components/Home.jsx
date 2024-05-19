import React from 'react'
import Notes from './Notes'

const Home = (props) => {
  const {setprogress}=props;
  return (
    <Notes setprogress={setprogress}/>
  )
}

export default Home;
