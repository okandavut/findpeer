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
  const res = await axios.post(
    "https://findsupeerbackend.herokuapp.com/getSuperpeerInfo",
    {
      username: username,
    }
  );
  return res.data;
}

async function getImageAsBase64(image) {
  const res = await axios
    .post(
      "https://findsupeerbackend.herokuapp.com/getImageAsBase64",
      {
        ImgUrl: image,
      },
      { timeout: 1500 }
    )
    .catch((error) => {
      return image;
    });
  return res.data;
}
module.exports = {
  getCategories,
  getPeers,
  getSuperPeerData,
  getImageAsBase64,
};
