import { Router} from "express"
import { allTranscation, allTranscationStatistics, barChartData, dataInitialization, pieChartData } from "../controllers/Transcation.controller.js"

const router = Router()

router.get('/',dataInitialization)
router.get('/transcations', allTranscation)
router.get('/stats', allTranscationStatistics)
router.get('/piechart', pieChartData)
router.get('/barchart', barChartData)

export default router 