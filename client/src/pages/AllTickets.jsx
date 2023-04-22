import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Links from '../components/Links';
import Navbar from '../components/Navbar';
import { address } from '../utils/route';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../components/Footer';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2d3436',
        },
    },
});

const AllTickets = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);

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
            let allTicket = data.tickets;
            allTicket.reverse();
            setUserData(allTicket)

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
        <div className='ticketspage'>
            <Navbar />
            <ThemeProvider theme={theme}>
                <div className='container py-3 ticketsDiv'>
                    <h3 className='text-center'>Your Reservations</h3>
                    <Links />
                    <p className='bg-dark general-info'>
                        Here you can see all your previously confirmed reservations with Trainman<br />
                        Click on any ticket to know more about it.
                    </p>
                    <div className='row ticketDiv'>
                        {userData.map((ticket, index) => (
                            <Link key={index} to={`/tickets/${ticket._id}`} className='col-lg-6 col-12 text-decoration-none my-2'>
                                <div className="singleTicketDiv">
                                    <div>
                                        <h6 className='text-dark fw-bolder'>Source: {ticket.sourceStn}</h6>
                                        <p className='text-dark'>Date of Journey: {ticket.dateOfJourney}</p>
                                        <p className='text-dark'>Train: {ticket.trainName}</p>
                                    </div>
                                    <div>
                                        <h6 className='text-dark fw-bolder'>Destination: {ticket.destinationStn}</h6>
                                        <p className='text-dark'>Departure Time: {ticket.departureTime}</p>
                                        <p className='text-dark'>Passenger: {ticket.passengerName}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </ThemeProvider>
            <Footer />
        </div>
    )
}

export default AllTickets