const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const Member = require("../../models/member")
const Board = require("../../models/board")
const List = require("../../models/list")
const Card = require("../../models/card")
const Comment = require("../../models/comment")

const memberOneId = new mongoose.Types.ObjectId()
const memberOne = {
  _id: memberOneId,
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@example.com",
  password: "test123456789",
  tokens: [
    {
      token: jwt.sign({ _id: memberOneId }, process.env.SECRET_KEY),
    },
  ],
}

const memberTwoId = new mongoose.Types.ObjectId()
const memberTwo = {
  _id: memberTwoId,
  firstName: "Angus",
  lastName: "Young",
  email: "angus.young@example.com",
  password: "highwaytohell23",
  tokens: [
    {
      token: jwt.sign({ _id: memberTwoId }, process.env.SECRET_KEY),
    },
  ],
}

const boardOneId = new mongoose.Types.ObjectId()
const boardOne = {
  _id: boardOneId,
  name: "Test Board",
  desc: "Test Description",
}

const boardTwoId = new mongoose.Types.ObjectId()
const boardTwo = {
  _id: boardTwoId,
  name: "Test Board",
  desc: "Test Description",
}

const listOneId = new mongoose.Types.ObjectId()
const listOne = {
  _id: listOneId,
  name: "Test List",
  idBoard: boardOneId,
}

const commentOneId = new mongoose.Types.ObjectId()
const commentOne = {
  _id: commentOneId,
  text: "Test Comment",
}

const cardOneId = new mongoose.Types.ObjectId()
const cardOne = {
  _id: cardOneId,
  name: "Test Card",
  desc: "Test Description",
  due: "2021-05-05",
  dueComplete: true,
  idList: listOneId,
  idComments: [commentOneId],
  idMembers: [memberTwoId],
}

const setupDatabase = async () => {
  await Member.deleteMany()
  await Board.deleteMany()
  await List.deleteMany()
  await Card.deleteMany()
  await Comment.deleteMany()
  await new Member(memberOne).save()
  await new Member(memberTwo).save()
  await new Board(boardOne).save()
  await new Board(boardTwo).save()
  await new List(listOne).save()
  await new Comment(commentOne).save()
  await new Card(cardOne).save()
}

module.exports = {
  memberOneId,
  memberOne,
  memberTwoId,
  boardOneId,
  boardTwoId,
  listOneId,
  cardOneId,
  commentOneId,
  setupDatabase,
}
