import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose from "mongoose";
import connectDatabase from "../../../database/connectDatabase";
import statusCodes from "../../utils/statusCodes";
import { app } from "../../app";
import Game from "../../../database/models/Game";
import { mockWitcherGame } from "../../mocks/gamesMocks";

const { success } = statusCodes;

let mongodbServer: MongoMemoryServer;

beforeAll(async () => {
  mongodbServer = await MongoMemoryServer.create();
  const mongodbServerUrl = mongodbServer.getUri();

  await connectDatabase(mongodbServerUrl);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongodbServer.stop();
});

beforeEach(async () => {
  await Game.create(mockWitcherGame);
});

afterEach(async () => {
  await Game.deleteMany();
  jest.clearAllMocks();
});

describe("Gicen a GET /games endpoint", () => {
  const gamesUrl = "/games";

  describe("When it receives a request", () => {
    test("Then it should respond with status 200 and the games requested", async () => {
      const expectedStatus = success.okCode;

      await request(app).get(gamesUrl).expect(expectedStatus);
    });
  });
});
