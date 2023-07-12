import { RequestHandler } from "express";
import NoteModel from "../models/notes";

//Get Notes
export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

//Create  Notes
export const createNote: RequestHandler = async (req, res, next) => {

  try {
    const { title, text} = req.body;
    const newNote = await NoteModel.create({
      title: title,
      text: text,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};
