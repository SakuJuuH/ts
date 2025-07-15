import patients from "../data/patients";
import { Patient, NewPatient } from "../types";
import { v7 as uuidv7 } from "uuid";

const getAllPatients = (): Patient[] => {
    return patients;
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuidv7(),
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getAllPatients,
    addPatient
};
