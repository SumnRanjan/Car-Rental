import User from "../models/user.models.js";
import fs from "fs";
import imagekit from "../configs/imagekit.js";
import Car from "../models/car.models.js";

//Api to change role of user
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { role: "owner" },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Now you can list the car" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// api to list car
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;

    //upload Image to ImageKit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    //optimise through image
    var optimizeImage = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "1200" }, // width resizing
        { quality: "auto" }, // auto compression
        { format: "webp" }, // convert to modern format
      ],
    });

    const image = optimizeImage;
    const newCar = await Car.create({ ...car, owner: _id, image });
    return res
      .status(201)
      .json({ success: true, message: "Car listed successfully", car: newCar });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// list of all owner car
export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    if (!cars || cars.length === 0) {
      return res
        .status(200)
        .json({
          success: true,
          message: "No cars found for this owner",
          cars: [],
        });
    }
    return res.status(200).json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//api to toggle car availability
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    if (car.owner.toString() !== _id.toString()) {
      return res.status(403).json({ success: false, message: "You are not authorized to modify this car"});
    }

    car.isAvaliable = !car.isAvaliable;
    await car.save()

    return res.status(200).json({ success: true, message: `Car availability updated to ${car.isAvaliable}` });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//api to delete a car
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    if (car.owner.toString() !== _id.toString()) {
      return res.status(403).json({ success: false, message: "You are not authorized to modify this car"});
    }

    car.owner = null;
    car.isAvaliable = false
    await car.save()

    return res.status(200).json({ success: true, message: `Car Removed` });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//api to get dashboard data
export const getdashboardData = async (req, res) => {
    try {
        const {_id , role} = req.user

        if(role != 'owner'){
            return res.status(403).json({success: false,message: "Access denied. Only owners can view dashboard data."});
        }

        const car = await Car.find({owner : _id})

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}