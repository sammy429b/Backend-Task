import { Router} from "express"
import { allTranscation, dataInitialization } from "../controllers/Transcation.controller.js"

const router = Router()

router.get('/',dataInitialization)
router.get('/transcations', allTranscation)

export default router 