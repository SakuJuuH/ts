import patients from "../data/patients";
import { Patient } from "../types";

const getAllPatients = (): Patient[] => {
    return patients;
};

export default {
    getAllPatients
};
