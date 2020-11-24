import axios from "axios";

async function getCategories() {
  const res = await axios.get(
    "https://findsupeerbackend.herokuapp.com/categories"
  );
  return res.data;
}
async function getPeers() {
  const res = await axios.get("https://findsupeerbackend.herokuapp.com/peers");
  return res.data;
}

module.exports = {
  getCategories,
  getPeers,
};
