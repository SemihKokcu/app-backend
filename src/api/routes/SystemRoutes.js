const express = require("express");
const Role = require("../../models/Role");
const Claim = require("../../models/Claim");
const router = express.Router();
const {
  create_product,
  update_product,
  delete_product,
} = require("../routes/claims/ClaimsNames");

// yeni claimler eklendiğine superAdmine' o claimleri ekler
router.get("/updateAdminRoleClaims", async (req, res, next) => {
  try {
    const superAdmin = await Role.findOne({ name: "Super-Admin" });
    const claims = (await Claim.find()).map((claim) => claim._id);
    superAdmin.claims = claims;
    await superAdmin.save();
    return res.json(superAdmin);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/updateRoleClaimsWithId/:id", async (req, res, next) => {
  try {

    // istenilen role eklemek istenilen claim'name ekle
    const newClaimList = [create_product, update_product];
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }
    const claims = await Claim.find({ name: { $in: newClaimList } });
    const claimIdListByNewClaimName = claims.map((claim) => claim._id);
    role.claims = claimIdListByNewClaimName;
    await role.save();

    return res.json(role);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
