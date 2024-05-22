import { Router} from "express"
import { dataInitialization } from "../controllers/Transcation.controller.js"

const router = Router()

router.get('/',dataInitialization)

export default router 