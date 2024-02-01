const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require('multer')
const fs = require("fs")
const axios = require("axios")

const app = express();
app.use(cors());
app.use(express.json());

const db =  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "complex"
})

// const storage_maker = (folderName)=>(multer.diskStorage({
//     destination: (req, file, callback) => {
//         path = __dirname + `/${folderName}/${req.headers.reg_no}`

//         if(!fs.existsSync(path))
//             fs.promises.mkdir(path)
//             .then(()=>{
//                 console.log("Directory created");
//             })
//             .catch(()=>{
//                 console.log("Directory failed");
//             })

//         callback(null, path)
//     },
//     filename: (req, file, callback) => {
//         callback(null, file.originalname)
//     }
// }))

// const upload_storage = storage_maker("uploads")

// const identity_storage = storage_maker("identity")

app.post('/signup', (req, res) => {
    console.log("Received data from client:", req.body);
    if (req.body.name === undefined || req.body.regNo === undefined)
        return res.status(401).json({status:"missing parameters"});

    const sql = `INSERT INTO student (reg_number, name, email, phone_number) VALUES ('${req.body.regNo}','${req.body.name}','${req.body.email}','${req.body.phoneNo}','${req.body.membership}')`

    db.query(sql,(err, result)=>{
        if(err) return res.status(500).send({status:"server error"});
        return res.status(200).send({status:"success"});
    })

})


app.post("/student_in/:studentRegNo",(req,res)=>{
    const studentRegNo = req.params['studentRegNo']

    const currentDate = new Date()
    const date = currentDate.toLocaleString();

    const sql = `INSERT INTO attendance(reg_number, student_in) values ('${studentRegNo}','${date}')`

    db.query(sql,(err, result)=>{
        if(err) return res.status(401).send({status:"failed"});
        return res.status(200).send({status:"success"});
    })
})


app.post("/student_out/:studentRegNo",(req,res)=>{
    const studentRegNo = req.params['studentRegNo']

    const currentDate = new Date()
})





// const uploads = multer({ storage: upload_storage })

// app.post("/upload_images", uploads.array("images"), (req,res)=>{
//     if (!req.headers.reg_no){
//         return res.status(403).json({error:"missing reg_no header"})
//     }    

//     const formData = new FormData();

//     req.files.forEach((element, index) => {
//         console.log(element);
//         formData.append(index, element );   
//     })

//     // axios.post("http://localhost:5000/register", formData, {headers:{name:req.headers.reg_no}} ).then(res=>{console.log(res.data)}).catch(err=>{console.error(err)})
    
//     return res.json({status:"registration success"})
// })

// app.post('/login', (req, res) => {
//     const sql = "SELECT * FROM login WHERE reg_no = ? AND password = ?";
//     db.query(sql, [req.body.reg_no,  req.body.password], (err, data) => {
//         if(err) {
//             return res.json("Error");
//         }
//         if(data.length > 0) {
//             console.log("success");
//             return res.json("Success");
//         }
//         else {
//             console.log("failed");
//             return res.json("Failed");
//         }
//     })
// })

// const identity = multer({storage:identity_storage})

// app.get("/get-identity", identity.array("image"), (req, res)=>{
//     if (!req.headers.reg_no){
//         return res.status(403).json({error:"missing reg_no header"})
//     }    
//     let identified_reg_no;

//     // console.log(req.files);

//     image = req.files[0]
//     const formData = new FormData();
//     formData.append("image",image)
//     axios.post("http://localhost:5000/mark", formData,{headers:{
//         'Content-Type': 'multipart/form-data',
//          name:req.headers.reg_no
//     }}).then(response=>reg_no=response.data.name).catch(err=>console.log(err))
//     if(identified_reg_no !== req.headers.reg_no){
//         return res.status(401).json({status: "unverified"});
//     }
//     return res.json({status:"verified"});
// })

// app.get('/components/home', (req, res) => {
//     const sql = "SELECT * FROM login";
//     db.query(sql, (err, data) => {
//         if(err)
//             return res.status(500).json({ error: "Error occurred during fetching data from the database" });
        
//         return res.json(data);
//     })
// })





app.listen(8081, () => {
    console.log("listning");
})

// mysql databases => student, admin, logStatus