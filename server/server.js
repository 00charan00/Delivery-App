const express = require("express");
// const bodyParser = require('body-parser');
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.use(express.json());
app.use(cors());



const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1030",
    database: "deliveryapp"
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the database');
});


app.use(bodyParser.json());

//register

app.post('/register',(req,res)=>{
    console.log(req.body);
    const sql="INSERT INTO registertable(`name`,`email`,`password`,`role`) VALUES (?)";
    const values=[
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.role,
    ]
    db.query(sql,[values],(err,data)=>{
        if(err){
            return res.json("ERROR");
        }
        return res.json(data);
    })

})

//login

app.post('/login',(req,res)=>{
    const sql="SELECT * FROM registertable WHERE `email` = ? AND `password` = ?";
    db.query(sql,[req.body.email,req.body.password],(err,data)=>{
        let role=req.body.role;
        if(err){
            return res.json("ERROR");
        }
        if(role==="deliveryagent"){
            return res.json("DELIVERY AGENT");
        }
        if(role==="inventoryagent"){
            return res.json("INVENTORY AGENT");
        }
        if(role==="normaluser"){
            return res.json("USER LOGIN");
        }
        else{
            return res.json("login Failure");
        }
    })
})

//inventory get

app.get('/inventory', (req, res) => {
    const sql = "SELECT * FROM inventory";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching inventory data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(data);
    });
});

//inventory add

app.post('/inventoryadd',(req,res)=>{
    console.log(req.body.data);
    const sql="INSERT INTO inventory(`p_name`,`count`,`p_category`,`expiry`,`check_in`) VALUES (?)";
    const values=[
        req.body.p_name,
        req.body.count,
        req.body.p_category,
        req.body.expiry,
        req.body.check_in,
    ]
    db.query(sql,[values],(err,data)=>{
        if(err){
            return res.json("ERROR IN INVENTORYDB");
        }
        return res.json(data);
    })
})




















// app.post('/purchase', (req, res) => {
//     const { p_name } = req.body;
//
//     // Decrease the count of the product in the inventory table by one
//     const decreaseCountQuery = 'UPDATE inventory SET count = count - 1 WHERE p_name = ? AND count > 0';
//
//     db.query(decreaseCountQuery, [p_name], (error, results) => {
//         if (error) {
//             console.error('Error decreasing product count:', error);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//
//         // Check if the product was found and its count was successfully decreased
//         if (results.affectedRows === 0) {
//             return res.status(404).json({ error: 'Product not found or out of stock' });
//         }
//
//         // If the count was successfully decreased, proceed to insert into orders table
//         const insertOrderQuery = 'INSERT INTO orders (p_name, p_category, expiry) VALUES (?, ?, ?)';
//         const { p_category, expiry } = req.body;
//         db.query(insertOrderQuery, [p_name, p_category, expiry], (error, results) => {
//             if (error) {
//                 console.error('Error inserting into orders table:', error);
//                 return res.status(500).json({ error: 'Internal Server Error' });
//             }
//
//             // Respond with success
//             res.json({ message: 'Booking successful' });
//         });
//     });
// });






app.post('/book', (req, res) => {
    const { name, address, count, p_name, p_category, expiry } = req.body;
    const sql = "INSERT INTO orders (name, address, p_name, p_category, expiry, count) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [name, address, p_name, p_category, expiry, count];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error booking product:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Product booked successfully!' });
    });
});



app.get('/orders', (req, res) => {
    const sql = "SELECT * FROM orders";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching orders:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(data);
    });
});












app.get('/',(req,res)=>{
    //function to check if backend is running in browser
    res.json("Hii charan");
})
app.listen(8080, () => {
    console.log("Listening in 8080");
});

