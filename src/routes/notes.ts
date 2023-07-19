import * as NotesController from "../controllers/notes";
import express from "express";

const router = express.Router();

router.get("/", NotesController.getNotes);
router.get("/:noteId", NotesController.getNote);
router.post("/", NotesController.createNote);
router.patch("/update/:noteId", NotesController.updateNote)
router.delete("/delete/:noteId", NotesController.deleteNote);
export default router;
