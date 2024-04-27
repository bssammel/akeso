const express = require('express');

const { User, Patient, Provider, ProviderPatient, Treatment, Condition } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();



module.exports = router;
