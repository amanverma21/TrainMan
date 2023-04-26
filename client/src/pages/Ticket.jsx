import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { address } from '../utils/route';
import TrainIcon from '@mui/icons-material/Train';

const Ticket = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({}); 
    const { id } = useParams();
    let data;

    const callUserData = async () => {
        try {
            const res = await fetch(`${address}/account/tickets/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });

            data = await res.json();
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
        <div className='p-3 ticketpage'>
            <div className='container-fluid d-flex justify-content-between'>
                <Link to='/account' style={{ textDecoration: "none", fontSize: "2rem", color: "black", fontWeight: "bold" }}>TrainMan</Link>
                <TrainIcon style={{ fontSize: "3rem" }} />
            </div>
            <div className='container-fluid px-4 py-2' style={{ textAlign: "justify" }}>
                <h4 className='text-center text-danger'>*** Important ***</h4>
                <ul>
                    <li className='fw-bold'>You can travel on e-ticket sent on SMS or take a Virtual Reservation Message (VRM) along with any one of the prescribed ID in original. Please do not print the ERS unless extremely necessary. This Ticket will be valid with an ID proof in original. Please carry original identity proof. If found traveling without original ID proof, passenger will be treated as without ticket and charged as per extent Railway Rules.</li>
                    <li className='fw-bold'>Only confirmed/RAC/Partially confirmed E-ticket is valid for travel. Fully Waitlisted E-ticket is invalid for travel if it remains fully waitlisted after preparation of chart and the refund of the booking amount shall be credited to the account used for payment for booking of the ticket. Travelling on afully waitlisted e-ticket is illegal.</li>
                    <li className='fw-bold'>Valid IDs to be presented during train journey by one of the passenger booked on an e-ticket :- Voter Identity Card / Passport / PAN Card / Driving License / Photo ID card issued by Central / State Govt / Public Sector Undertakings of State / Central Government ,District Administrations , Muncipal bodies and Panchayat Administrations which are having serial number / Student Identity Card with photograph issued by recognized School or College for their students / Nationalized Bank Passbook with photograph /Credit Cards issued by Banks with laminated photograph/Unique Identification Card "Aadhaar", m-Aadhaar, e-Aadhaar. /Passenger showing the Aadhaar/Driving Licence from the"Issued Document" section by logging into his/her DigiLocker account considered as valid proof of identity. (Documents uploaded by the user i.e. the document in "Uploaded Document" section will not be considered as a valid proof of identity).</li>
                    <li className='fw-bold'>Service Accounting Code (SAC) 996411: Local land transport services of passengers by railways for distance upto 150 KMs Service Accounting Code (SAC) 996416: Sightseeing transportation services by railways for Tourist Ticket Service Accounting Code (SAC) 996421: Long distance transport services of passengers through rail network by Railways for distance beyond 150 KMs</li>
                    <li className='fw-bold'>General rules/ Information for e-ticket passenger have to be studied by the customer for cancellation & refund.</li>
                </ul>
                <div className='row mt-5 trainDetailsDiv'>
                    <p className='col-xs-6 col-sm-4 fw-bold text-center border'>PNR no. : {userData.pnr}</p>
                    <p className='col-xs-6 col-sm-4 fw-bold text-center border'>Train: {userData.trainName}</p>
                    <p className='col-xs-6 col-sm-4 text-center border'>Quota: {userData.quota}</p>
                </div>
                <div className='row trainDetailsDiv'>
                    <p className='col-xs-6 col-sm-4 fw-bold text-center border'>Transaction ID: {userData.transactionID}</p>
                    <p className='col-xs-6 col-sm-4 text-center border'>Date of Booking: {userData.dateOfBooking}</p>
                    <p className='col-xs-6 col-sm-4 text-center border'>Class of Travel: {userData.classOfTravel}</p>
                </div>
                <div className='row trainDetailsDiv'>
                    <p className='col-xs-6 col-sm-4 text-center border'>From: {userData.sourceStn}</p>
                    <p className='col-xs-6 col-sm-4 text-center border'>Date of Journey: {userData.dateOfJourney}</p>
                    <p className='col-xs-6 col-sm-4 text-center border'>To: {userData.destinationStn}</p>
                </div>
                <div className='row trainDetailsDiv'>
                    <p className='col-xs-6 col-sm-4 text-center border'>Schedule Departure: {userData.departureTime}</p>
                    <p className='col-xs-6 col-sm-4 text-center border'>Schedule Arrival: {userData.arrivalTime}</p>
                    <p className='col-xs-6 col-sm-4 text-center border'>Mobile No. : {userData.mobileNo}</p>
                </div>
                <p>Fare Details</p>
                <div className='row trainDetailsDiv'>
                    <p className='col-xs-6 col-sm-4 text-center border'>Ticket Fare: {userData.ticketFare}</p>
                    <p className='col-xs-6 col-sm-4 text-center border'>Gateway Charge: {userData.gatewayCharge}</p>
                    <p className='col-xs-6 col-sm-4 text-center border'>Total Fare: {userData.totalFare}</p>
                </div>
                <p>Passenger Details</p>
                <div className='row trainDetailsDiv'>
                    <p className='col-xs-6 col-sm-4 text-center border'>Passenger Name: {userData.passengerName}</p>
                    <p className='col-xs-6 col-sm-4 text-center border'>Age: {userData.passengerAge}</p>
                    <p className='col-xs-6 col-sm-4 text-center border'>Gender: {userData.passengerGender}</p>
                </div>
                <p>Principle Service Provider</p>
                <div className='row trainDetailsDiv'>
                    <p className='col-xs-12 col-sm-6 text-center border'>Agent Name: Team TrainMan</p>
                    <p className='col-xs-12 col-sm-6 text-center border'>Email ID: trainman@gmail.com</p>
                </div>
                <div className='row trainDetailsDiv'>
                    <p className='col-xs-12 col-sm-6 text-center border'>Phone No. : 1234556789</p>
                    <p className='col-xs-12 col-sm-6 text-center border'>Location: Surat, Gujarat</p>
                </div>
                <ul className='mt-4'>
                    <li className='fw-bold'>For details, rules and terms & conditions of E-Ticketing services, please visit www.trainman.co.in</li>
                    <li className='fw-bold'>New Time Table is effective from 01-09-2014.Departure time printed on this ERS/VRM is liable to change. Please Check correct departure from Railway Station Enquiry,
                        Dial 139 or SMS 'RAIL' to 139.</li>
                    <li className='fw-bold'>There are amendments in certain provision of Refund Rules. Refer Amended Refund Rules w.e.f 12-Nov- 2015.(details available on www.trainman.co.in under heading Refund Rule--
                        Cancellation of Ticket and Refund Rules 2015.)</li>
                    <li className='fw-bold'>E-ticket cancellations are permitted through respective agent website only.</li>
                    <li className='fw-bold'>PNRs having fully waitlisted status will be dropped and the names of the passengers will not appear on the chart. They are not allowed to board the train. However the names of
                        PARTIALLY waitlisted/confirmed and RAC will appear in the chart.</li>
                    <li className='fw-bold'>Railway Security Helpline No.182</li>
                    <li className='fw-bold'>ALL India Passenger Helpline no 138</li>
                    <li className='fw-bold'>PNR and train arrival/departure enquiry no. 139</li>
                    <li className='fw-bold'>To report unsavoury situation during journey, Please dial railway security helpline no. 182</li>
                </ul>
            </div>
        </div>
    )
}

export default Ticket