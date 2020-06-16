/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { 
  NewPatientEntry,
  Gender,
  NewBaseEntry,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HealthCheckRating,
  Entry
} from './types';

const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  };
  
  return newEntry;
};

export const toNewDiagnosticEntry = (object: any): Entry => {
  const newEntry: NewBaseEntry = {
    date: parseDate(object.date),
    description: parseDescription(object.description),
    specialist: parseSpecialist(object.specialist)
  };

  if(object.diagnosisCodes) {
    newEntry.diagnosisCodes = parseDiagnoseCodes(object.diagnosisCodes);
  }

  const id: string = new Date().getTime().toString();
  const type = parseType(object.type);

  switch(type) {
    case "Hospital":
      const newHospitalEntry: HospitalEntry = {
        ...newEntry,
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseCriteria(object.discharge.criteria)
        },
        id, type
      };
      return newHospitalEntry;

    case "HealthCheck":
      const newHealthCheckEntry: HealthCheckEntry = {
        ...newEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        id, type
      };
      return newHealthCheckEntry;

    case "OccupationalHealthcare":
      const newOccupationalHealthcareEntry: OccupationalHealthcareEntry = {
        ...newEntry,
        employerName: parseEmployerName(object.employerName),
        id, type
      };

      if(object.sickLeave) {
        newOccupationalHealthcareEntry.sickLeave = {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate)
        };
      }

      return newOccupationalHealthcareEntry;
      
    default:
      return assertNever(type);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const parseType = (type: string): "Hospital" | "OccupationalHealthcare" | "HealthCheck"  => {
  if(type === "Hospital" || type === "OccupationalHealthcare" || type === "HealthCheck") {
    return type;
  }
  throw new Error (`Incorrect or unsupported entry type: ${type}`);
};

const parseDiagnoseCodes = (codes: string[]): string[] | undefined => {
  if(codes && (!Array.isArray(codes) || !codes.map(code => !isString(code)))) {
    throw new Error(`Incorrect or missing list of diagnosis codes ${String(codes)}`);
  }
  return codes;
};

const parseDescription = (description: string): string => {
  if(!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }
  return description;
};

const parseSpecialist = (specialist: string): string => {
  if(!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}`);
  }
  return specialist;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  console.log('Parse this date: ', isDate(date));
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseCriteria = (criteria: any): string => {
  if(!criteria || !isString(criteria)) {
    throw new Error(`Incorrect or missing criteria: ${String(criteria)}`);
  }
  return criteria;
};

const parseEmployerName = (employerName: any): string => {
  if(!employerName || !isString(employerName)) {
    throw new Error(`Incorrect or missing employer name: ${String(employerName)}`);
  }
  return employerName;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if(healthCheckRating === undefined
    || !Number.isInteger(Number(healthCheckRating))
    || !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(`Incorrect or missing health check rating ${String(healthCheckRating)}`);
  }

  return Number(healthCheckRating);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing value for name');
  }
  return name;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing value for ssn');
  }
  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing value for gender');
  }
  return gender;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing value for occupation');
  }
  return occupation;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export default toNewPatientEntry;