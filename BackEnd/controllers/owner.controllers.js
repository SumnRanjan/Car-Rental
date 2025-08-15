import e from "express";
import User from "../models/user.models.js";


//Api to change role of user
export const changeRoleToOwner = async(req , res) =>{
    try {
        const {_id} = req.user;

        const updatedUser = await User.findByIdAndUpdate(_id , {role : "owner"} , {new : true}).select("-password")

        if(!updatedUser){
            return res.status(404).json({success: false, message: "User not found"})
        }

        return res.status(200).json({success : true , message: "Now you can list the car"})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success : true , message: error.message})
    }
}

// api to list car

export const addCar = async(req , res) =>{
    try {

        const{_id } = req.user
        let car = JSON.parse(req.body.carData)
        const imageFile = req.file;
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success : true , message: error.message})
    }
}