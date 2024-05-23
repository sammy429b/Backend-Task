import { Router } from "express"
import { allTranscation, allTranscationStatistics, barChartData, dataInitialization, pieChartData, oneCallForALL } from "../controllers/Transcation.controller.js"

const router = Router()

router.get('/', dataInitialization)
router.get('/all', oneCallForALL)
router.get('/transcations', allTranscation)
router.get('/stats', allTranscationStatistics)
router.get('/piechart', pieChartData)
router.get('/barchart', barChartData)

export default router 