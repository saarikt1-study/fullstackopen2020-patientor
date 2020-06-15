import React, { FC } from 'react'
import { Icon } from "semantic-ui-react";
import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient } from '../state';
import { Gender, Patient } from '../types';
import axios from 'axios'
import { apiBaseUrl } from '../constants';
import EntryDetails from './Entry';

const PatientPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[id];

  React.useEffect(() => {
    if(patient && !patient.ssn){
      const fetchPatient = async () => {
        try{
          const { data: newPatient } = await axios
            .get<Patient>(`${apiBaseUrl}/patients/${patient.id}`);

          dispatch(updatePatient(newPatient));
        } catch(error) {
          console.error(error.message);
        }
      };
      fetchPatient();
    }
  }, [patient, dispatch]);

  if(!patient) {
    return <div>Loading...</div>;
  }

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
    };
    
    const iconGender = (gender: Gender) => {
      switch (gender) {
        case Gender.Male:
          return 'mars';
        case Gender.Female:
          return 'venus';
        case Gender.Other:
          return 'genderless';
        default:
          return assertNever(gender);
      }
    };
            
  const {name, gender, dateOfBirth, ssn, occupation, entries} = patient;

  return (
    <div className="App">
      <h2>
        {name} <Icon name={iconGender(gender)} />
      </h2>
      <p>Date of birth: {dateOfBirth}</p>
      <p>SSN: {ssn}</p>
      <p>Occupation: {occupation}</p>
      <h3>Entries</h3>
      {entries && entries.map(e => <EntryDetails key={e.id} entry={e} />)}
    </div>
  );
};

export default PatientPage