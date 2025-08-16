import express from "express"
import { verifyJWT } from "../middleware/auth.js"
import { addCar, changeRoleToOwner } from "../controllers/owner.controllers.js"
import upload from "../middleware/multer.js"

const ownerRouter = express.Router()

ownerRouter.post("/change-role" , verifyJWT , changeRoleToOwner)
ownerRouter.post("/add-car" , upload.single("image"), verifyJWT ,addCar)

export default ownerRouter