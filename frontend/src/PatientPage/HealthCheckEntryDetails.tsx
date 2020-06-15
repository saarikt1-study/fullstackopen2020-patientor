import React, { FC } from 'react';
import { HealthCheckEntry } from '../types';
import { Icon } from "semantic-ui-react";

const HealthCheckEntryDetails: FC<{entry: HealthCheckEntry}> = ({ entry }) => {
  return(
    <div>
      <Icon name="stethoscope" /> <br />
      Health check rating: {entry.healthCheckRating} <br />
    </div>
  );
}

export default HealthCheckEntryDetails;