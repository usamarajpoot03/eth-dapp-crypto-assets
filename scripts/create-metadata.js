const CryptoKitties = artifacts.require("CryptoKitties");
const fs = require("fs");

const metaDataTmplate = {
  name: "",
  description: "",
  image: "",
  attributes: [
    {
      trait_type: "strength",
      value: 0,
    },
    {
      trait_type: "loyality",
      value: 0,
    },
    {
      trait_type: "stamina",
      value: 0,
    },
    {
      trait_type: "intelligence",
      value: 0,
    },
  ],
};

module.exports = async (callback) => {
  try {
    const cryptoKittiesInstance = await CryptoKitties.deployed();
    const totalKitties = await cryptoKittiesInstance.getNumberOfKitties();
    for (let i = 0; i < totalKitties; i++) {
      let kittyMetaData = metaDataTmplate;
      const kitty = await cryptoKittiesInstance.kitties(i);
      const fileName =
        "metadata/" + kitty["name"].toLowerCase().replace(/\s/g, "-") + ".json";

      if (fs.existsSync(fileName)) {
        console.log("Kitty - " + i + " already exisits");
        continue;
      }
      console.log("Kitty - " + i + " doesn't exisits");
      kittyMetaData["name"] = kitty["name"];
      kittyMetaData["attributes"][0]["value"] = kitty["strength"]["words"][0];
      kittyMetaData["attributes"][1]["value"] = kitty["loyality"]["words"][0];
      kittyMetaData["attributes"][2]["value"] = kitty["stamina"]["words"][0];
      kittyMetaData["attributes"][3]["value"] =
        kitty["intelligence"]["words"][0];

      console.log(`Saving at ${fileName}`);

      let data = JSON.stringify(kittyMetaData);
      fs.writeFileSync(fileName, data);
    }
    callback(cryptoKittiesInstance);
  } catch (error) {
    callback(error);
  }
};
