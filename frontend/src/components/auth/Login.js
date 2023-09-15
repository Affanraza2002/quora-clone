import React from 'react'
import './Login.css'; 
import {signInWithPopup} from 'firebase/auth'
import { auth, provider } from '../../firebase';
function Login() {
   const handleSubmit =async()=>{
      await   signInWithPopup(auth,provider).then((result)=>{
        console.log(result);
      }).catch((error)=>{
        console.log(error);
      })
   }

  return (
    <div className='login-container'>
      <div className="login-content">
        <img src="https://www.applicoinc.com/wp-content/uploads/2017/06/quora.png" alt="login" />
        <small>A place to share knowledge and better understand the world</small>
        <button onClick={handleSubmit} className='btn
        -login'>
        <img className="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png" alt="G" /><span  > Continue using Google </span></button>
        <button onClick={handleSubmit} className='btn
        -login'>
        <img className="" src="https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049579.jpg?w=740&t=st=1694685226~exp=1694685826~hmac=54bb4cf25d34cd965b9456659759c2ce2ec502d63779f67e52e9278c7b7c25b5" alt="G" /><span  > Continue using Facebook </span></button>
      </div>
    </div>
  );
}

export default Login
