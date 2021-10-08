const request = require("supertest")
const app = require("../app")
const Member = require("../models/member")
const { memberOneId, memberOne, setupDatabase } = require("./fixtures/db")

beforeEach(setupDatabase)

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/1/members")
    .send({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@mail.com",
      password: "test123456789",
    })
    .expect(201)

  // Assert that the database was changed correctly
  const member = await Member.findById(response.body.member._id)
  expect(member).not.toBeNull()

  // Assertions about the response
  expect(response.body).toMatchObject({
    member: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@mail.com",
    },
    token: member.tokens[0].token,
  })

  expect(member.password).not.toBe("test123456789")
})

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/1/members/login")
    .query({
      email: memberOne.email,
      password: memberOne.password,
    })
    .expect(200)
  const member = await Member.findById(memberOneId)
  expect(response.body.token).toBe(member.tokens[1].token)
})

test("Should not login nonexistent user", async () => {
  await request(app)
    .post("/1/members/login")
    .send({
      email: memberOne.email,
      password: "thisisnotmypass",
    })
    .expect(400)
})

test("Should get profile for member", async () => {
  await request(app)
    .get(`/1/members/${memberOne._id}`)
    .set("Authorization", `Bearer ${memberOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test("Should not get member for unauthenticated user", async () => {
  await request(app).get(`/1/members/${memberOne._id}`).send().expect(401)
})

test("Should delete account for user", async () => {
  await request(app)
    .delete(`/1/members/${memberOne._id}`)
    .set("Authorization", `Bearer ${memberOne.tokens[0].token}`)
    .send()
    .expect(200)

  const member = await Member.findById(memberOneId)
  expect(member).toBeNull()
})

test("Should not delete account for nonauthenticated user", async () => {
  await request(app).delete(`/1/members/${memberOne._id}`).send().expect(401)
})

test("Should update valid member fields", async () => {
  await request(app)
    .patch(`/1/members/${memberOne._id}`)
    .set("Authorization", `Bearer ${memberOne.tokens[0].token}`)
    .query({
      firstName: "Doug",
    })
    .expect(200)

  const member = await Member.findById(memberOneId)
  expect(member.firstName).toEqual("Doug")
})

test("Should not update invalid member fields", async () => {
  await request(app)
    .patch(`/1/members/${memberOne._id}`)
    .set("Authorization", `Bearer ${memberOne.tokens[0].token}`)
    .query({
      unknownField: "Belgrade",
    })
    .expect(400)
})
