const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5500;


app.use(cors());

const TodoItemRoute = require('./routes/todoItems');
const SignUp = require('./routes/userSignUp')
const Login = require('./routes/userLogin')

mongoose.connect('mongodb+srv://mohammad:Faizal123@cluster0.8e67bde.mongodb.net/?retryWrites=true&w=majority')
.then(()=> console.log("Database connected"))
.catch(err => console.log(err))


app.use('/', TodoItemRoute);
app.use('/', SignUp);
app.use('/',Login)


app.listen(PORT, ()=> console.log("Server connected") );
