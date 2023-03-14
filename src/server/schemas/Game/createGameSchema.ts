import { Joi } from "express-validation";

const createGameSchema = {
  body: Joi.object({
    name: Joi.string().max(30).required(),
    image: Joi.string(),
    about: Joi.string().max(500).required(),
    platforms: Joi.array().items(Joi.string()).required(),
    categories: Joi.array().items(Joi.string()).required(),
    gameplayTime: Joi.number().max(1000).required(),
    releaseYear: Joi.number().required(),
    developer: Joi.string().max(20).required(),
    ageRating: Joi.string().max(20).required(),
  }),
};

export default createGameSchema;
