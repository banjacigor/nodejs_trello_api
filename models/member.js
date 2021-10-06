const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const memberSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid.")
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (validator.contains(value, "password", { ignoreCase: true })) {
          throw new Error('Password cannot contain the word "password".')
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

memberSchema.methods.toJSON = function () {
  const member = this
  const memberObject = member.toObject()

  delete memberObject.password
  delete memberObject.tokens

  return memberObject
}

memberSchema.methods.generateAuthToken = async function () {
  const member = this
  const token = jwt.sign({ _id: member.id.toString() }, process.env.SECRET_KEY)

  member.tokens = member.tokens.concat({ token })
  await member.save()

  return token
}

memberSchema.statics.findByCredentials = async (email, password) => {
  const member = await Member.findOne({ email })

  if (!member) {
    throw new Error("Unable to login.")
  }

  const isMatch = await bcrypt.compare(password, member.password)

  if (!isMatch) {
    throw new Error("Unable to login")
  }

  return member
}

memberSchema.pre("save", async function (next) {
  const member = this

  if (member.isModified("password")) {
    member.password = await bcrypt.hash(member.password, 8)
  }

  next()
})

const Member = mongoose.model("Member", memberSchema)

module.exports = Member
