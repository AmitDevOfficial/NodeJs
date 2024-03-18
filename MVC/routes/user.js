const express = require("express");
const router = express.Router();
const { handelGetAllUsers, handelShowAllUser, handelGetUserById, handelPatchById, handelDelteById, handelCreateUser } = require("../controllers/user")


//Show all user list with HTML Elements :--
router.route("/").get(handelGetAllUsers).post(handelCreateUser)


//Rest 
router.get("/api/users", handelShowAllUser)



//Showing users with id :--
router
    .route("/:id")
    .get(handelGetUserById)
    .patch(handelPatchById)
    .delete(handelDelteById)

module.exports = router;