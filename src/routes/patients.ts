import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const patient = patientService.findPatientById(id);

  try{
    if(!patient) {
      res.status(404).send("No patient found on id: " + id);
    }
    res.send(patient);
  }
  catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(error.message);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  }
  catch (e) {
    res.status(400).send(e);
  }
});

export default router;