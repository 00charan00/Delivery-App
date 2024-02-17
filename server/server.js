const express = require("express");
// const bodyParser = require('body-parser');
const mysql = require("mysql");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1030",
    database: "deliveryapp"
});

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

//inventory delete by inventory manager

app.delete('/inventorydelete', (req, res) => {
    const sql = "DELETE FROM inventory WHERE p_id=?";
    const values = [
        req.body.p_id,
    ];
    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json("ERROR IN INVENTORYDB");
        }
        return res.json(data);
    });
});

//inventory delete by delivery agent

app.delete('/deliverydelete', (req, res) => {
    const sql = "DELETE FROM inventory WHERE p_id=?";
    const values = [
        req.body.p_id,
    ];
    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json("ERROR IN INVENTORYDB");
        }
        return res.json(data);
    });
});






app.get('/',(req,res)=>{
    //function to check if backend is running in browser
    res.json("Hii charan");
})
app.listen(8080, () => {
    console.log("listening in 8080");
});