import React from 'react'
import { Button, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { address } from '../utils/route';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2d3436',
        },
    },
});

const RegisterComp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [error, setError] = useState(false);
    const [success, setsuccess] = useState(false);
    const [fill, setFill] = useState(false);

    const fillClose = () => setFill(false);
    const errorClose = () => setError(false);
    const successClose = () => {
        navigate('/');
        setsuccess(false)
    };

    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();
        if (!name || !email || !phone || !pass || !confirmPass) {
            setFill(true);
        }
        else if (pass.length < 8 || pass.length > 25) {
            alert("Password Length should be lesser than or equal to 25 and greater than or equal to 8");
        }
        else if (pass !== confirmPass) {
            alert("Password and Confirm password doesn't match !")
        }
        else {
            const response = await fetch(`${address}/signup`, {
                method: "POST",
                body: JSON.stringify({ name, email, phone, pass, confirm_pass: confirmPass }),
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            if (data.status === 422 || !data) {
                setError(true);
            }
            else {
                setsuccess(true);
                navigate("/");
            }
        }
    }

    return (
        <div className='login-comp'>
            <form className='login-form' onSubmit={register}>
                <ThemeProvider theme={theme}>
                    <Typography variant='h4'>Join Us !</Typography>
                    <TextField label="Name" type='text' value={name} onChange={e => setName(e.target.value)} variant="outlined" className='login-input' />
                    <TextField label="Email" type='email' value={email} onChange={e => setEmail(e.target.value)} variant="outlined" className='login-input' />
                    <TextField label="Phone" type='text' value={phone} onChange={e => setPhone(e.target.value)} variant="outlined" className='login-input' />
                    <TextField label="Password" type='password' value={pass} onChange={e => setPass(e.target.value)} variant="outlined" className='login-input' />
                    <TextField label="Confirm Password" type='password' value={confirmPass} onChange={e => setConfirmPass(e.target.value)} variant="outlined" className='login-input' />
                    <Button variant='contained' type='submit'>Signup</Button>
                    <Typography variant='h6'>Already have an account? <Link to='/' style={{ color: '#eb4d4b' }}>Login</Link></Typography>
                    <Modal show={success} onHide={successClose}>
                        <Modal.Header closeButton>
                            <Modal.Title className='text-success'>Welcome!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>User successfully registered!</Modal.Body>
                        <Modal.Footer>
                            <Link to='/' className='btn btn-primary' onClick={successClose}>
                                Okay
                            </Link>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={error} onHide={errorClose}>
                        <Modal.Header closeButton>
                            <Modal.Title className='text-danger'>Oops!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Registration failed!<br></br>Try again...</Modal.Body>
                        <Modal.Footer>
                            <Button color="error" onClick={errorClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
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
                </ThemeProvider>
            </form>
        </div>
    )
}

export default RegisterComp