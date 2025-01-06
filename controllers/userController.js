const Lead = require('../models/leadModel');
const sendMail = require('../util/services');

module.exports = {
    createLead: async (req, res) => {
        try {
            const { name, email, phone, location, businessName, teamSize } = req.body;

            // Validate required fields
            if (!name || !email || !phone || !location || !businessName || !teamSize) {
                return res.status(400).json({ message: 'All fields are required.' });
            }

            // Save lead to MongoDB
            const newLead = new Lead({
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim(),
                location: location.trim(),
                businessName: businessName.trim(),
                teamSize,
            });

            await newLead.save();

            // Prepare email content with clickable links
            const subject = 'New Lead Notification';

            // Get current date and time
            const now = new Date();
            const formattedDate = now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            const formattedTime = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            });

            const body = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #4CAF50;">New Lead Received</h2>
                    <p><strong>Date:</strong> ${formattedDate}</p>
                    <p><strong>Time:</strong> ${formattedTime}</p>
                    <hr />
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #4CAF50;">${email}</a></p>
                    <p><strong>Phone:</strong> 
                    <a href="https://wa.me/${phone}" style="color: #4CAF50;" target="_blank">WhatsApp</a> | 
                    <a href="tel:${phone}" style="color: #4CAF50;">${phone}</a>
                    </p>
                    <p><strong>Location:</strong> ${location}</p>
                    <p><strong>Business Name:</strong> ${businessName}</p>
                    <p><strong>Team Size:</strong> ${teamSize}</p>
                    <hr style="margin: 20px 0;" />
                    <p>Please contact the lead as soon as possible.</p>
                    <p>Best regards,</p>
                    <p><strong>DevUnicornLabs Inc.</strong></p>
                </div>
            `;


            // Send email to the team
            await sendMail('softdev.alamin@gmail.com', subject, body);

            // Send response to the client
            res.status(201).json({ message: 'Lead created and notification sent successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating lead', error: error.message });
        }
    },
};
