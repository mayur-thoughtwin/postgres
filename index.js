// const express = require("express");
// var cors = require('cors');
// const { router } = require("./routes/router");

// require("dotenv").config();
// const app = express();

// app.use(cors())

// app.use(express.json()); 
// app.use("/", router);



// app.listen(3001, ()=>{
//     console.log(`Server started on port:3001`)
// });
const express = require("express");
var cors = require('cors');
const { router } = require("./routes/router");
const { pool } = require('./connection/db'); 

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to the database at:', res.rows[0].now);
    }
});

app.listen(3001, () => {
    console.log(`Server started on port: 3001`);
});
