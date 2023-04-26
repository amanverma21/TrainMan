import { Button, TextField } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GitHubIcon from '@mui/icons-material/GitHub';
import CallIcon from '@mui/icons-material/Call';
const Footer = () => {
    const navigate = useNavigate();
    const externalLinks = (name) => {
        if (name === "mail")
            window.location.href = "mailto:averma2k19@gmail.com";
        
        
        else if (name === "github")
            window.location.href = "https://github.com/amanverma21/TrainMan";
        
        else navigate('/contact');
    }
    return (
        <footer className='container-fluid bg-dark mt-4 py-3'>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-12 text-center my-3">
                        <h3 className='text-light'>TrainMan</h3>
                        <h6 style={{ color: "#5D5E61" }}>UI20EC10 & UI20EC12</h6>
                        <div className="d-flex justify-content-around mt-4" class="d-flex justify-content-center">
                        </div>
                    </div>
                    <div className="col-md-4 col-12 text-center my-3">
                        <h4 className='text-light'>Important Links</h4>
                        <Link to='/about' className='d-block text-decoration-none' style={{ color: "#5D5E61" }}>About Us</Link>
                        <Link to='/contact' className='d-block text-decoration-none' style={{ color: "#5D5E61" }}>Contact Us</Link>
                        <Link to='/tickets' className='d-block text-decoration-none' style={{ color: "#5D5E61" }}>Reservations</Link>
                        <Link to='/new-ticket' className='d-block text-decoration-none' style={{ color: "#5D5E61" }}>Book New Ticket</Link>
                    </div>
                    <div className="col-md-4 col-12 text-center my-3">
                        <h4 className='text-light'>For any Complaints</h4>
                        <input type='text' placeholder='Complaint' className='d-block p-2 m-auto text-center' style={{ borderRadius: "3px", border: "none", outline: "none", width: "250px" }} />
                        <Button variant='contained' color='error' className='my-2' style={{ width: "250px", height: "40px" }} >Submit</Button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer