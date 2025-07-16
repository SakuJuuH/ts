import { z } from 'zod';

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

export type NewPatient = Omit<Patient, 'id'>;

export type APIPatient = Pick<Patient, 'id' | 'name' | 'dateOfBirth' | 'gender' | 'occupation'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    ssn: z.string(),
    gender: z.enum(Object.values(Gender)),
    occupation: z.string()
});

