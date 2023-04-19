import React from 'react'
import { Button } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Links = () => {
    const navigate = useNavigate();
    return (
        <div className='row py-4 d-flex justify-content-center'>
            <Button className='col-md-3 col-6 m-1' variant='outlined' style={{ width: "170px" }} startIcon={<CheckCircleOutlineIcon />} onClick={() => { navigate('/tickets') }}>Reservations</Button>
            <Button className='col-md-3 col-6 m-1' variant='outlined' style={{ width: "170px" }} startIcon={<ConfirmationNumberOutlinedIcon />} onClick={() => { navigate('/new-ticket') }}>Book a Ticket</Button>
            <Button className='col-md-3 col-6 m-1' variant='outlined' style={{ width: "170px" }} startIcon={<PermIdentityIcon />} onClick={() => { navigate('/account') }}>Account</Button>
            <Button className='col-md-3 col-6 m-1' variant='outlined' style={{ width: "170px" }} startIcon={<LogoutIcon />} onClick={() => { navigate('/logout') }}>Logout</Button>
        </div>
    )
}

export default Links