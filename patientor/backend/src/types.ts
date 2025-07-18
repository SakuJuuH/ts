import { z } from 'zod';

export type Diagnosis = {
    name: string
    code: string;
    latin?: string;
};

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
};

export type NonSensitivePatient = Pick<Patient, 'id' | 'name' | 'dateOfBirth' | 'gender' | 'occupation'>;

export type NewPatient = Omit<Patient, 'id' | 'entries'>;

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

interface BaseEntry {
    id: string;
    date: string;
    specialist: string;
    description: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
};

interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
};

interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: {
        date: string;
        criteria: string;
    };
};

export type Entry =
    | HealthCheckEntry
    | OccupationalHealthcareEntry
    | HospitalEntry;