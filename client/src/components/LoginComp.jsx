import React, { useContext, useState } from 'react'
import { Button, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { userContext } from '../App';
import { address } from '../utils/route';
import Cookies from 'js-cookie';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2d3436',
        },
    },
});

const LoginComp = () => {
    const { state, dispatch } = useContext(userContext);
    const [fill, setFill] = useState(false);
    const [error, setError] = useState(false);
    const [success, setsuccess] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [userInfo, setUserInfo] = useState();

    const fillClose = () => setFill(false);
    const errorClose = () => setError(false);
    const successClose = () => {
        navigate('/account');
        setsuccess(false)
    };

    const navigate = useNavigate();

    const login = async (e) => {
        // console.log({ email, pass });
        e.preventDefault();
        if (!email || !pass) {
            setFill(true);
        }
        else {
            const response = await fetch(`${address}/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    pass
                }),
                credentials: 'include'
            });
            if (response.ok) {
                response.json().then(userInfo => {
                    setUserInfo(userInfo);
                    Cookies.set('irctc-clone', userInfo.token);
                    setsuccess(true);
                    dispatch({ type: "USER", payload: true });
                })
            } else {
                setError(true);
            }
        }
    }

    return (
        <div className='login-comp'>
            <form className='login-form' onSubmit={login}>
                <ThemeProvider theme={theme}>
                    <Typography variant='h4'>Welcome Back !</Typography>
                    <TextField label="Email" type='email' value={email} onChange={e => setEmail(e.target.value)} variant="outlined" className='login-input' />
                    <TextField label="Password" type='password' value={pass} onChange={e => setPass(e.target.value)} variant="outlined" className='login-input' />
                    <Button variant='contained' type='submit'>Login</Button>
                    <Typography variant='h6'>Don't have an account? <Link to='/signup' style={{ color: '#eb4d4b' }}>Register</Link></Typography>
                    <Modal show={fill} onHide={fillClose}>
                        <Modal.Header closeButton>
                            <Modal.Title className='text-danger'>Oops!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>You haven't filled the form properly.<br></br>Every field is mandatory!</Modal.Body>
                        <Modal.Footer>
                            <Button color="error" onClick={fillClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={success} onHide={successClose}>
                        <Modal.Header closeButton>
                            <Modal.Title className='text-success'>Welcome!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Login Successful!</Modal.Body>
                        <Modal.Footer>
                            <Link to='/account' className='btn btn-primary' onClick={successClose}>
                                Okay
                            </Link>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={error} onHide={errorClose}>
                        <Modal.Header closeButton>
                            <Modal.Title className='text-danger'>Oops!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Login failed!<br></br>Try again...</Modal.Body>
                        <Modal.Footer>
                            <Button color="error" onClick={errorClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </ThemeProvider>
            </form>
        </div>
    )
}

export default LoginComp