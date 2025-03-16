const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/add', (req, res)=>{
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    const sum = num1 + num2;

    res.send(`The sum of ${num1} and ${num2} is ${sum}.`);
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})