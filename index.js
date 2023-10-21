import express from "express";
import mongoose, {Schema,model} from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const PORT = 5000;

//connection

const connectMongoDB = async ()=>{
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    if(conn){
        console.log("MongoDB connected successfully");
    }
}
connectMongoDB();

//schema
const studentSchema = new Schema({
    name:String,
    mobile:String,
    age:Number,
    email:String
})
//model
const Student = model('Student',studentSchema);

app.get('/students', async(req, res)=>{
    const students = await Student.find();
    res.json({
        success:true,
        data: students,
        message:"sucessfully fetched all studnets"
    })
})

app.post('/student',(req,res)=>{
    const { name, email, mobile, age } = req.body;

    if (!name) {
        return res.json({
            success: false,
            message: 'name is required',
        })
    }
    if (!age) {
        return res.json({
            success: false,
            message: 'age is required',
        })
    }
    if (!mobile) {
        return res.json({
            success: false,
            message: 'mobile is required',
        })
    }
    if (!email) {
        return res.json({
            success: false,
            message: 'email is required',
        })
    }
    const student = new Student({
        name:name,
        mobile:mobile,
        age:age,
        email:email
    })
    res.json({
        success:true,
        data:student,
        message:"students fetch successfully"
    })


})

app.get('/student',async(req,res)=>{
    const {email} = req.query;

    const student = await Student.findOne({
        email:email
    })

    res.json({
        success:true,
        data: student,
        message:"successfully fetch student",
    })

})

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})
