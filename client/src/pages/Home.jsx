import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { address } from '../utils/route';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Links from '../components/Links';
import { FaPrayingHands } from 'react-icons/fa';
import Footer from '../components/Footer';
import { alignProperty } from '@mui/material/styles/cssUtils';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2d3436',
        },
    },
});

const Home = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    const callUserData = async () => {
        try {
            const res = await fetch(`${address}/account`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });

            const data = await res.json();
            setUserData(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
            navigate('/');
        }
    }

    useEffect(() => {
        callUserData();
    }, []);
    return (
        <div className='homepage'>
            <Navbar />
            <ThemeProvider theme={theme}>
                <div className='container py-3 userDetailDiv'>
                    <h3 className='text-center'>TrainMan Next-Gen e-Ticketing System</h3>
                    <Links />
                    <div className="bg-dark general-info">
                        You are all set to book your train ticket via TrainMan.<br /><br />
                        <h6>-: NOTE :-</h6>
                        Currently we are not allowing anyone to change their account details because the website is still in beta mode. Hope you will be able to edit your account details soon.<br /><br />
                        <div className='row'>
                            {/* <p className='col-md-4 col-12 text-center'><FaPrayingHands /> Happy Journey <FaPrayingHands /></p> */}
                            <p className='col-md-4 col-12 text-center' ><FaPrayingHands /> शुभ यात्रा <FaPrayingHands /></p>
                        </div>
                    </div>
                    <section className='my-4 userDetails'>
                        <div className='details'>
                            <p><span className='fields'>Name:</span> <span className='values'>{userData.name}</span></p>
                            <p><span className='fields'>Phone:</span> <span className='values'>{userData.phone}</span></p>
                            <p><span className='fields'>Email:</span> <span className='values'>{userData.email}</span></p>
                            <p><span className='fields'>Gender:</span> <span className='values'>{userData.gender}</span></p>
                            <p><span className='fields'>Occupation:</span> <span className='values'>{userData.email}</span></p>
                        </div>
                        <div className='train-image'></div>
                    </section>
                </div>
            </ThemeProvider>
            <Footer />
        </div >
    )
}

export default Home