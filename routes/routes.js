import express from "express";
import {
  home,
  agregarRoommate,
  verRoommate,
  verGastos,
  agregarGastos,
  eliminarGastos,
  editarGastos,
  rutaGenerica
} from "../controllers/controller.js";
const router = express.Router();

//home
router.get("/", home);

//roommates
router.post('/roommate', agregarRoommate)
router.get('/roommates', verRoommate)

//gastos
router.get('/gastos', verGastos)
router.post('/gasto', agregarGastos);
router.delete('/gasto', eliminarGastos);
router.put("/gasto", editarGastos);

//ruta generica
router.get("*", rutaGenerica);

export default router;