    const express = require('express');
    const app = express();
    const router = express.Router();
    const Notification = require('./models/Notification'); // Assuming you have a Notification model
    const schedule = require('node-schedule');
    const mongoose = require("mongoose");
    const bodyParser = require('body-parser');
    const documentsRoutes = require('./routes/document');
    const formRoutes = require('./routes/formRoutes');
    const routes = require('./routes/api');
    const userRoutes = require('./routes/users');
    const messageRoutes = require('./routes/messageRoutes');
    const driverRoutes = require('./routes/driverRoutes');
    // const carRequestRoutes = require('./routes/requestCab');
    const carRequestRoutes = require('./routes/carRequestRoutes');
    const notificationRoutes = require('./routes/notificationRoutes');

    const cors = require("cors");
    const { sendOtpToPhoneNumber, verifyOtpForPhoneNumber } = require('./otpService');

  
    
    const { z } = require('zod');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use('/api/documents', documentsRoutes);
    const bcrypt=require("bcryptjs");
    const jwt = require("jsonwebtoken");
    const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    const JWT_SECRET ="sdhgfhsdfgsdkfsdkjfhsdjfhs976758576djfhsdjkfsdkfsdfgsdhfgsdfgsdf7685<>?:khdfsdfsdfsd";

    const mongoUrl = 
    "mongodb+srv://sohammamdyal:DeSSjwDBJPydEl1B@cluster0.imln2rk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("connected database");
    })
    .catch((e) => console.log(e));

    let clients = [];

// SSE endpoint
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.flushHeaders(); // send headers to establish SSE with client

  clients.push(res);

  req.on('close', () => {
    clients = clients.filter(client => client !== res);
  });
});

// Function to send events to all clients
const sendEventToAll = (event) => {
  clients.forEach(client => {
    client.write(`data: ${JSON.stringify(event)}\n\n`);
  });
};

  

    app.use('/api/form', formRoutes);

    
app.use('/api/users', userRoutes);
app.use('/api', routes);
app.use('/api', messageRoutes);
app.use('/api', driverRoutes);
// app.use('/api', carRequestRoutes);
app.use(bodyParser.json());
app.use('/api', carRequestRoutes);
app.use('/api', notificationRoutes);

    // notification start

    // let notifications = []; // Store scheduled notifications and their details

    // Route to schedule a notification
    // router.post('/', async (req, res) => {
    //   const { carRequestId, message, date, time } = req.body;
    //   const scheduledTime = new Date(`${date}T${time}:00`);
    
      // try {
      //   // Save notification to database
      //   const notification = new Notification({
      //     carRequestId,
      //     message,
      //     timestamp: scheduledTime,
      //   });
      //   await notification.save();
    
        // Schedule a job to send the notification
    //     schedule.scheduleJob(scheduledTime, async () => {
    //       // Implement your logic to send the notification (e.g., email or push notification)
    //       console.log('Sending notification:', message);
    //       // You might also want to update the notification status in the database here
    //     });
    
    //     res.status(200).json({ success: true });
    //   } catch (error) {
    //     console.error('Error scheduling notification:', error);
    //     res.status(500).json({ error: 'Failed to schedule notification' });
    //   }
    // });
    
    // Route to get notifications
    // app.get('/api/notifications', (req, res) => {
    //   res.status(200).json(notifications);
    // });
    // notification end

      app.post('/send-otp', async (req, res) => {
        const { phoneNumber } = req.body;
        try {
          const otp = await sendOtpToPhoneNumber(phoneNumber);
          res.json({ status: 'ok', otp }); // For demonstration, include OTP in response (not for production)
        } catch (err) {
          res.json({ status: 'error', message: err.message });
        }
      });
      
      app.post('/verify-otp', async (req, res) => {
        const { phoneNumber, otp } = req.body;
        try {
          const isValid = await verifyOtpForPhoneNumber(phoneNumber, otp);
          if (isValid) {
            res.json({ status: 'ok', data: 'userToken' }); // Replace 'userToken' with actual token
          } else {
            res.json({ status: 'error', message: 'Invalid OTP' });
          }
        } catch (err) {
          res.json({ status: 'error', message: err.message });
        }
      });


    require("./user");
    const User= mongoose.model("UserInfo");
    app.post("/register", async(req,res)=> {

        const {name, email,password} =req.body;
        const encryptedPassword=await bcrypt.hash(password, 10);
        try{
            const oldUser =await User.findOne({email});
            if(oldUser){
                return res.send({error: "User exists"});
            }
            await User.create({
                name,
                email,
                password:encryptedPassword,
            });
            res.send({status:"ok"});
        }catch(error){
            res.send({status:"error"});
        }

    });

    app.post("/login-user", async(req,res)=>{
        const { email,password} =req.body;
        const user =await User.findOne({email});

        if(!user){
            return res.send({error: "User Not found"});
    }
    if(await bcrypt.compare(password,user.password)){
        const token=jwt.sign({email:user.email},JWT_SECRET);

        if(res.status(201)){
            return res.json({status:"ok", data:token});
        }else{
            return res.json({status:"error"});
        }
    }
    res.json({status:"error", error:"invaild password"});
    });
    app.post('/api/users/add-user', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password }); 
    await user.save();
    res.status(201).json({ message: 'User added successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding user' });
  }
});

    app.post("/userData",async(req,res)=> {
        const token = req.body.token;
        try{
            const user=jwt.verify(token,JWT_SECRET);
            const useremail=user.email;
            User.findOne({email: useremail}).then((data)=>{
                res.send({status:"ok",data:data});
            }).catch((error)=>{
                res.send({status:"error", data:data });
            });
        }catch(error){

        }
    });
    app.post("/driverData",async(req,res)=> {
        const token = req.body.token;
        try{
            const user=jwt.verify(token,JWT_SECRET);
            const useremail=user.email;
            User.findOne({email: useremail}).then((data)=>{
                res.send({status:"ok",data:data});
            }).catch((error)=>{
                res.send({status:"error", data:data });
            });
        }catch(error){

        }
    });
   

    

      app.delete("/drivers/:id", async (req, res) => {
        const { id } = req.params;
      
        try {
          const deletedDriver = await Driver.findByIdAndDelete(id);
          if (!deletedDriver) {
            return res.status(404).send({ status: "error", error: "Driver not found" });
          }
          res.send({ status: "ok" });
        } catch (error) {
          res.status(500).send({ status: "error", error: error.message });
        }
      });

    //   require("./message");
    // const Message= mongoose.model("messageInfo");

    //   app.post('/api/contact', (req, res) => {
    //     const { email, message } = req.body;
    //     const newMessage = new Message({ email, message });
    //     newMessage.save((err, message) => {
    //       if (err) {
    //         res.status(500).send({ message: 'Error sending message' });
    //       } else {
    //         res.send({ message: 'Message sent successfully!' });
    //       }
    //     });
    //   });
      
      


