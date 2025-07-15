import { APIPatient, Gender, NewPatient, Patient } from "../types";

export const toAPIPatient = (patient: Patient): APIPatient => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation
});

export const toNewPatient = (object: unknown): NewPatient | null => {
    if (!isNewPatient(object)) {
        return null;
    }
    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
    };

    return newPatient;
};

const isNewPatient = (object: unknown): object is NewPatient => {
    return (
        typeof object === "object" &&
        object !== null &&
        "name" in object &&
        "dateOfBirth" in object &&
        "ssn" in object &&
        "gender" in object &&
        "occupation" in object
    );
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};
const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    if (name.trim().length === 0) {
        throw new Error('Name cannot be empty');
    }

    return name;
};
const parseDate = (date: unknown): string => {
    if (!date || !isString(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }

    if (!isDate(date)) {
        throw new Error('Invalid date format: ' + date);
    }

    return date;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing SSN');
    }

    if (ssn.trim().length === 0) {
        throw new Error('SSN cannot be empty');
    }

    return ssn;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender)) {
        throw new Error('Incorrect or missing gender');
    }

    if (!isGender(gender)) {
        throw new Error('Gender must be one of: male, female, other');
    }

    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }

    if (occupation.trim().length === 0) {
        throw new Error('Occupation cannot be empty');
    }

    return occupation;
};

