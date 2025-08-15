import express from "express"
import { verifyJWT } from "../middleware/auth.js"
import { changeRoleToOwner } from "../controllers/owner.controllers.js"

const ownerRouter = express.Router()

ownerRouter.post("/change-role" , verifyJWT , changeRoleToOwner)

export default ownerRouter