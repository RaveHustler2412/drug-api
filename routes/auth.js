const router = require("express").Router();
const User = require("../model/User");

const cors = require("cors");
const Product = require("../model/Product");
const Tracker=require("../model/Tracker");
const nodemailer = require("nodemailer");
const Doctor = require("../model/Doctor");
const Patient = require("../model/Patient");




router.post("/login", cors(),async (req, res, next) => {
  console.log(req.body);
  res.header("Access-Control-Allow-Origin", "*");

  const loginData = await User.find({login_id: req.body.login_id});
    console.log(loginData)

  if(loginData.length ==0){
      res.send("user not found");
  }
    else{
        if(loginData[0].password == req.body.password){
            return res.send("login success");
        }
        return res.send("password incorrect");
    
    }
});

router.post("/doctorlogin", cors(),async (req, res, next) => {
    console.log(req.body);
    const l=new Doctor({

        doctor_id:req.body.doctor_id,
        password:req.body.password,
        private_key:"holly"
    })
        l.save();
    res.header("Access-Control-Allow-Origin", "*");
  
    const loginData = await Doctor.find({doctor_id: req.body.doctor_id});
      console.log(loginData)
  
    if(loginData.length ==0){
        res.send("user not found");
    }
      else{
          if(loginData[0].password == req.body.password){

              return res.status(200).json({"private_key":loginData[0].private_key});
          }
          return res.status(404).send("password incorrect");
      
      }
  });

router.post("/productCheck", cors(),async (req, res, next) => {

    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");


    //todo aes decrypt and get pID and check if it is valid
  
    const productData = await Product.find({product_id: req.body.rawData});
      console.log(productData)
  
    if(productData.length ==0){
        const tracker=new Tracker({
            org_code:req.body.org,
            emp_code:req.body.emp,
            rawData:req.body.rawData,
            status_code:"0"
            
      })
      tracker.save();
       return res.send("Product not found");
    }
      else{
          if(productData[0].aes == req.body.rawData ){
              const tracker=new Tracker({
                    org_code:req.body.org,
                    emp_code:req.body.emp,
                    rawData:req.body.rawData,
                    status_code:"1"

              })
              tracker.save()

              return res.status(200).send("Product found");
          }

          const tracker=new Tracker({
            org_code:req.body.org,
            emp_code:req.body.emp,
            rawData:req.body.rawData,
            status_code:"0"
            
      })
      tracker.save();
         
          return res.status(404).send("Product not found");
      
      }
  });
  let transporter = nodemailer.createTransport({
    host: "clgproject168@gmail.com",
    port: 465,
    secure: true,
    service: "Gmail",
  
    auth: {
      user: "clgproject168@gmail.com",
      pass: "ravehustler2412",
    },
  });
  
  function generateOtp() {
    var otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
  }


  router.post("/otp", cors(),async (req, res, next) => {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");

    var mailOptions = {
        to: req.body.email,
        subject: "Patient otp",
        html:
          "<h1>otp</h1>" +
          "<h3 style='font-weight:bold;'>" +
          generateOtp() +
          "</h3>", // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
        res.render("token");
      });

  })

  router.post("/savepatient", cors(),async (req, res, next) => {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");

    const patient=new Patient({
        patient_name:req.body.patient_name,
        patient_id:req.body.patient_id,
        Medicine:req.body.Medicine,
        Dosage:req.body.Dosage,
        email:req.body.email,
        otp:req.body.otp,
        private_key:req.body.private_key,
        doctor_id:req.body.doctor_id
    })
    patient.save();
    res.status(200).send("patient saved");
  })

router.post("/add", cors(),async (req, res, next) => {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    
    const newProduct = new Product({
        product_id: "1010",

    })
    newProduct.save()
    res.send("done")
})
router.post("/getpatient", cors(),async (req, res, next) => {
  console.log(req.body);
  res.header("Access-Control-Allow-Origin", "*");
  
  const patient=await Patient.find({ patient_id: req.body.patient_id});
res.send(patient);
})


module.exports = router;
