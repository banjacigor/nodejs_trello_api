const request = require("supertest")
const app = require("../app")
const List = require("../models/list")
const {
  setupDatabase,
  boardOneId,
  boardTwoId,
  memberOne,
  listOneId,
} = require("./fixtures/db")

beforeEach(setupDatabase)

test("Should create a list", async () => {
  const response = await request(app)
    .post("/1/lists")
    .set("Authorization", `Bearer ${memberOne.tokens[0].token}`)
    .query({
      name: "Test Board Name",
      idBoard: boardOneId.toString(),
    })
    .expect(201)

  const list = await List.findById(response.body._id)
  expect(list).not.toBe(null)
})

test("Should get a list", async () => {
  const response = await request(app)
    .get(`/1/lists/${listOneId}`)
    .set("Authorization", `Bearer ${memberOne.tokens[0].token}`)
    .query()
    .expect(200)

  expect(response.body.name).toBe("Test List")
})

test("Should update valid list fields", async () => {
  await request(app)
    .patch(`/1/lists/${listOneId}`)
    .set("Authorization", `Bearer ${memberOne.tokens[0].token}`)
    .query({
      name: "New List",
    })
    .expect(200)

  const list = await List.findById(listOneId)
  expect(list.name).toEqual("New List")
})

test("Should get cards in a list", async () => {
  const response = await request(app)
    .get(`/1/lists/${listOneId}/cards`)
    .set("Authorization", `Bearer ${memberOne.tokens[0].token}`)
    .query()
    .expect(200)

  expect(response.body.length).toEqual(1)
  expect(response.body[0].name).toEqual("Test Card")
  expect(response.body[0].desc).toEqual("Test Description")
})

test("Should move list to board", async () => {
  const response = await request(app)
    .patch(`/1/lists/${listOneId}/idBoard`)
    .set("Authorization", `Bearer ${memberOne.tokens[0].token}`)
    .query({
      value: boardTwoId.toString(),
    })
    .expect(200)

  expect(response.body.idBoard).toEqual(boardTwoId.toString())
})
