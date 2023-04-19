const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    confirm_pass: {
        type: String,
        required: true
    },
    tickets: [
        {
            pnr: {
                type: String,
                required: true
            },
            trainName: {
                type: String,
                required: true
            },
            quota: {
                type: String,
                required: true
            },
            transactionID: {
                type: String,
                required: true
            },
            dateOfBooking: {
                type: String,
                required: true
            },
            classOfTravel: {
                type: String,
                required: true
            },
            sourceStn: {
                type: String,
                required: true
            },
            destinationStn: {
                type: String,
                required: true
            },
            dateOfJourney: {
                type: String,
                required: true
            },
            departureTime: {
                type: String,
                required: true
            },
            arrivalTime: {
                type: String,
                required: true
            },
            mobileNo: {
                type: String,
                required: true
            },
            distance: {
                type: String,
                required: true
            },
            ticketFare: {
                type: String,
                required: true
            },
            gatewayCharge: {
                type: String,
                required: true
            },
            totalFare: {
                type: String,
                required: true
            },
            passengerName: {
                type: String,
                required: true
            },
            passengerGender: {
                type: String,
                required: true
            },
            passengerAge: {
                type: String,
                required: true
            },
        },
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            },
        },
    ]
})

/* Hashing */

userSchema.pre('save', async function (next) {
    if (this.isModified('pass')) {
        this.pass = await bcrypt.hash(this.pass, 12);
        this.confirm_pass = await bcrypt.hash(this.confirm_pass, 12);
    }
    next();
});

/* Generating JWT */
userSchema.methods.generateAuthToken = async function () {
    try {
        let userToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        console.log(userToken);
        this.tokens = this.tokens.concat({ token: userToken });
        await this.save();
        return userToken;
    } catch (err) {
        console.log(err);
    }
}

/* Store ticket */
userSchema.methods.addTicket = async function (pnr, trainName, quota, transactionID, dateOfBooking, classOfTravel, sourceStn, destinationStn, dateOfJourney, departureTime, arrivalTime, mobileNo, distance, ticketFare, gatewayCharge, totalFare, passengerName, passengerAge, passengerGender) {
    try {
        this.tickets = this.tickets.concat({ pnr, trainName, quota, transactionID, dateOfBooking, classOfTravel, sourceStn, destinationStn, dateOfJourney, departureTime, arrivalTime, mobileNo, distance, ticketFare, gatewayCharge, totalFare, passengerName, passengerAge, passengerGender });
        await this.save();
        return this.tickets;
    } catch (err) {
        console.log(err);
    }
}

/* Collection Creation */
const User = mongoose.model('USER', userSchema);

module.exports = User;