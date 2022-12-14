import express from 'express';
import { getAbsenceDetails } from '../controllers/absenceController.js';

const router = express.Router();
router.get('/get-absence-details/', getAbsenceDetails);
// router.get('/get-absence-details/:page', getAbsenceDetails);

export default router;