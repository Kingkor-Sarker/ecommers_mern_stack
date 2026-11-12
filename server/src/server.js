const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev')); 

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

app.get('/test', (req, res) =>{
    res.json({
        message: "Test endpoint working fine!"
    })
})


