import React from 'react'
import Links from '../components/Links'
import Navbar from '../components/Navbar'
import { TbExternalLink } from 'react-icons/tb';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../components/Footer';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2d3436',
        },
    },
});

const About = () => {
    return (
        <div className='aboutpage'>
            <Navbar />
            <ThemeProvider theme={theme}>
                <div className="container">
                    <Links />
                </div>
                <div className='container aboutdiv'>
                    <h4 className='text-center'>ABOUT TrainMan</h4>
                    <p>TrainMan, is a subsidiary of the Indian Railways that primarily deals with the tourism, and online ticketing operations of Indian Railways.</p>
                    <p>TrainMan offers a range of services to passengers including:</p>
                    <ul>
                        <li>
                            Online booking of train tickets: It provides an online platform for booking train tickets that can be accessed through its website or mobile app. Passengers can book tickets, check train schedules, and make payments online.
                        </li>
                        <li>
                            Tourism packages: It offers domestic and international tour packages, hotel bookings, and car rentals to passengers.
                        </li>
                        <li>
                            Catering services on trains and at railway stations: It manages catering services on trains and at railway stations across India. It also provides packaged drinking water and operates food plazas at select railway stations.
                        </li>
                        
                        
                        <li>
                            Tatkal ticket booking services: It provides Tatkal ticket booking services for emergency travel.
                        </li>
                    </ul>
                    <p>TrainMan is a popular platform in India for booking train tickets and availing other services related to train travel. It has millions of users who use its services every day.</p>
                    <a href='https://www.TrainMan.co.in/nget/train-search' className='d-block text-center my-4 fs-4'>You can visit the TrainMan official website here <TbExternalLink /></a>
                    
                </div>
            </ThemeProvider>
            <Footer />
        </div>
    )
}

export default About