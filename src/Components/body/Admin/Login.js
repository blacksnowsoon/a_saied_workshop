import { useState } from 'react';
import { Link } from 'react-router-dom';
import admin_500x500xwhite from '../../Assets/admin_500x500xwhite.jpg';
import * as Icons from '../SVG_24/Icons'

const Login = ({ checkUser })=> {

  const user = 'blacksno';

  function goToDashBoard (e) {
    e.preventDefault();
    console.log(user)
    checkUser(user);
  }

  return (
    <>
      <div className="login-container">
        <h3>مرحبا بك في لوحة التحكم</h3>
        <div className='login-img'>
         <img src={admin_500x500xwhite} alt="borad" /> 
        </div>
        
        <div className='login-content'>
        <Icons.InfoSVG />
          <p>يجب تسجيل الدخول بحساب جوجل <br></br>حتي  تسطيع الوصول الي لوحة التحكم</p>
          <button className="login-btn" onClick={goToDashBoard}>تسجيل الدخول <span></span></button>
        </div>
        
      </div>
    </>
  )

}

export default Login;