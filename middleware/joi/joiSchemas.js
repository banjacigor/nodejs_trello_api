const Joi = require("joi")
const {
  validateParamsRequest,
  validateQueryRequest,
  validateBodyRequest,
} = require("./validateSchema")

function createBoardSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
  })
  validateQueryRequest(req, next, schema)
}

function idSchema(req, res, next) {
  const schema = Joi.object({
    id: Joi.string().min(24).max(24).required(),
  })
  validateParamsRequest(req, next, schema)
}

function createListSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    idBoard: Joi.string().min(24).max(24).required(),
  })
  validateQueryRequest(req, next, schema)
}

function updateListSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string(),
    idBoard: Joi.string().min(24).max(24),
  })
  validateQueryRequest(req, next, schema)
}

function idSchemaQuery(req, res, next) {
  const schema = Joi.object({
    value: Joi.string().min(24).max(24).required(),
  })
  validateQueryRequest(req, next, schema)
}

function moveAllCards(req, res, next) {
  const schema = Joi.object({
    idBoard: Joi.string().min(24).max(24).required(),
    idList: Joi.string().min(24).max(24).required(),
  })
  validateQueryRequest(req, next, schema)
}

function createCardSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    desc: Joi.string(),
    due: Joi.date(),
    dueComplete: Joi.boolean(),
    idList: Joi.string().min(24).max(24).required(),
    idComments: Joi.array().items(Joi.string().min(24).max(24)),
    idMembers: Joi.array().items(Joi.string().min(24).max(24)),
  })
  validateQueryRequest(req, next, schema)
}

function updateCardSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string(),
    desc: Joi.string(),
    due: Joi.date(),
    dueComplete: Joi.boolean(),
    idList: Joi.string().min(24).max(24),
    idComments: Joi.array().items(Joi.string().min(24).max(24)),
    idMembers: Joi.array().items(Joi.string().min(24).max(24)),
  })
  validateQueryRequest(req, next, schema)
}

function addCommentToCard(req, res, next) {
  const schema = Joi.object({
    text: Joi.string().required(),
  })
  validateQueryRequest(req, next, schema)
}

function removeMemberFromCardSchema(req, res, next) {
  const schema = Joi.object({
    id: Joi.string().min(24).max(24).required(),
    idMember: Joi.string().min(24).max(24).required(),
  })
  validateParamsRequest(req, next, schema)
}

function removeCommentFromCardSchema(req, res, next) {
  const schema = Joi.object({
    id: Joi.string().min(24).max(24).required(),
    idAction: Joi.string().min(24).max(24).required(),
  })
  validateParamsRequest(req, next, schema)
}

function createMemberSchema(req, res, next) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
  validateBodyRequest(req, next, schema)
}

function loginMember(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
  validateQueryRequest(req, next, schema)
}

function updateMemberSchema(req, res, next) {
  const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
  })
  validateQueryRequest(req, next, schema)
}

module.exports = {
  createBoardSchema,
  idSchema,
  createListSchema,
  updateListSchema,
  idSchemaQuery,
  moveAllCards,
  createCardSchema,
  updateCardSchema,
  addCommentToCard,
  removeMemberFromCardSchema,
  removeCommentFromCardSchema,
  createMemberSchema,
  loginMember,
  updateMemberSchema,
}
