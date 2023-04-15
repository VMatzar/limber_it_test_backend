const express = require('express');
const cors = require('cors');
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.options('*', cors())
//Router:
app.use(require('./routes/index'));

const PORT = process.env.PORT || 4000;


app.listen(PORT, err => {
    if(err) throw err;
    console.log('Server on port 4000');
});