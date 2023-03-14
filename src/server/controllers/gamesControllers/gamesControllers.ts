import "../../../loadEnvironment.js";
import { type NextFunction, type Request, type Response } from "express";
import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import path from "path";
import CustomError from "../../../CustomError/CustomError.js";
import Game from "../../../database/models/Game.js";
import statusCodes from "../../utils/statusCodes.js";
import { type GamesStructure, type GameFormData } from "./types.js";
import {
  supabaseId,
  supabaseKey,
  supabaseUrl,
} from "../../../loadEnvironment.js";

const supabase = createClient(supabaseUrl!, supabaseKey!);

const {
  clientError: { badRequest },
} = statusCodes;

export const getAllGames = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pagination = {
    limit: 6,
    page: +req.query.page! || 0,
    filter: req.query.filter,
  };
  let games: GamesStructure;
  let totalGames: number;

  try {
    if (pagination.filter) {
      games = await Game.find({ categories: { $in: pagination.filter } })
        .limit(pagination.limit)
        .skip(pagination.limit * pagination.page)
        .exec();

      totalGames = await Game.countDocuments({
        categories: { $in: pagination.filter },
      }).exec();

      const totalNumberPages = Math.ceil(totalGames / pagination.limit);

      res.status(200).json({ games, totalNumberPages });
    } else {
      games = await Game.find()
        .limit(pagination.limit)
        .skip(pagination.limit * pagination.page)
        .exec();

      totalGames = await Game.countDocuments().exec();

      const totalNumberPages = Math.ceil(totalGames / pagination.limit);

      res.status(200).json({ games, totalNumberPages });
    }
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "There was an error"
    );

    next(customError);
  }
};

export const createGame = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, GameFormData>,
  res: Response,
  next: NextFunction
) => {
  const game = req.body;
  const gameImage = req.file?.filename;

  try {
    const backupImage = await fs.readFile(path.join("uploads", gameImage!));
    await supabase.storage.from(supabaseId!).upload(gameImage!, backupImage);

    const {
      data: { publicUrl },
    } = supabase.storage.from(supabaseId!).getPublicUrl(gameImage!);

    await Game.create({ ...game, image: gameImage, backupImage: publicUrl });

    res.status(201).json({ message: "The game has been created" });
  } catch (error) {
    const customError = new CustomError(
      "There was a problem creating the game",
      badRequest,
      "Something went wrong"
    );

    next(customError);
  }
};
