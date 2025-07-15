export type Diagnosis = {
    name: string
    code: string;
    latin?: string;
};

export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
};

export type APIPatient = Pick<Patient, 'id' | 'name' | 'dateOfBirth' | 'gender' | 'occupation'>;