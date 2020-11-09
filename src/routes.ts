import { Router } from "express";
import multer from "multer";
import ClientsController from "./controllers/ClientsController";
import uploadConfig from "./config/upload";

const upload = multer(uploadConfig);
const routes = Router();

routes.get("/clients", ClientsController.index);
routes.get("/clients/:id", ClientsController.show);
routes.post("/clients", upload.array("images"), ClientsController.create);

export default routes;
