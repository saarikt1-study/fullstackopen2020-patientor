import React, { FC } from 'react'
import { Entry } from '../types'
import { useStateValue } from '../state';
import HospitalEntryDetails from './HospitalEntryDetails';
import HealthCheckEntryDetails from './HealthCheckEntryDetails';
import OccupationalHealthcareEntryDetails from './OccupationalHealthCareEntryDetails'

const EntryDetails: FC<{entry: Entry}> = ({ entry }) => {
  const [{ diagnose }] = useStateValue();

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
    };
  
  const findDiagnoseName = (code: string): string => {
    const theDiagnose = diagnose.find(diagnose => diagnose.code === code);
    if (theDiagnose) {
      return theDiagnose.name;
    }
    return "Unidentified diagnose code";
  }

  const entryType = () => {
    switch(entry.type) {
      case 'Hospital':
        return <HospitalEntryDetails entry={entry} />;
      case 'HealthCheck':
        return <HealthCheckEntryDetails entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntryDetails entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      <h3>{entry.date}</h3>
      {entryType()}
      <br />
      <p><i>{entry.description}</i></p>
      <ul>
        {entry.diagnosisCodes && entry.diagnosisCodes.map(d =>
          <li key={d}> {d}: {findDiagnoseName(d)}</li>
        )}
      </ul>
    </div>
  )
}

export default EntryDetails