const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5 // limit each IP to 5 requests per windowMs
});

// Middleware
app.use(cors({
    origin: 'https://dadhichevents.netlify.app', // Remove /#contact
    methods: ['POST', 'GET'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/contact', limiter);

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Server is working!' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        
        console.log('Received form data:', { name, email, phone, message });

        if (!name || !email || !phone || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.RECIPIENT_EMAIL,
            subject: 'New Contact Form Submission - Dadhich Events',
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong> ${message}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');

        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Error sending message.', error: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});

// Start server
const PORT = process.env.PORT || 3000; // Use a number for port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});