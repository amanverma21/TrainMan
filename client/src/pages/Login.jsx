import React from 'react'
import LoginComp from '../components/LoginComp';
import Navbar from '../components/Navbar';

const Login = () => {

    return (
        <div className='loginpage'>
            <Navbar />
            <LoginComp />
        </div>
    )
}

export default Login