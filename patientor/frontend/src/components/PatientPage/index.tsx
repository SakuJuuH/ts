import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import { Diagnosis, Patient } from '../../types';
import axios from 'axios';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patient = await patientService.getById(id!);
        setPatient(patient);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          setError(e.response?.data || 'Failed to fetch patient data');
        } else {
          setError('An unexpected error occurred');
        }
      }
    };

    const fetchDiagnoses = async () => {
      try {
        const diagnoses = await diagnosisService.getAll();
        setDiagnoses(diagnoses);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          setError(e.response?.data || 'Failed to fetch diagnoses');
        } else {
          setError('An unexpected error occurred');
        }
      }
    };
    fetchPatient();
    fetchDiagnoses();
  }, [id]);

 
  if (!patient) return <div>No patient found</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Patient Details</h2>
      {error ? <p>Error: {error}</p> : (
          <>
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>Occupation:</strong> {patient.occupation}</p>
          <p><strong>SSN:</strong> {patient.ssn}</p>
          
            <h3>Entries</h3>
            {patient.entries.length > 0 ? (
              <ul>
                {patient.entries.map(entry => (
                  <li key={entry.id}>
                    <p><strong>Date:</strong> {entry.date}</p>
                    <p><strong>Specialist:</strong> {entry.specialist}</p>
                    <p><strong>Description:</strong> {entry.description}</p>
                    {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                      <p><strong>Diagnosis Codes:</strong>
                        <ul>{entry.diagnosisCodes.map(code => <li key={code}>{code} { diagnoses.find(d => d.code === code)?.name}</li>)}</ul>
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No entries found for this patient.</p>
            )}
          </>
      )}
    </div>
  );
};

export default PatientPage;