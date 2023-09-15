import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import { AssignmentTurnedInOutlined, ExpandMore, NotificationsOutlined, PeopleAltOutlined, Search } from '@mui/icons-material';
import { Avatar, Button, Input } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './css/QuoraHeader.css';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { logout, selectUser } from '../feature/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function QuoraHeader() {

    const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl,setInputUrl]=useState("");
  const[question,setQuestion]=useState("");
  
    const Close = (<CloseIcon />);
  const dispatch =useDispatch();
  const user =useSelector(selectUser); 
const handleSubmit= async ()=>{
  if(question!==""){
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    };

    const body ={
        questionName: question,
        questionUrl: inputUrl,
        user:user,
    }
    await axios.post('/api/questions',body,config).then((res)=>{
        console.log(res.data);
        alert(res.data.message);
        window.location.href='/'
    }).catch((e)=>{
        console.log(e);
        alert('Error ')
    })
  }
};

const handleLogOut =()=>{
    if(window.confirm('Are you sure to logout ?')){
    signOut(auth).then(()=>{
        dispatch(logout())
        console.log("Logged Out")
    }).catch(()=>{
        console.log("Error in Logout"); 
    });
}
}
    return (
        <div className='qHeader'>
            <div className="qHeader-content">
                <div className="qHeader-logo">
                    <img src="https://www.applicoinc.com/wp-content/uploads/2017/06/quora.png" alt="logo" /></div>        <div className="qHeader-icons">
                    <div className="qHeader-icon ">
                        <HomeIcon />
                    </div>
                    <div className="qHeader-icon " ><FeaturedPlayListIcon /></div>
                    <div className="qHeader-icon"><AssignmentTurnedInOutlined /></div>
                    <div className="qHeader-icon"><PeopleAltOutlined /></div>
                    <div className="qHeader-icon"><NotificationsOutlined /></div>
                </div>
                <div className="qHeader-input">
                    <Search />
                    <input type="text" placeholder='Search Question' />
                </div>
                <div className="qHeader-Rem">
                <span onClick ={handleLogOut}> <Avatar src={user?.photo}/></span>
                   
                </div>
                <Button onClick={() => setIsModalOpen(true)} >Add Question</Button>
                <Modal
                    open={isModalOpen} closeIcon={Close} onClose={() => setIsModalOpen(false)}
                    closeOnEsc center closeOnOverlayClick={false}
                    styles={{
                        overlay: {
                            height: 'auto',

                        },
                    }}
                >
                    <div className="modal-title">
                        <h5>Add Question</h5>
                        <h5>Share Link</h5>
                    </div>
                    <div className="modal-info">
                        <Avatar src={user?.photo}className='avatar' />
                        <div className="modal-scope">
                            <PeopleAltOutlined />
                            <p>Public</p>

                            <ExpandMore />
                        </div>
                    </div>
                    <div className="modal-field">
                        <Input type="text" 
                        value={question}
                        onChange={(e)=>setQuestion(e.target.value)} placeholder="Start your question with 'What','How','why',etc.." />
                        <div style={{
                            display: "flex",
                            flexDirection: "colomn",
                        }} className='modal-fieldLink'>
                            <input type="text" value={inputUrl} onChange={(e)=>setInputUrl(e.target.value)} style={{
                                margin: "2px 0",
                                border: "1px solid lightgray",
                                padding: "10px ",
                                outline: "2px solid black",
                            }} placeholder="Optional: Include a link that gives Context" />
                            {inputUrl !=="" && <img style={{height:"40vh",
                               objectFit:"contain",
                               marginTop:"10px",
                            }} src={inputUrl} alt="display"/>}
                        
                        </div>
                    </div>
                    <div className="modal-buttons">
                        <button className="cancel" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </button>
                        <button onClick={handleSubmit} type="submit" className='add' >
                            Add Question
                        </button>
                    </div>
                </Modal>
            </div>

        </div>


    )
}

export default QuoraHeader
