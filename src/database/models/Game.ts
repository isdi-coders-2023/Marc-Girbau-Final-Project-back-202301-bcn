import { model, Schema } from "mongoose";

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  backupImage: {
    type: String,
  },
  about: { type: String, required: true },
  platforms: { type: [String], required: true },
  categories: { type: [String], required: true },
  gameplayTime: { type: Number, required: true },
  releaseYear: { type: Number, required: true },
  developer: { type: String, required: true },
  ageRating: { type: String, required: true },
});

const Game = model("Games", gameSchema, "games");

export default Game;
