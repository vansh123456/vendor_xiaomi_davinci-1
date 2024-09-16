const express = require('express');
const app = express();
const cors= require('cors');
const axios = require('axios')
const fetchUrl = "https://api.wazirx.com/api/v2/tickers";
const { db, hodlinfo } = require("../backend/db");
const { default: mongoose } = require("mongoose");

//use to connect frontend
// app.use(cors(
//     {
//     origin: [""],
//     methods: ["POST","GET"],
//     credentials:true
//     })
// )

app.use(express.json());
app.use(cors());


const fetchdata = async () => {
    try{
        const response = axios.get(fetchUrl)
        const tickers = Object.values(response.data).slice(0, 10);
        console.log(tickers)
        await hodlinfo.deleteMany({});

        for (const ticker of tickers) {
            const { name, last, buy, sell, volume, base_unit } = ticker;
            const newTicker = new hodlinfo({
                name,
                last,
                buy,
                sell,
                volume,
                base_unit
            });
            await newTicker.save();
        }
        console.log("ticker stored successfully");


    }
    catch(err) {
        console.log(err);
    }
}  
fetchdata();

app.get("/api/v1/display", async(req,res) => {
    try {
        const values =  await hodlinfo.find();
        res.status(200).send('ok')
        res.json(values);
        console.log(values);
    
    }
    catch(err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
})


app.listen(3001,function() {
    console.log("backend server started success on 3000")
})