const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/getStudents",async (req,res)=>{

  let studentsData = await Student.find();

  res.json(studentsData);

});

app.listen(4567,()=>{
    console.log("Listening to port 4567");
});


let studentSchema = new mongoose.Schema({
    name:String,
    age:{
        type:Number,
        min:[19,"Too young to create account."],
        max:[85,"Too old to create account."],
        required: [true,"Age is mandatory."],
    },
    gender: {
        type:String,
        enum:["male","female"],
        lowercase:true,
        required:true,
    },
    email: {
        type: String,
        validate: {
          validator: function(v) {
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
          },
          message: props => `${props.value} is not a valid email!`,
        },
        required: [true, "email id is required"],
      },
    mobileNo: {
        type: String,
        validate: {
          validator: function(v) {
            return  /^(?:\+91|91)?[6-9]\d{9}$/.test(v);
          },
          message: props => `${props.value} is not a valid indian mobile number!`,
        },
        required: [true, "mobile number is required"],
      },
});

let Student =  mongoose.model("student",studentSchema,"Batch2408Student");

let insertDataIntoDB = async ()=>{

    try{
        let sangeetha = new Student({
            name:"sangeetha",
            age:30,
            gender:"Female",
            email:"sangeetha@gmail.com",
            mobileNo:"9899908932",
        });
    
       

       let ankush = new Student({
        name:"ankush",
        age:25,
        gender:"Male",
        email:"ankush7@gmail.com",
        mobileNo:"9868564467",
       });

       Student.insertMany([sangeetha,ankush]);

       console.log("data saved to database successfully");

    
    }catch(err){
       console.log(err);
       console.log("data not saved to database");
    }
   
    };

let connectToMDB = async ()=>{

    try{
        mongoose.connect("mongodb+srv://santhoshikumari:santhoshikumari@bath2408cluster.vp7w6.mongodb.net/BRNDB?retryWrites=true&w=majority&appName=Bath2408Cluster");

        console.log("Connected to MDB Successfully.");
         getDataFromDB();
    }catch(err){
        console.log(err)
        console.log("Unale to connect to MDB");
    }
};

let getDataFromDB = async ()=>{

   let retrievedData = await Student.find();


   console.log(retrievedData);
};

connectToMDB();