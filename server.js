const express = require('express');
const nodemailer = require('nodemailer');
const sanitizeHtml = require('sanitize-html');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware with specific CORS configuration
app.use(cors({
    origin: ['https://dadhichevents.netlify.app','http://127.0.0.1:5500'], // Add your frontend URL here
    methods: ['POST', 'GET'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/test', (req, res) => {
    res.send('Server is working!');
});

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: { message: 'Too many requests, please try again later.' }
});

// Apply rate limiting to contact endpoint
app.use('/api/contact', limiter);

// Contact form endpoint
app.post('/api/contact', async (req, res) => { 
    try {
        const { name, email, phone, message } = req.body;
        
        console.log('Received form data:', { name, email, phone, message }); // Debug log

        if (!name || !email || !phone || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

         // Email format validation
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailRegex.test(email)) {
             return res.status(400).json({ message: 'Invalid email format' });
         }
 
         // Phone format validation (basic example - adjust as needed)
         const phoneRegex = /^\+?[\d\s-]{10,}$/;
         if (!phoneRegex.test(phone)) {
             return res.status(400).json({ message: 'Invalid phone format' });
         }
 
         // Sanitize inputs
         const sanitizedData = {
             name: sanitizeHtml(name.trim(), { allowedTags: [], allowedAttributes: {} }),
             email: email.trim().toLowerCase(),
             phone: phone.trim(),
             message: sanitizeHtml(message.trim(), { allowedTags: [], allowedAttributes: {} })
         };

        // Email content
        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.RECIPIENT_EMAIL, // Add this to your .env file
            subject: 'New Contact Form Submission - Dadhich Events',
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong> ${message}</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully'); // Debug log

        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Server error:', error); // Debug log
        res.status(500).json({ message: 'Error sending message.', error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



app.get('/test-email', async (req, res) => {
    try {
        await transporter.verify();
        res.send('Email configuration is correct!');
    } catch (error) {
        res.status(500).send('Email configuration error: ' + error.message);
    }
});