import React, { useState } from 'react';
import "./css/Post.css";
import { Avatar } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {   ChatBubbleOutlined,  MoreHorizOutlined,  RepeatOutlined, ShareOutlined } from '@mui/icons-material';
import {Modal} from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import CloseIcon from '@mui/icons-material/Close';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactTimeAgo from 'react-time-ago';
import axios from "axios";
import ReactHtmlParser from 'html-react-parser';
import { selectUser } from '../feature/userSlice';
import { useSelector } from 'react-redux';
 function LastSeen({date}){
  return(
    <div>
     <ReactTimeAgo date={date} locale="en-US" timeStyle="Round" />
    </div>
  )
 }



function Post({post}) {
   const [isModalOpen,setIsModalOpen]=useState(false);
   const [answer,setAnswer]=useState("");
   const Close=<CloseIcon/>;
   const user= useSelector(selectUser);
   const handleQuill=(value)=>{
    setAnswer(value);
   };
   console.log(answer);

   const handleSubmit=async()=>{
    if(post?._id && answer!==""){
      const config ={
        headers:{
          "Content-Type":"application/json"
        }
      }
      const body ={
        answer: answer,
        questionId: post?._id,
        user:user,
      }
      await axios.post('/api/answers',body,config).then((res)=>{
        console.log(res.data);
        alert("answer Added succesfully");
        setIsModalOpen(false);
        window.location.href ='/';
      }).catch((e)=>{
        console.log(e);
      })
    }
   }
  return (
    <div className='post'>
      <div className="post-info">
        <Avatar src={post?.user?.photo}/>
        <h4>{post?.user?.userName}</h4>
 
        <small><LastSeen date={post?.createdAt}/></small>
      </div>
      <div className="post-body">
      <div className="post-question">
        <p>
           {post?.questionName }
        </p>
        <button onClick={()=> {setIsModalOpen(true) 
          console.log(post._id)} }className='post-btnAnswer'>Answer</button>
        <Modal   open={isModalOpen} closeIcon={Close} onClose={() => setIsModalOpen(false)}
                    closeOnEsc center closeOnOverlayClick={false}
                    styles={{
                        overlay: {
                            height: 'auto',

                        },
                    }}>
                      <div className="modal-question">
                        <h1>{post?.questionName}</h1>
                        <p>asked by {''} <span className="name">{post?.user?.userName}</span> on <span className="name">{new Date(post?.createdAt).toLocaleString()}</span></p>
                      </div>
                      <div className="modal-answer">
                        <ReactQuill value={answer}  onChange={handleQuill} placeholder="Enter your Answer"/>
                      </div>
                      <div className="modal-button">
                      <button className="cancel" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </button>
                        <button onClick={handleSubmit}  type="submit" className='add' >
                            Add Question
                        </button>
                      </div>
                    </Modal>
        </div>
        { post.questionUrl !=="" &&
          <img src={post.questionUrl} alt="imageUrl"/>
        }
      </div>
      <div className="post-footer">
        <div className="post-footerAction">
        <ArrowUpwardIcon/>
        <ArrowDownwardIcon/>
        </div>
        <RepeatOutlined/>
        <ThumbUpIcon/>
        <ChatBubbleOutlined/>
        <div className="post-footerLeft">
            <ShareOutlined/>
            <MoreHorizOutlined/>
        </div>
      </div>
      <p style={{color:"rgba(0,0,0,0.5",
          fontSize:"12px",
          fontWeight:"bold",
          margin:"10px 0",
      }}>{post?.allAnswers.length} Answer(s)</p>

      <div style={{margin:"5px 0px 0px 0px",
         padding:"5px 0px 0px 20px",
         borderTop:"1px solid lightgray",
      }}  className="post-answer">
       
        {
          post?.allAnswers?.map((_a)=>(<> <div style={{
            display:"flex",
            flexDirection:"column",
            width:"100%",
            padding:"10px 5px",
            borderTop:"1px solid lightgray",
        }} className="post-answer-container">
            <div style={{
            display:"flex",
            alignItems:"center",
           marginBottom:"10px",
           fontSize:"12px",
           fontWeight:"600",
           color:"#8888",
           
        }} className="post-answered">
                <Avatar src={_a?.user?.photo}/>
                <div style={{
                    margin:"0px 10px",
                }} 
                className="post-info">
                    <p>
                        {_a?.user?.userName}
                    </p>
                    <span><LastSeen date={_a?.createdAt}/></span>
                </div>
            </div>
            <div className="post-answer">
                {ReactHtmlParser(_a?.answer)}
            </div>  </div> 
        </>  ))
        }
          
       
      </div>
    </div>
  );
}

export default Post
