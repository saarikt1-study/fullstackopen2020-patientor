import React, { FC } from 'react'
import { Icon } from "semantic-ui-react";
import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient } from '../state';
import { Gender, Patient } from '../types';
import axios from 'axios'
import { apiBaseUrl } from '../constants';

const PatientPage: React.FC = () => {
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
          console.error(error);
        }
      };
      fetchPatient();
    }
  }, [patient, dispatch]);

  if(!patient) {
    return <div>Loading...</div>;
  }

  // const {gender, dateOfBirth, occupation, entries, name, ssn} = patient;

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const iconGender = (gender: Gender) => {
    switch(gender) {
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
  
  return (
    <div className="App">
      <p>Hello Patients! {patient.name}</p>
      <h2>{patient.name}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      {/* <div>
        <h2>
          {name} <Icon name={iconGender(gender)} />
        </h2>
      </div>
      <div>
        Date of birth: {dateOfBirth} <br />
        SSN: {ssn} <br />
        Occupation: {occupation} <br />
      </div> */}
    </div>
  );
};

export default PatientPage