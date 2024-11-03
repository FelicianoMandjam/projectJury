import express from "express";
import request from "supertest";
import userRoute from "../Routes/user.routes.js";

const app = express();
app.use(express.json());
app.use("/user", userRoute);

describe('Should test all request from API /user"', () => {
  // GET Case is OK: user/showAll
  it("Should return a array with a object and a statusCode(200) from the route /user/getAll", async () => {
    const { body, statusCode } = await request(app).get("/user/getAll");
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          firstName: expect.any(String),
          lastName: expect.any(String),
          email: expect.any(String),
          password: expect.any(String),
        }),
      ])
    );
    expect(statusCode).toBe(200);
  });

  //   GET Case ERROR SERVER: user/showAll
  //   it('Should return a statusCode(500) and a message "user not found" from the route /user/getAll', async () => {
  //     const { body, statusCode } = await request(app).get("user/getAll");
  //     expect(body).toEqual(
  //       expect.arrayContaining([
  //         expect.objectContaining({
  //           id: expect.any(Number),
  //           firstName: expect.any(String),
  //           lastName: expect.any(String),
  //           email: expect.any(String),
  //           password: expect.any(String),
  //         }),
  //       ])
  //     );
  //     expect(statusCode).toBe(500);
  //   });
});
