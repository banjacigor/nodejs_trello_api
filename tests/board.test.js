const request = require("supertest")
const app = require("../app")
const Board = require("../models/board")
const { memberOne, setupDatabase, boardOneId } = require("./fixtures/db")

beforeEach(setupDatabase)

test("Should create board", async () => {
  const response = await request(app)
    .post("/1/boards")
    .set("Authorization", `Bearer ${memberOne.tokens[0].token}`)
    .query({
      name: "Test Board Name",
      desc: "Test Board Description",
    })
    .expect(201)

  const board = await Board.findById(response.body._id)
  expect(board).not.toBeNull()
  expect(response.body).toMatchObject({
    name: "Test Board Name",
    desc: "Test Board Description",
  })
})

test("Should get a board", async () => {
  const response = await request(app)
    .get(`/1/boards/${boardOneId}`)
    .set("Authorization", `Bearer ${memberOne.tokens[0].token}`)
    .query()
    .expect(200)
  expect(response.body.name).toBe("Test Board")
  expect(response.body.desc).toBe("Test Description")
})

test("Should delete a board", async () => {
  await request(app)
    .delete(`/1/boards/${boardOneId}`)
    .set("Authorization", `Bearer ${memberOne.tokens[0].token}`)
    .send()
    .expect(200)

  const board = await Board.findById(boardOneId)
  expect(board).toBeNull()
})
