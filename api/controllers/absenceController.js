import { getAbsenceInfo } from "../models/absenceModel.js";

export const getAbsenceDetails = async (req, res) => {
  try {
    const data = await getAbsenceInfo();
    res.status(200).send(data);
  } catch (err) {
    console.log("error", err);
    res.status(500).send({ errors: err });
  }
};
