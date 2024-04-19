const express     = require ('express');
const bodyParser  = require('body-parser');
const bcrypt      = require('bcryptjs');
const jwt         = require('jsonwebtoken');
const mongoose    = require('mongoose');

const User        = require('./models/userSchema');
const Task        = require('./models/taskSchema');

const signUp      = require('./routes/singUp');
const login       = require('./routes/login');
const tasks       = require('./routes/tasks')

const app         = express();
const port        = process.env.PORT || 4000;

mongoose.connect('mongodb+srv://sochimahenri:tasks@tasks.uzntxju.mongodb.net/',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', ()=>{
    console.log('Connected to MongoDB')
});
db.on('error', err =>{
    console.error('MongoDB connection error:', err)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use('/signup', signUp)
app.use('/login', login)
app.use('/task', tasks)


app.get('/', (req, res)=>{
    res.status(200).json({message:'running'})
});

app.listen(port, ()=>console.log(`speak Lord! your servant is listening on port ${port}`))