//   driver-detail fetch on admindashboard
let selectedCarData = [];

app.post('/selectCar', (req, res) => {
  const carData = req.body;
  selectedCarData.push(carData);
  res.status(200).send('Car data received');
});

app.get('/getSelectedCars', (req, res) => {
  res.status(200).json(selectedCarData);
});


    app.post("/login-driver", async(req,res)=>{
        const { email,password} =req.body;
        const driver =await Driver.findOne({email});

        if(!driver){
            return res.send({error: "User Not found"});
    }
    if(await bcrypt.compare(password,driver.password)){
        const token=jwt.sign({email:driver.email},JWT_SECRET);

        if(res.status(201)){
            return res.json({status:"ok", data:token});
        }else{
            return res.json({status:"error"});
        }
    }
    res.json({status:"error", error:"invaild password"});
    });
    
    app.post('/driver-register', (req, res) => {
      const { name, email, password, carmodel, phone, platenumber, experience } = req.body;
      // Implement your registration logic here
      // For example, save the data to your database
    
      // Simulate success or error response
      if (email === "test@example.com") { // Example condition for failure
        res.status(400).json({ error: 'Email already in use' });
      } else {
        res.status(200).json({ message: 'Registration successful' });
      }
    });

    app.post('/send-to-admin', (req, res) => {
        // Assuming req.body contains the data sent from frontend
        const { name, email, carmodel, phone, platenumber, experience } = req.body;
      
        // Process the data (e.g., save to database, send notification to admin)
        console.log('Received data from frontend:', req.body);
      
        // Example response
        res.status(200).json({ message: 'Data received successfully' });
      });

      const bookedRides = [];

// Endpoint to handle ride booking
app.post('/book-ride', (req, res) => {
    try {
        const newRide = req.body;

        // Validate newRide data
        if (!newRide.pickupLocation || !newRide.destinationLocation || !newRide.customerName || !newRide.customerPhone || !newRide.dateTime) {
            throw new Error('Invalid ride data. Missing required fields.');
        }

        // Push new ride to bookedRides array
        bookedRides.push(newRide);

        // Send response
        res.status(201).json({ message: 'Ride booked successfully' });
    } catch (error) {
        console.error('Error booking ride:', error);
        res.status(500).json({ error: 'Failed to book ride' });
    }
});

// Example endpoint to fetch all booked rides
app.get('/booked-rides', (req, res) => {
    res.status(200).json(bookedRides);
});

      
      

    app.post('/create-driverrole-entry', async (req, res) => {
        const { driverName, carRegistrationNumber, cabModel, /* other fields */ } = req.body;
    
        try {
        const driverRole = await User.create({
            driverName,
            carRegistrationNumber,
            cabModel,
            // Add other relevant fields as needed
        });
    
        res.status(201).send(`Driver role entry created successfully!`);
        } catch (error) {
        console.error('Error creating driver role entry:', error);
        res.status(500).send('Error creating driver role entry');
        }
    });

    let rideRequests = [];

// Create a new ride request
app.post('/api/ride-requests', (req, res) => {
  const newRequest = req.body;
  rideRequests.push(newRequest);
  res.status(201).json(newRequest);
});

// Retrieve all ride requests
app.get('/ride-requests', (req, res) => {
  res.json(rideRequests);
});

// Retrieve a specific ride request
app.get('/ride-requests/:id', (req, res) => {
  const request = rideRequests.find(r => r.id === req.params.id);
  if (request) {
    res.json(request);
  } else {
    res.status(404).send('Ride request not found');
  }
});

// Update a specific ride request
app.put('/ride-requests/:id', (req, res) => {
  const index = rideRequests.findIndex(r => r.id === req.params.id);
  if (index !== -1) {
    rideRequests[index] = req.body;
    res.json(rideRequests[index]);
  } else {
    res.status(404).send('Ride request not found');
  }
  
});

// Delete a specific ride request
app.delete('/ride-requests/:id', (req, res) => {
  const index = rideRequests.findIndex(r => r.id === req.params.id);
  if (index !== -1) {
    rideRequests.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Ride request not found');
  }
});
// Backend (Node.js with Express)
app.put('/ride-requests/:id', (req, res) => {
    const index = rideRequests.findIndex(r => r.id === req.params.id);
    if (index !== -1) {
      rideRequests[index] = { ...rideRequests[index], ...req.body };
      res.json(rideRequests[index]);
    } else {
      res.status(404).send('Ride request not found');
    }
  });

//   server



app.post('/api/create-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});
  





    app.listen(5000, ()=> {
        console.log("server started");
    })

    module.exports = { sendEventToAll };



