import Joi from "joi";
import { IProduct } from "../../domains/types.js";

const URLSchema = Joi.string().uri({ scheme: ["http", "https"] });

const ProductSchema = Joi.object({
  title: Joi.string().required(),
  // description: Joi.string().required().max(215), //had issues with gpt limiting to 215 chars
  description: Joi.string().required(),
  images: Joi.array().items(URLSchema).required(),
});

export const validateURL = (url: string) => {
  const { error } = URLSchema.validate(url);
  if (error) {
    throw new Error(`Invalid URL: ${error.message}`);
  }
};

export const validateProduct = (product: IProduct) => {
  const { error } = ProductSchema.validate(product);

  if (error) {
    throw new Error(`Invalid URL: ${error.message}`);
  }
};
