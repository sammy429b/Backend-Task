import { Router} from "express"
import { allTranscation, allTranscationStatistics, dataInitialization, pieChartData } from "../controllers/Transcation.controller.js"

const router = Router()

router.get('/',dataInitialization)
router.get('/transcations', allTranscation)
router.get('/stats', allTranscationStatistics)
router.get('/piechart', pieChartData)

export default router 