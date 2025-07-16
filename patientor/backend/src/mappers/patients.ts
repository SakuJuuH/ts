import { APIPatient, NewPatient, Patient, newPatientSchema } from "../types";

export const toAPIPatient = (patient: Patient): APIPatient => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation
});

export const toNewPatient = (object: unknown): NewPatient => {
    return newPatientSchema.parse(object);
};