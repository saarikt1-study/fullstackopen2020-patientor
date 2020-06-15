import React, { FC } from 'react';
import { OccupationalHealthcareEntry } from '../types';
import { Icon } from "semantic-ui-react";

const OccupationalHealthCareEntryDetails: FC<{entry: OccupationalHealthcareEntry}> = ({ entry }) => {
  return(
    <div>
      <Icon name="address card outline" /> <br />
      Sickleave start date: {entry.sickLeave?.startDate} <br />
      Sicleave end date: {entry.sickLeave?.endDate} <br />
    </div>
  );
}

export default OccupationalHealthCareEntryDetails;