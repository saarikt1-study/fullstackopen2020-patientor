import React, { FC } from 'react'
import { Patient, Entry } from '../types'

const EntryDetails: FC<{entry: Entry}> = ({ entry }) => {
  return (
    <>
      <p>{entry.date} {entry.description}</p>
      <ul>
        {entry.diagnosisCodes && entry.diagnosisCodes.map(d =>
          <li>{d}</li>
        )}
      </ul>
    </>
  )
}

export default EntryDetails