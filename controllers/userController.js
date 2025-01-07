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
    
            // Get current date and time in Bangladesh Standard Time (BST)
            const now = new Date();
            const options = {
                timeZone: 'Asia/Dhaka',
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            };
            const formattedDateTime = now.toLocaleString('en-US', options);
    
            // Email content for the team
            const subject = `New Lead Notification - [${formattedDateTime}] `;
            const teamBody = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #f90052;">New Lead Received - ${formattedDateTime}</h2>
                    <hr />
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #f90052;">${email}</a></p>
                    <p><strong>Phone:</strong> 
                    <a href="https://wa.me/${phone}" style="color: #f90052;" target="_blank">WhatsApp</a> | 
                    <a href="tel:${phone}" style="color: #f90052;">${phone}</a>
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
            await sendMail('softdev.alamin@gmail.com', subject, teamBody);
    
            // Email content for the user
            const userSubject = 'Thank You for Contacting DevUnicornLabs!';
            const userBody = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #f90052;">Thank You for Contacting Us!</h2>
                    <p>Hi ${name},</p>
                    <p>We’ve received your inquiry and are excited to help you achieve your goals.</p>
                    <p>Here’s what you shared with us:</p>
                    <ul>
                        <li><strong>Name:</strong> ${name}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Phone:</strong> ${phone}</li>
                        <li><strong>Location:</strong> ${location}</li>
                        <li><strong>Business Name:</strong> ${businessName}</li>
                        <li><strong>Team Size:</strong> ${teamSize}</li>
                    </ul>
                    <p>Our team will review your information and get back to you within the next 24 hours.</p>
                    <p>In the meantime, feel free to explore more about our services on our website: <a href="https://www.devunicornlabs.com" style="color: #f90052;">DevUnicornLabs</a>.</p>
                    <p>We look forward to collaborating with you!</p>
                    <p>Best regards,</p>
                    <p><strong>DevUnicornLabs Team</strong></p>
                    <p>Email: <a href="mailto:support@devunicornlabs.com" style="color: #f90052;">support@devunicornlabs.com</a></p>
                    <p>Phone: <a href="tel:+8801614643814" style="color: #f90052;">+88 01614643814</a></p>
                </div>
            `;
    
            // Send confirmation email to the user
            await sendMail(email, userSubject, userBody);
    
            // Send response to the client
            res.status(201).json({ message: 'Lead created and emails sent successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating lead', error: error.message });
        }
    },
    

    getAllLeads: async (req, res) => {
        try {
            const secCode = req.body.code
            if (secCode == 6894) {
                // Fetch all leads from the database
                const leads = await Lead.find().sort({ createdAt: -1 }); // Sort by newest first

                // Check if no leads exist
                if (!leads.length) {
                    return res.status(404).json({ message: 'No leads found' });
                }

                // Respond with the list of leads
                res.status(200).json(leads);
            } else {
                return res.json({ message: 'validatoin failed' })
            }
        } catch (error) {
            // Handle errors
            console.error('Error fetching leads:', error);
            res.status(500).json({
                message: 'An error occurred while fetching leads',
                error: error.message,
            });
        }
    },
};
