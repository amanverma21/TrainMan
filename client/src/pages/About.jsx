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
                    <h4 className='text-center'>ABOUT IRCTC</h4>
                    <p>IRCTC, short for Indian Railway Catering and Tourism Corporation, is a subsidiary of the Indian Railways that primarily deals with the catering, tourism, and online ticketing operations of Indian Railways. It was incorporated in 1999 and is headquartered in New Delhi, India.</p>
                    <p>IRCTC offers a range of services to passengers including:</p>
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
                            E-catering services: Passengers can order food of their choice from a wide range of restaurants and food chains at select railway stations through its e-catering services.
                        </li>
                        <li>
                            Retiring room and dormitory booking services: It provides retiring room and dormitory booking services at railway stations for passengers who need a place to rest during their journey.
                        </li>
                        <li>
                            Tatkal ticket booking services: It provides Tatkal ticket booking services for emergency travel.
                        </li>
                    </ul>
                    <p>IRCTC is a popular platform in India for booking train tickets and availing other services related to train travel. It has millions of users who use its services every day.</p>
                    <a href='https://www.irctc.co.in/nget/train-search' className='d-block text-center my-4 fs-4'>You can visit the IRCTC official website here <TbExternalLink /></a>
                    <p>This website is a demo project using MERN Stack.</p>
                    <p>
                        MERN stack is a popular JavaScript-based web development stack that consists of four main technologies: MongoDB, Express.js, React.js, and Node.js. The name "MERN" is an acronym that stands for the first letter of each of these technologies.
                    </p>
                    <p>Here's a brief overview of each component of the MERN stack:</p>
                    <ul>
                        <li>
                            MongoDB: MongoDB is a popular NoSQL database that uses a document-based data model. It is designed to be flexible and scalable and can handle large amounts of data.
                        </li>
                        <li>
                            Express.js: Express.js is a web application framework for Node.js. It provides a set of features and tools for building web applications and APIs.
                        </li>
                        <li>
                            React.js: React.js is a popular JavaScript library for building user interfaces. It provides a component-based approach to building web applications and is known for its performance and scalability.
                        </li>
                        <li>
                            Node.js: Node.js is a JavaScript runtime that allows developers to run JavaScript on the server-side. It provides a scalable, non-blocking, event-driven architecture that can handle high levels of concurrency.
                        </li>
                    </ul>
                    <p>
                        Together, these technologies form a powerful stack for building modern web applications. MongoDB provides a flexible and scalable database solution, while Express.js provides a robust web application framework. React.js allows developers to build responsive and dynamic user interfaces, and Node.js provides a scalable server-side runtime.
                    </p>
                    <p>
                        The MERN stack is popular among developers because it allows them to build full-stack web applications using a single language (JavaScript) and a consistent set of tools and technologies. It is also known for its scalability, performance, and flexibility.
                    </p>
                </div>
            </ThemeProvider>
            <Footer />
        </div>
    )
}

export default About