const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")


// Connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

const port = 8000;

// Define Mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded({ extended: true })); // For parsing form data

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('index.pug', params);
});

app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
});

// app.post('/contact', (req, res) => {
//   const myData = new Contact(req.body);
//   myData.save()
//     .then(() => {
//       res.send("Data saved successfully!");
//     })
//     .catch(() => {
//       res.status(400).send("Unable to save data...");
//     });
// });
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch((err) => {
        console.log(err);
        res.status(400).send("Item was not saved to the database. Check the server logs for more details.")
    });
});

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
