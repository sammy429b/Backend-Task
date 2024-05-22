import { Router} from "express"
import { allTranscation, allTranscationStatistics, dataInitialization } from "../controllers/Transcation.controller.js"

const router = Router()

router.get('/',dataInitialization)
router.get('/transcations', allTranscation)
router.get('/stats', allTranscationStatistics)

export default router 