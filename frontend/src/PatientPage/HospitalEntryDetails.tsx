import React, { FC } from 'react';
import { HospitalEntry } from '../types';
import { Icon } from "semantic-ui-react";

const HospitalEntryDetails: FC<{entry: HospitalEntry}> = ({ entry }) => {
  return(
    <div>
      <Icon name="hospital symbol" /> <br />
      Discharge date: {entry.discharge.date} <br />
      Discharge criteria: {entry.discharge.criteria} <br />
    </div>
  );
}

export default HospitalEntryDetails;