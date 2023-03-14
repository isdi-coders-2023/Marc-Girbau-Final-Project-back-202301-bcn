import {
  type GameStructure,
  type GamesStructure,
} from "../controllers/gamesControllers/types";

export const mockWitcherGame: GameStructure = {
  name: "The Witcher",
  about: "This is an adventure game",
  ageRating: "17 +",
  backupImage: "thewitcher.jpg",
  categories: ["Adventure", "Action"],
  developer: "EA games",
  gameplayTime: 60,
  platforms: ["Playstation"],
  releaseYear: 2015,
  image: "thewitcher.jpg",
};

export const games: GamesStructure = [mockWitcherGame];
