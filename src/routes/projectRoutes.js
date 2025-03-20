import express from "express";

const router = express.Router();

router.get("/:id", verifyToken, viewProject);
router.put("/:id", updateToken, updateProject);

export default router;
