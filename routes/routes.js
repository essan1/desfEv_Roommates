import express from "express";
import {
  home,
  agregarRoommate,
  verRoommate,
  rutaGenerica,
} from "../controllers/controller.js";
const router = express.Router();

//home
router.get("/", home);

//roommates
router.post('/roommate', agregarRoommate)
router.get('/roommates', verRoommate)


//ruta generica
router.get("*", rutaGenerica);

export default router;