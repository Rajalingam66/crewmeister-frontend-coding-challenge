import { getAbsenceInfo } from "../models/absenceModel.js"


export const getAbsenceDetails = async(req, res) => {
    try{
    //     const pageSize = 10;
    //     const absenceRequest = {
    //     offset : (req.params.page - 1) * pageSize || 0,
    //     limit : req.params.page * pageSize,
    //     startDate : req.query.startDate,
    //     endDate : req.query.endDate,
    //     status : req.query.status,
    //     type : req.query.type,
    // }
    const data = await getAbsenceInfo();

    // const data = await getAbsenceInfo(absenceRequest);
    res.status(200).send(data);
    
    }
 catch (err) {
   console.log("error",err);
    res.status(500).send({errors: err});
}
}