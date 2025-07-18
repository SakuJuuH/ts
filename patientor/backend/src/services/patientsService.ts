import patients from "../../data/patients";
import { Patient, NewPatient, NonSensitivePatient } from "../types";
import { v7 as uuidv7 } from "uuid";

const getAllPatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getPatientById = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    if (!patient) {
        return undefined;
    }
    return { ...patient, entries: patient.entries || [] };
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuidv7(),
        ...patient,
        entries: []
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getAllPatients,
    getPatientById,
    addPatient
};
