import path from "path";
import {
  agregarRoommateQuery,
  verRoommatesQuery,
  verGastosQuery,
  agregarGastosQuery,
  eliminarGastosQuery,
  editarGastosQuery,
  recalcularDeudas
} from "../queries/queries.js";
const __dirname = import.meta.dirname;



const home = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
};
//---------------------------------------


//roommate
const agregarRoommate = async (req, res) => {
  try {
    await agregarRoommateQuery();
    recalcularDeudas();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
const verRoommate = async (req, res) => {
  try {
    const roommatesJson = await verRoommatesQuery();
    res.json(roommatesJson);
  } catch (error) {
    console.log(error);
  }
};

//gastos
const verGastos = async (req, res) => {
  try {
    const results = await verGastosQuery();
    res.json(results);
  } catch (error) {
    console.log(error.message);
  }
};
const agregarGastos = async (req, res) => {
  try {
    const gasto = req.body;
    await agregarGastosQuery(gasto);
    recalcularDeudas();
    res.send("Gasto agregado");
  } catch (error) {
    console.log(error.message);
  }
};
const eliminarGastos = async (req, res) => {
  try {
    const id = req.query.id;

    await eliminarGastosQuery(id);
    recalcularDeudas();
    res.send("Gasto eliminado");
  } catch (error) {
    console.log(error.message);
  }
};
const editarGastos = async (req, res) => {
  try {
    const id = req.query.id;
    const gasto = req.body;
    await recalcularDeudas();
    await editarGastosQuery(id, gasto);

    res.send("Gasto editado");
  } catch (error) {
    console.log(error.message);
  }
};


//---------------------------------------
const rutaGenerica = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/404.html"))
}


export {
  home,
  agregarRoommate,
  verRoommate,
  verGastos,
  rutaGenerica,
  agregarGastos,
  eliminarGastos,
  editarGastos
};