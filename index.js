const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/send-email', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'send-email.html'));
});


app.post('/send-email', (req, res) => {
    const { fromName, fromEmail, host, port, username, password, to, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
        host,
        port,
        auth: {
            user: username,
            pass: password,
        },
    });

    const mailOptions = {
        from: `"${fromName}" <${fromEmail}>`,
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.redirect('/success');
    });
});


app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'success.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
