import {httpService} from '../utils/httpService';
// import axios from "axios";

export const getAbsenceData = () => {
    return httpService.get('http://localhost:5000/api/get-absence-details');
}