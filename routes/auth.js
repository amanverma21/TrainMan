const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../model/userSchema');
const authenticate = require('../middleware/authenticate');

/* Registration */
router.post('/signup', async (req, res) => {
    const { name, email, phone, pass,gender,confirm_pass } = req.body;
    if (!name || !email || !phone || !pass || !gender || !confirm_pass) {
        res.status(422).json({ error: "Fill it properly" });
    }
    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            res.status(422).json({ error: "Email already exists!" });
        }
        else if (pass != confirm_pass) {
            res.status(422).json({ error: "Password and Confirm Password should match!" });
        }
        else {
            const user = new User({ name: name, email: email, phone: phone, pass: pass, gender:gender,confirm_pass: confirm_pass });
            await user.save();
            res.status(201).json({ message: "Registration Successful!" });
        }
    } catch (err) {
        console.log(err);
    }
});

/* Login route */
router.post('/', async (req, res) => {
    try {
        let token;
        const { email, pass } = req.body;

        if (!email || !pass) {
            res.status(422).json({ error: "Fill it properly..." })
        }

        const userLogin = await User.findOne({ email: email })

        if (userLogin) {
            const isMatch = await bcrypt.compare(pass, userLogin.pass);

            token = await userLogin.generateAuthToken();

            res.cookie("jwtoken", token, {
                maxAge: 86400000,
                httpOnly: true,
            });

            if (!isMatch) {
                res.status(400).json({ message: "Wrong credentials!" });
            }
            else {
                res.status(201).json({ message: `Welcome ${userLogin.name} !`, token: token });
            }
        }
        else {
            res.status(422).json({ message: "Wrong credentials!" });
        }
    } catch (err) {
        console.log(err);
    }
});

/* Save Ticket */
router.post('/save-ticket', authenticate, async (req, res) => {
    const { trainName, quota, classOfTravel, sourceStn, destinationStn, dateOfJourney, departureTime, arrivalTime, mobileNo, distance, ticketFare, gatewayCharge, passengerName, passengerAge, passengerGender } = req.body;
    const pnrCharacters = '0123456789';
    let pnrResult = '';
    const pnrCharactersLength = pnrCharacters.length;
    for (let i = 0; i < 10; i++) {
        pnrResult += pnrCharacters.charAt(Math.floor(Math.random() * pnrCharactersLength));
    }

    const transactionCharacters = 'IJRSTUVWXYZ0123456789';
    let transactionResult = '';
    const transactionCharactersLength = transactionCharacters.length;
    for (let i = 0; i < 15; i++) {
        transactionResult += transactionCharacters.charAt(Math.floor(Math.random() * transactionCharactersLength));
    }

    let currentdate = new Date();
    let datetime = currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds() + " "
        + currentdate.getDate() + "-"
        + (currentdate.getMonth() + 1) + "-"
        + currentdate.getFullYear();

    try {
        const pnr = pnrResult;
        const transactionID = transactionResult;
        const dateOfBooking = datetime;
        const totalFare = parseInt(ticketFare) + parseInt(gatewayCharge);

        if (!trainName || !quota || !classOfTravel || !sourceStn || !destinationStn || !departureTime || !arrivalTime || !mobileNo || !distance || !ticketFare || !gatewayCharge || !passengerName || !passengerAge || !passengerGender) {
            return res.json({ error: "Please fill the reservation form" });
        }

        const saveTicket = await User.findOne({ _id: req.userID });

        if (saveTicket) {
            const userMessage = await saveTicket.addTicket(pnr, trainName, quota, transactionID, dateOfBooking, classOfTravel, sourceStn, destinationStn, dateOfJourney, departureTime, arrivalTime, mobileNo, distance, ticketFare, gatewayCharge, totalFare, passengerName, passengerAge, passengerGender);
            await saveTicket.save();
            res.status(201).json({ message: "saved successfully" });
        }
    } catch (err) {
        res.status(400).json({ message: "error occured" });
        console.log(err);
    }
})

/* get user data */
router.get('/account', authenticate, (req, res) => {
    res.send(req.rootUser);
})

router.get('/account/tickets/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const user = req.rootUser.tickets;
    try {
        const ticket = user.find(obj => (obj._id).toString() === id);
        res.json(ticket);
    } catch (err) {
        res.json(err);
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('User Logged out !');
})

module.exports = router;