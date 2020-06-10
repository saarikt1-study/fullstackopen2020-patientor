import React, { FC } from 'react'
import { Icon } from "semantic-ui-react";
import { useParams } from 'react-router-dom';
import { useStateValue } from '../state';
import { Gender } from '../types';
import axios from 'axios'

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[id];

  // React.useEffect(() => {
  //   if(patient && !patient.ssn){
  //     const fetchPatient = async () => {
  //       try{
  //         const { data: newPatientFromApi } = await axios
  //           .get<PatientEntry>(`api/patients/${patient.id}`);
  //         dispatch(updatePatient(newPatientFromApi));
  //       } catch(error) {
  //         console.error(error);
  //       }
  //     };
  //     fetchPatient();
  //   }
  // }, [patient, dispatch]);

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
      <p>Hello Patients!</p>
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