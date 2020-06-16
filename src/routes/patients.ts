import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, { toNewDiagnosticEntry } from '../utils';

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


router.post('/:id/entries', (req, res) => {
  const { id } = req.params;
  try {
    console.log('NewEntry: ', req.body);
    const newEntry = toNewDiagnosticEntry(req.body);

    const patient = patientService.addEntry(id, newEntry);

    if(!patient) {
      res.status(404).send({error: "Could not find the patient from our database"});
    }
    
    res.send(patient);
  }
  catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;