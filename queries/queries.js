import axios from "axios";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const apiUrl = "https://randomuser.me/api/";

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

export { agregarRoommateQuery, verRoommatesQuery };