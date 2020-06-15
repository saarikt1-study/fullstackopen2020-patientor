import patientData from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { 
  PatientEntry,
  NewPatientEntry,
  NonSensitivePatientEntry,
  Entry
} from '../types';

const patients: Array<PatientEntry> = patientData;

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

const addEntry = (id: string, entry: Entry): PatientEntry | undefined => {
  const updatedPatient = patients.find(patient => patient.id === id);
  if(updatedPatient) {
    updatedPatient.entries.push(entry);
    patients.map(patient => patient.id === updatedPatient.id ? updatedPatient : patient);
    return updatedPatient;
  }
  return updatedPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findPatientById,
  addEntry
};