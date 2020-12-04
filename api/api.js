import axios from "axios";
import shuffle from "../utils/shuffleHelper";

async function getCategories() {
  const res = await axios.get(
    "https://findsupeerbackend.herokuapp.com/categories"
  );
  return res.data;
}
async function getPeers() {
  const res = await axios.get("https://findsupeerbackend.herokuapp.com/peers");

  return shuffle(res.data);
}

module.exports = {
  getCategories,
  getPeers,
};
