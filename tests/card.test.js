const request = require("supertest")
const app = require("../app")
const Card = require("../models/card")
const {
  memberOne,
  setupDatabase,
  listOneId,
  cardOneId,
  memberOneId,
  commentOneId,
  memberTwoId,
} = require("./fixtures/db")

beforeEach(setupDatabase)

test("Should create card", async () => {
  const response = await request(app)
    .post("/1/cards")
    .set("Authorization", `Bearer ${memberOne.tokens[0].token}`)
    .query({
      name: "Test Card",
      desc: "Test description",
      due: "2020-05-05",
      dueComplete: true,
      idList: listOneId.toString(),
    })
    .expect(201)

  const card = await Card.findById(response.body._id)
  expect(card).not.toBe(null)
})

test("Should get a card", async () => {
  const response = await request(app)
    .get(`/1/cards/${cardOneId}`)
    .set("Authorization", `Bearer ${memberOne.tokens[0].token}`)
    .query()
    .expect(200)

  expect(response.body.name).toBe("Test Card")
})

test("Should update valid card fields", async () => {
  await request(app)
    .patch(`/1/cards/${cardOneId}`)
    .set("Authorization", `Bearer ${memberOne.tokens[0].token}`)
    .query({
      name: "New Card",
    })
    .expect(200)

  const card = await Card.findById(cardOneId)
  expect(card.name).toEqual("New Card")
})
test("Should not update invalid card fields", async () => {
  await request(app)
    .patch(`/1/cards/${cardOneId}`)
    .set("Authorization", `Bearer ${memberOne.tokens[0].token}`)
    .query({
      unknownField: "Belgrade",
    })
    .expect(400)
})

test("Should add new comment to a card", async () => {
  const response = request(app)
    .post(`/1/cards/${cardOneId}/actions/comments`)
    .set("Authorization", `Bearer ${memberOne.tokens[0].token}`)
    .query({
      text: "New Comment",
    })
    .expect(200)
})

test("Should add member to a card", async () => {
  const response = await request(app)
    .post(`/1/cards/${cardOneId}/idMembers`)
    .set("Authorization", `Bearer ${memberOne.tokens[0].token}`)
    .query({
      value: memberOneId.toString(),
    })
    .expect(200)

  expect(response.body.idMembers.length).toEqual(2)
})

test("Should delete a comment on a card", async () => {
  const response = await request(app)
    .delete(`/1/cards/${cardOneId}/actions/${commentOneId}/comments`)
    .set("Authorization", `Bearer ${memberOne.tokens[0].token}`)
    .expect(200)

  expect(response.body.idComments.length).toEqual(0)
})

test("Should delete a member on a card", async () => {
  const response = await request(app)
    .delete(`/1/cards/${cardOneId}/idMembers/${memberTwoId}`)
    .set("Authorization", `Bearer ${memberOne.tokens[0].token}`)
    .expect(200)
  expect(response.body.idMembers.length).toEqual(0)
})

test("Should delete a card and its comments", async () => {
  await request(app)
    .delete(`/1/cards/${cardOneId}`)
    .set("Authorization", `Bearer ${memberOne.tokens[0].token}`)
    .expect(200)

  const card = await Card.findById(cardOneId)
  expect(card).toBeNull()
})
