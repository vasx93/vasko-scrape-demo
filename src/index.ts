import dotenv from "dotenv";
import CreateStorage from "./services/storage/createStorage.js";
import CreateProduct from "./domains/product.js";
dotenv.config();

(async () => {
  try {
    const url = "https://uk.typology.com/products/tinted-serum";

    // for simplicity and easier testing in the future create config first then create storage with the config
    const storage = await CreateStorage();

    const product = CreateProduct(storage);

    await product.scrapeProduct(url);
  } catch (err) {
    console.log(err);
  }
})();
