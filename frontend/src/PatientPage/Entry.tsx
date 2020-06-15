import React, { FC } from 'react'
import { Patient, Entry } from '../types'
import { useStateValue } from '../state';

const EntryDetails: FC<{entry: Entry}> = ({ entry }) => {
  const [{ diagnose }] = useStateValue();

  const findDiagnoseName = (code: string): string => {
    const theDiagnose = diagnose.find(diagnose => diagnose.code === code)
    if (theDiagnose) {
      return theDiagnose.name
    }
    return "Unidentified diagnose code"
  }

  return (
    <>
      <p>{entry.date} {entry.description}</p>
      <ul>
        {entry.diagnosisCodes && entry.diagnosisCodes.map(d =>
          <li key={d}> {d} {findDiagnoseName(d)}</li>
        )}
      </ul>
    </>
  )
}

export default EntryDetails