import patientData from '../../data/patients.json';
import { v4 as uuidv4 } from 'uuid';
import { PatientEntry, NewPatientEntry, NonSensitivePatientEntry } from '../types';

const patients: Array<PatientEntry> = patientData as Array<PatientEntry>;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const findPatientById = (id: string): PatientEntry | undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newId: string = uuidv4();
  const newPatientEntry = {
    id: newId,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findPatientById
};