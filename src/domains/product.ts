import scrape from "../services/scraping/scraper.js";
import { Storage } from "../services/storage/types.js";
import { validateProduct } from "../services/validation/validate.js";
import { IProduct } from "./types.js";

const CreateProduct = (storage: Storage) => {
  const scrapeProduct = async (url: string) => {
    const product: IProduct = await scrape(url);

    if (!product) throw new Error(`Failed to scrape product at: ${url}`);

    validateProduct(product);

    console.log(product);

    const name = `${product.title}-${new Date().toISOString()}`;
    await storage.save(name, product);
  };

  return { scrapeProduct };
};

export default CreateProduct;
