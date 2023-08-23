import { Router } from "express";
import { createEditor } from "../controllers/editors.controller";

const editorRouter = Router();

editorRouter.post("/create", createEditor)

export default editorRouter;
