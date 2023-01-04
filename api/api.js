import axios from "axios";
import shuffle from "../utils/shuffleHelper";

async function getCategories() {
  const res = await axios.get("https://findsupeer-api.onrender.com/categories");
  return res.data;
}
async function getPeers() {
  const res = await axios.get("https://findsupeer-api.onrender.com/peers");

  return shuffle(res.data);
}

async function getSuperPeerData(username) {
  const res = await axios
    .post("https://findsupeer-api.onrender.com/getSuperpeerInfo", {
      username: username,
    })
    .catch((err) => {
      return false;
    });
  return res.data;
}

async function getImageAsBase64(image) {
  const res = await axios
    .post(
      "https://findsupeer-api.onrender.com/getImageAsBase64",
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
