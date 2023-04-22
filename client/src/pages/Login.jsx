import React from 'react'
import LoginComp from '../components/LoginComp';
import Navbar from '../components/Navbar';
import Navbar1 from '../components/Navbar1'

const Login = () => {

    return (
        <div className='loginpage'>
            <Navbar1 />
            <LoginComp />
        </div>
    )
}

export default Login