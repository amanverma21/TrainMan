import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu'; 
import { Link, useNavigate } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import InfoIcon from '@mui/icons-material/Info';
import MailIcon from '@mui/icons-material/Mail';
import Cookies from 'js-cookie';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2d3436',
        },
    },
});

const Navbar1 = () => {
    const navigate = useNavigate();
    const [isUser, setIsUser] = useState(false);
    const token = Cookies.get("irctc-clone");

    const logout = () => {
        navigate('/logout');
    }
    const account = () => {
        navigate('/account');
    }
    const tickets = () => {
        navigate('/tickets');
    }
    const newTicket = () => {
        navigate('/new-ticket');
    }
    const about = () => {
        navigate('/about');
    }
    const contact = () => {
        navigate('/contact');
    }

    const login = () => {
        navigate('/');
    }

    const signup = () => {
        navigate('/signup');
    }

    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Typography variant='h5' className='mt-3 mb-3 text-center'>Welcome to TrainMan!</Typography>
            {isUser ? <List>
                
                
                <ListItemButton className='my-2' onClick={about}>
                    <ListItemIcon sx={{ color: "black" }}>
                        <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary='ABOUT US' sx={{ color: "black" }} />
                </ListItemButton>
                <ListItemButton className='my-2' onClick={contact}>
                    <ListItemIcon sx={{ color: "black" }}>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary='CONTACT US' sx={{ color: "black" }} />
                </ListItemButton>
            </List> : <List>
                <ListItemButton className='my-2' onClick={about}>
                    <ListItemIcon sx={{ color: "black" }}>
                        <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary='ABOUT US' sx={{ color: "black" }} />
                </ListItemButton>
                <ListItemButton className='my-2' onClick={contact}>
                    <ListItemIcon sx={{ color: "black" }}>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary='CONTACT US' sx={{ color: "black" }} />
                </ListItemButton>
            </List>}
            <Divider />
            {isUser ? <List>
                <ListItemButton className='my-2' onClick={account}>
                    <ListItemIcon sx={{ color: "black" }}>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary='ACCOUNT' sx={{ color: "black" }} />
                </ListItemButton>
                <ListItemButton className='my-2' onClick={logout}>
                    <ListItemIcon sx={{ color: "black" }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary='LOGOUT' sx={{ color: "black" }} />
                </ListItemButton>
            </List> : <List>
                <ListItemButton className='my-2' onClick={login}>
                    <ListItemIcon sx={{ color: "black" }}>
                        <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary='LOGIN' sx={{ color: "black" }} />
                </ListItemButton>
                <ListItemButton className='my-2' onClick={signup}>
                    <ListItemIcon sx={{ color: "black" }}>
                        <HowToRegIcon />
                    </ListItemIcon>
                    <ListItemText primary='SIGNUP' onClick={signup} sx={{ color: "black" }} />
                </ListItemButton>
            </List>}
        </Box>
    );
    useEffect(() => {
        return () => {
            if (token === undefined || token === '') {
                setIsUser(false);
            }
            else {
                setIsUser(true);
            }
        }
    }, [])

    return (
        <nav className="nav-edit sticky-top">
            <ThemeProvider theme={theme}>
                <div className="container">
                    <Link to='/account' style={{ textDecoration: "none" }}>
                        <h2 className='text-dark'>TrainMan</h2>
                    </Link>
                    <span className='nav-menu'>
                        <Button startIcon={<ChevronLeftOutlinedIcon />} onClick={toggleDrawer("right", true)} variant="outlined">Menu</Button>
                        <Drawer
                            anchor={"right"}
                            open={state["right"]}
                            onClose={toggleDrawer("right", false)}
                        >
                            {list("right")}
                        </Drawer>
                    </span>
                </div>
            </ThemeProvider>
        </nav>
    )
}

export default Navbar1