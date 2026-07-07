const express=require("express");

const router=express.Router();

const authMiddleware=require("../middleware/authMiddleware");

const {

getNotifications,
createNotification,
markRead

}=require("../controllers/notificationController");

router.get(
"/",
authMiddleware,
getNotifications
);

router.post(
"/",
authMiddleware,
createNotification
);

router.put(
"/:id",
authMiddleware,
markRead
);

module.exports=router;