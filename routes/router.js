const express = require("express");
const { createOrganisation, getAllOrganizations, updateOrganization, deleteOrganization } = require("../controller/organisation.controller");
const router = express.Router();
const schema =require("../validate/validate")
const upload=require("../middleware/multer")

router.post("/add_organisation",upload.none(),schema.validateCreateSchema,createOrganisation)
router.get("/get_all_organisation",getAllOrganizations)
router.put("/edit_organisation",upload.none(),schema.validateEditSchema,updateOrganization)
router.delete("/delete_organisation/:id",deleteOrganization)

module.exports={
    router
}