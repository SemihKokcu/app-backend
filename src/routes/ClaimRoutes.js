const express = require('express');
const router = express.Router();
const ClaimController = require('../api/controllers/ClaimsController');

router.post('/add', ClaimController.addClaim);

router.put('/update/:claimId', ClaimController.updateClaim);

router.delete('/delete/:claimId', ClaimController.deleteClaim);

router.get('/get/:claimId', ClaimController.getClaim);

router.get('/getAll', ClaimController.getAllClaims);

router.get('/getAllPaginated', ClaimController.getAllPaginatedClaims);

module.exports = router;
