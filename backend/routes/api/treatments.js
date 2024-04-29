const express = require('express');

const { User, Patient, Provider, ProviderPatient, Treatment, Condition } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const  { validateTreatmentCreation } = require('../../utils/validation');

const router = express.Router();

// ! Update Treatment by ID
router.put(
    "/:treatmentId/update", 
    requireAuth, 
    validateTreatmentCreation,
    async (req, res, next) => {
        const treatmentId = parseInt(req.params.treatmentId)
        const { name, dosage, frequencyQuantity, frequencyPeriod, conditionId } = req.body;

        const treatmentToUpdate = await Treatment.findByPk(treatmentId);

        if(!treatmentToUpdate){
            const err = new Error("Treatment couldn't be found");
            err.message = "Treatment couldn't be found!"
            err.status = 404;
            // return res.json(err)
            return next(err)
        } else {
            const updatedTreatment = await treatmentToUpdate.update({
            name,
            dosage,
            frequencyQuantity,
            frequencyPeriod, 
            conditionId
            });
            return res.json(updatedTreatment)
        }

    })

// ! Delete Treatment by ID

router.delete(
    "/:treatmentId/delete", 
    requireAuth,
    async (req, res, next) => {
        const treatmentId = parseInt(req.params.treatmentId)

        const treatmentToDelete = await Treatment.findByPk(treatmentId);

        if(!treatmentToDelete){
            const err = new Error("Treatment couldn't be found");
            err.message = "Treatment couldn't be found!"
            err.status = 404;
            return next(err)
        } else {
            await treatmentToDelete.destroy();
            return res.json({message: "Successfully deleted condition"})
        }

    })
    module.exports = router;
