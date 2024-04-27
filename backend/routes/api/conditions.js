const express = require('express');

const { User, Patient, Provider, ProviderPatient, Treatment, Condition } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const  { validateConditionCreation } = require('../../utils/validation');

const router = express.Router();

// ! Get Condition by current pt user
// router.get(
//     '/current',
//     async (req, res, next) => {
//         const { user } = req;
//         const patientObj = 
//         const user = parseInt(req.params.conditionId) 
//         const conditionObj = await Condition.findByPk(conditionId);
//         if(conditionObj.errors){
//             return res.json(conditionObj)
//         } else {
//             return res.status(200).json(conditionObj)
//         }
//     }
// )

// ! Get Condition by ID
router.get(
    '/:conditionId',
    async (req, res, next) => {
        const conditionId = parseInt(req.params.conditionId) 
        const conditionObj = await Condition.findByPk(conditionId);
        if(!conditionObj){
            const err = new Error("Condition couldn't be found");
            err.message = "Condition couldn't be found!"
            err.status = 404;
            // return res.json(err)
            return next(err)
        } else {
            return res.status(200).json(conditionObj)
        }
    }
)

// ! Update Condition by ID
router.put(
    "/:conditionId/update", 
    requireAuth, 
    validateConditionCreation,
    async (req, res, next) => {
        const conditionId = parseInt(req.params.conditionId)
        const { name, description, status } = req.body;

        const conditionToUpdate = await Condition.findByPk(conditionId);

        if(!conditionToUpdate){
            const err = new Error("Condition couldn't be found");
            err.message = "Condition couldn't be found!"
            err.status = 404;
            // return res.json(err)
            return next(err)
        } else {
            const updatedCondition = await conditionToUpdate.update({
                name,
                description,
                status
            });
            return res.json(updatedCondition)
        }

    })

// ! Delete Condition by ID

router.delete(
    "/:conditionId/delete", 
    requireAuth, 
    validateConditionCreation,
    async (req, res, next) => {
        const conditionId = parseInt(req.params.conditionId)

        const conditionToDelete = await Condition.findByPk(conditionId);

        if(!conditionToDelete){
            const err = new Error("Condition couldn't be found");
            err.message = "Condition couldn't be found!"
            err.status = 404;
            return next(err)
        } else {
            await conditionToDelete.destroy();
            return res.json({message: "Successfully delete condition"})
        }

    })

module.exports = router;
