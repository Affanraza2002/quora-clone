import { Avatar } from '@mui/material'
import React from 'react'
import './css/QuoraBox.css'
import { useSelector } from 'react-redux';
import { selectUser } from '../feature/userSlice';
function QuoraBox() {
  const user =useSelector(selectUser);
  return (

    <div className='quoraBox'>
    <div className="quoraBox-info">
      <Avatar src={user?.photo}/>

    </div>
    <div className='quoraBox-quora'>
        <h5>Ask your Question Here ?</h5>
    </div>
    </div>
  )
}

export default QuoraBox
