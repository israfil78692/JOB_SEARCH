import { User } from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getDataUri from '../utils/dataUri.js'
import cloudinary from '../utils/cloudnary.js'
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body
        console.log(fullname, email, phoneNumber, password, role);
        
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Something is Missing"
            })
        }
        const file=req.file
        const fileUri=getDataUri(file)
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content)
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: 'User already axist with this email',
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        })
        return res.status(201).json({
            message: "Account Created Successfully",
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body
        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Something is Missing"
            })
        }

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: 'Incorrect email or password',
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: 'Incorrect email or password',
                success: false
            })
        }
        //check role is correct
        if (role !== user.role) {
            return res.status(400).json({
                message: 'Account does not exist with current role',
                success: false
            })
        }
        const tokenData = { userId: user._id }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber:user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsonly: true, sameSite: 'strict' }).json({
            message: `welcome back ${user.fullname}`,
            user,
            success: true
        })

    } catch (error) {
        console.log(error);

    }
}



export const logout=async (req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out Succesfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const updateProfile=async (req,res)=>{
    try {
        const {fullname,email,phoneNumber,bio,skills}=req.body
        const file=req.file
        const fileUri=getDataUri(file)
        const cloudResponse= await cloudinary.uploader.upload(fileUri.content)
        //setup file cloudnary

        let skillArray;
        if(skills){
            skillArray=skills.split(",")
        }
        
        const userId=req.id  //middleware
        let user=await User.findById(userId)
       if(!user){
        return res.status(400).json({
            message:"user not found",
            success:false
        })
       }
       if(fullname) user.fullname=fullname
       if(email) user.email=email
       if(phoneNumber) user.phoneNumber=phoneNumber
       if(bio) user.profile.bio=bio
       if(skills)  user.profile.skills=skillArray
       
       if(cloudResponse){
        user.profile.resume=cloudResponse.secure_url
        user.profile.resumeOriginal=file.originalname
       }
       
       
      
       //resume

       await user.save()

       user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        profile: user.profile,
        phoneNumber:user.phoneNumber
    }
    return res.status(200).json({
        message:"profile updated succesfully",
        user,
        success:true,
        
    })


    } catch (error) {
        console.log(error);
        
    }
}