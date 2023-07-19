import { RequestHandler } from "express";
import NoteModel from "../models/notes";
import createHttpError from "http-errors";
import mongoose from "mongoose";

//Get Notes
export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title?: string;
  text?: string;
}

//Create  Notes
export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  try {
    const { title, text } = req.body;

    if (!title) {
      throw createHttpError(400, "Note Must have a title");
    }
    const newNote = await NoteModel.create({
      title: title,
      text: text,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

//get Note By ID
export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid Note Id");
    }
    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not Found");
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface UpdateNoteParams {
  noteId: string;
}

interface UpdateNoteBody {
  title?: string;
  text?: string;
}

//Update Note
export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    if (!newTitle) {
      throw createHttpError(400, "Note must have a title");
    }

    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    note.title = newTitle;
    note.text = newText;

    const updateNote = await note.save();
    
    res.status(200).json(updateNote)

  } catch (error) {
    next(error);
  }
};


//Delete Note
export const deleteNote: RequestHandler = async(req, res, next) =>{
  const noteId = req.params.noteId;

  try{
     if(!mongoose.isValidObjectId(noteId)){
      throw createHttpError(400, "Invalid note id");
     }

     const note = await NoteModel.findById(noteId).exec();

     if(!note){
      throw createHttpError(404, "Note not found");
     }

     await note.deleteOne();


     res.status(204).json({ message:"Note Deleted Successfully"}); 
  }catch(error){
    next(error)
  }
}
