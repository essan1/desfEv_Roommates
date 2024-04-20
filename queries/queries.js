import axios from "axios";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const apiUrl = "https://randomuser.me/api/";

//ROOMMATES
const agregarRoommateQuery = async (req, res) => {
  try {
    const data = await axios.get(apiUrl);
    const userData = data.data.results[0];

    const id = uuidv4().slice(0, 8);
    const user = {
      id,
      nombre: `${userData.name.first} ${userData.name.last}`,
      email: userData.email,
      debe: 0,
      recibe: 0,
    };
    const roommatesJson = await JSON.parse(
      fs.readFileSync("./data/roommates.json", "utf-8")
    );
    roommatesJson.roommates.push(user);
    fs.writeFileSync("./data/roommates.json", JSON.stringify(roommatesJson));
  } catch (error) {
    console.log(error);
  }
};
const verRoommatesQuery = async (req, res) => {
  try {
    const roommatesJson = await JSON.parse(
      fs.readFileSync("./data/roommates.json", "utf-8")
    );
    return roommatesJson;
  } catch (error) {
    console.log(error);
  }
};

//GASTOS
const verGastosQuery = async (req, res) => {
  try {
    const gastosJson = await JSON.parse(
      fs.readFileSync("./data/gastos.json", "utf-8")
    );
    return gastosJson;
  } catch (error) {
    console.log(error.message);
  }
};
const agregarGastosQuery = async (gasto) => {
  try {
    gasto.fecha = new Date();
    gasto.id = uuidv4().slice(0, 8);
    const gastosJson = JSON.parse(
      fs.readFileSync("./data/gastos.json", "utf-8")
    );
    gastosJson.gastos.push(gasto);
    fs.writeFileSync("./data/gastos.json", JSON.stringify(gastosJson));
  } catch (error) {
    console.log(error.message);
  }
};
const eliminarGastosQuery = async (id) => {
  try {
    let gastosJson = await fs.readFileSync("./data/gastos.json", "utf8");
    let { gastos } = JSON.parse(gastosJson);
    gastos = gastos.filter((results) => results.id !== id);
    await fs.writeFileSync("./data/gastos.json", JSON.stringify({ gastos }));
  } catch (error) {
    console.log(error.message);
  }
};
const editarGastosQuery = async (id, gasto) => {
  try {
    const gastosJSON = await fs.readFileSync("data/gastos.json", "utf8");
    let { gastos } = JSON.parse(gastosJSON);
    gastos = gastos.map((g) => {
      if (g.id == id) {
        const newData = gasto;
        newData.id = id;
        return newData;
      }
      return g;
    });
    await fs.writeFileSync("data/gastos.json", JSON.stringify({ gastos }));
  } catch (error) {
    console.log(error.message);
  }
};

//DEUDAS
const recalcularDeudas = () => {
  const roommatesData = fs.readFileSync("./data/roommates.json", "utf8");
  const gastosData = fs.readFileSync("./data/gastos.json", "utf8");

  const { roommates } = JSON.parse(roommatesData);
  const { gastos } = JSON.parse(gastosData);

  roommates.forEach((r) => {
    r.debe = 0;
    r.recibe = 0;
    r.total = 0;
  });

  gastos.forEach((g) => {
    const montoPorPersona = g.monto / roommates.length;
    roommates.forEach((r) => {
      if (g.roommate === r.nombre) {
        r.recibe += montoPorPersona * (roommates.length - 1);
      } else {
        r.debe -= montoPorPersona;
      }
      r.total = (r.recibe - r.debe).toFixed(2); // Redondeamos a dos decimales
    });
  });

  fs.writeFileSync("./data/roommates.json", JSON.stringify({ roommates }));
};



export {
  agregarRoommateQuery,
  verRoommatesQuery,
  verGastosQuery,
  agregarGastosQuery,
  eliminarGastosQuery,
  editarGastosQuery,
  recalcularDeudas
};
