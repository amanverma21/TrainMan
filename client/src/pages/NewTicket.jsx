import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Navbar1 from '../components/Navbar1'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import { address } from '../utils/route';
import { useNavigate, Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Links from '../components/Links';
import Footer from '../components/Footer';
// const today = new Date();
// console.log(minDate);
const theme = createTheme({
    palette: {
        primary: {
            main: '#2d3436',
        },
    },
});

const NewTicket = () => {
    const navigate = useNavigate();
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [quota, setQuota] = useState('');
    const [classSeat, setClassSeat] = useState('');
    const [date, setDate] = useState(null);
    const [genderValue, setGenderValue] = useState('Male');
    const [trainAvailable, setTrainAvailable] = useState(false);
    const [age, setAge] = useState();
    const [arrivalTime, setArrivalTime] = useState();
    const [departureTimeValue, setDepartureTimeValue] = useState();
    const [gatewayCharge, setGatewayCharge] = useState();
    const [ticketFare, setTicketFare] = useState();
    const [trainName, setTrainName] = useState();
    const [userData, setUserData] = useState({});
    const [error, setError] = useState(false);
    const [success, setsuccess] = useState(false);
    const [fill, setFill] = useState(false);

    const fillClose = () => setFill(false);
    const errorClose = () => setError(false);
    const successClose = () => {
        navigate('/account');
        setsuccess(false)
    };

    let train, trainValue;

    const genderChange = (event) => {
        setGenderValue(event.target.value);
        console.log(genderValue);
    };

    const agevalue = (value) => {
        setAge(value);
        console.log(`${value} Yrs.`)
    }

    const sourceChange = (event) => {
        setSource(event.target.value);
    };
    const destinationChange = (event) => {
        setDestination(event.target.value);
    };
    const quotaChange = (event) => {
        setQuota(event.target.value);
    };
    const classChange = (event) => {
        setClassSeat(event.target.value);
    };

    const checkTrain = () => {
        train = document.getElementById('trainName');
        trainValue = document.getElementById('trainName').value;
        if (source === destination) {
            trainValue = "Source & Destination cannot be same";
            setTrainAvailable(false);
        }
        else if (source !== destination) {
            if (source === "Delhi" && destination === "Sealdah") {
                trainValue = "15280 Netaji Exp.";
                setTrainName(trainValue);
                setDepartureTimeValue("14:07");
                setArrivalTime("10:27");
                setTicketFare(475);
                setGatewayCharge(30);
                setTrainAvailable(true);
            }
            else if (source === "Delhi" && destination === "Howrah") {
                trainValue = "13637 HWH Duronto Exp.";
                setTrainName(trainValue);
                setDepartureTimeValue("07:24");
                setArrivalTime("15:53");
                setTicketFare(510);
                setGatewayCharge(30);
                setTrainAvailable(true);
            }
            else if (source === "Sealdah" && destination === "Delhi") {
                trainValue = "12098 Poorva Express";
                setTrainName(trainValue);
                setDepartureTimeValue("11:48");
                setArrivalTime("20:34");
                setTicketFare(475);
                setGatewayCharge(30);
                setTrainAvailable(true);
            }
            else if (source === "Sealdah" && destination === "Howrah") {
                trainValue = "No Train Available";
                setTrainAvailable(false);
            }
            else if (source === "Howrah" && destination === "Sealdah") {
                trainValue = "No Train Available";
                setTrainAvailable(false);
            }
            else {
                trainValue = "13638 NDLS Duronto Exp.";
                setTrainName(trainValue);
                setDepartureTimeValue("03:15");
                setArrivalTime("21:23");
                setTicketFare(510);
                setGatewayCharge(30);
                setTrainAvailable(true);
            }
        }
        train.value = trainValue;
        console.log(trainValue);
        console.log(departureTimeValue);
        console.log(arrivalTime);
        console.log(ticketFare);
        console.log(gatewayCharge);

    }
    const bookTicket = async (e) => {
        e.preventDefault();
        let mobileNo = document.getElementById('mobileNo').value;
        let name = document.getElementById('name').value;
        let distance = "1037 KM";
        let doj = `${date.$D}-` + `${date.$M + 1}-` + `${date.$y}`;
        console.log(doj)


        if (!source || !destination || !trainName || !quota || !classSeat || !doj || !departureTimeValue || !arrivalTime || !mobileNo || !ticketFare || !gatewayCharge || !name || !genderValue || !age || !distance) {
            setFill(true);
        }
        else {
            const response = await fetch(`${address}/save-ticket`, {
                method: "POST",
                body: JSON.stringify({ trainName: trainName, quota: quota, classOfTravel: classSeat, sourceStn: source, destinationStn: destination, dateOfJourney: doj, departureTime: departureTimeValue, arrivalTime: arrivalTime, mobileNo: mobileNo, distance: distance, ticketFare: ticketFare, gatewayCharge: gatewayCharge, passengerName: name, passengerAge: age, passengerGender: genderValue }),
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
            });
            console.log({ source, destination, trainName, quota, classSeat, doj, departureTimeValue, arrivalTime, mobileNo, ticketFare, gatewayCharge, name, genderValue, age, distance });

            const data = await response.json();
            if (data.status === 400 || !data) {
                setError(true);
            }
            else {
                setsuccess(true);
            }
        }
    }

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
        <div className='bookTicketPage'>
            <Navbar />
            <ThemeProvider theme={theme}>
                <h3 className='text-center mt-5'>Your IRCTC Reservations</h3>
                <div className="container">
                    <Links />
                </div>
                <div className='bookingDiv'>
                    <form onSubmit={bookTicket}>
                        <h4 className='text-center py-3'>Our Best Trains Are Always Available To Server You.</h4>
                        <FormControl fullWidth>
                            <InputLabel>Source Station</InputLabel>
                            <Select
                                labelId="sourceStn"
                                id="sourceStn"
                                value={source}
                                label="Source Station"
                                onChange={sourceChange}
                            >
                                <MenuItem value="Delhi">Delhi</MenuItem>
                                <MenuItem value="Howrah">Howrah</MenuItem>
                                <MenuItem value="Sealdah">Sealdah</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ margin: "10px 0" }}>
                            <InputLabel>Destination Station</InputLabel>
                            <Select
                                labelId="destinationStn"
                                id="destinationStn"
                                value={destination}
                                label="Destination Station"
                                onChange={destinationChange}
                            >
                                <MenuItem value="Delhi">Delhi</MenuItem>
                                <MenuItem value="Howrah">Howrah</MenuItem>
                                <MenuItem value="Sealdah">Sealdah</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant='contained' sx={{ display: "block", margin: "auto" }} onClick={checkTrain}>Check Trains</Button>
                        <TextField
                            disabled
                            fullWidth
                            id="trainName"
                            label="Train Name"
                            defaultValue="No Trains"
                            className="my-2"
                        />
                        {trainAvailable ? <>
                            <FormControl fullWidth sx={{ margin: "10px 0" }}>
                                <InputLabel>Select Quota</InputLabel>
                                <Select
                                    labelId="quotaSelect"
                                    id="quotaSelect"
                                    value={quota}
                                    label="Select Quota"
                                    onChange={quotaChange}
                                >
                                    <MenuItem value="General (GN)">General (GN)</MenuItem>
                                    <MenuItem value="Tatkal (TQ)">Tatkal (TQ)</MenuItem>
                                    <MenuItem value="Premium Tatkal (PT)">Premium Tatkal (PT)</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ margin: "10px 0" }}>
                                <InputLabel>Class of Travel</InputLabel>
                                <Select
                                    labelId="Class of Travel"
                                    id="Class of Travel"
                                    value={classSeat}
                                    label="Class of Travel"
                                    onChange={classChange}
                                >
                                    <MenuItem value="Air-Conditioned First Class (1AC)">Air-Conditioned First Class (1AC)</MenuItem>
                                    <MenuItem value="Air-Conditioned Two-Tier Class (2AC)">Air-Conditioned Two-Tier Class (2AC)</MenuItem>
                                    <MenuItem value="First Class (FC)">First Class (FC)</MenuItem>
                                    <MenuItem value="Sleeper Class (SL)">Sleeper Class (SL)</MenuItem>
                                    <MenuItem value="Second Class (2S)">Second Class (2S)</MenuItem>
                                    <MenuItem value="General Class (GS)">General Class (GS)</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker value={date} disablePast onChange={(newValue) => setDate(newValue)} />
                                </LocalizationProvider>
                            </FormControl>
                            <TextField id="mobileNo" fullWidth label="Mobile No." variant="outlined" className='my-2' />
                            <TextField id="name" fullWidth label="Passenger Name" variant="outlined" className='my-2' />
                            
                            <FormControl>
                                <FormLabel id="genderGroup">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={genderValue}
                                    onChange={genderChange}
                                >
                                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                </RadioGroup>
                            </FormControl>
                            <Typography id="input-slider" gutterBottom>
                                Age
                            </Typography>
                            <Slider
                                aria-label="Age"
                                defaultValue={age}
                                getAriaValueText={agevalue}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={1}
                                max={90}
                            />
                            <Button variant='contained' sx={{ display: "block", margin: "auto" }} type="submit">Book Ticket</Button>
                        </> : ""}
                    </form>
                    <Modal show={success} onHide={successClose}>
                        <Modal.Header closeButton>
                            <Modal.Title className='text-success'>Reservation Confirmed!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Successfully Completed the Reservation!</Modal.Body>
                        <Modal.Body>Happy Journey-शुभ यात्रा</Modal.Body>
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
                </div>
            </ThemeProvider>
            <Footer />
        </div >
    )
}

export default NewTicket