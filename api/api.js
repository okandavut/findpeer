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

async function getSuperPeerData(username) {
  const res = await axios.post("https://findsupeerbackend.herokuapp.com/getSuperpeerInfo", {
    username: username,
  });

  return res.data;
}

module.exports = {
  getCategories,
  getPeers,
  getSuperPeerData
};
