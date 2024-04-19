import path from "path";
import { agregarRoommateQuery, verRoommatesQuery } from "../queries/queries.js"
const __dirname = import.meta.dirname;



const home = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
};


const agregarRoommate = async (req, res) => {
  try {
    await agregarRoommateQuery();
    res.send("Roommate added");
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



const rutaGenerica = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/404.html"))
}


export {
    home,
    agregarRoommate,
    verRoommate,
    rutaGenerica
}