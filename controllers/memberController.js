const Member = require("../models/member")

module.exports.create_member = async (req, res) => {
  const member = new Member(req.body)

  try {
    await member.save()
    const token = await member.generateAuthToken()
    return res.status(201).send({ member, token })
  } catch (e) {
    res.status(400).send(e)
  }
}

module.exports.login_member = async (req, res) => {
  try {
    const member = await Member.findByCredentials(
      req.query.email,
      req.query.password
    )

    const token = await member.generateAuthToken()
    return res.send({ member, token })
  } catch (e) {
    res.status(400).send()
  }
}

module.exports.logout_member = async (req, res) => {
  try {
    req.member.tokens = req.member.tokens.filter((token) => {
      token.token != req.token
    })
    await req.member.save()
    return res.status(200).send()
  } catch (e) {
    return res.status(500).send()
  }
}

module.exports.get_member = async (req, res) => {
  const _id = req.params.id
  try {
    const member = await Member.findById({ _id })

    if (!member) {
      return res.status(404).send()
    }

    res.status(200).send(member)
  } catch (e) {
    res.status(500).send()
  }
}

module.exports.update_member = async (req, res) => {
  const _id = req.params.id
  const updates = Object.keys(req.query)
  const allowedUpdates = ["firstName", "lastName", "email", "password"]
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates." })
  }

  try {
    const member = await Member.findById({ _id })

    if (!member) {
      res.status(404).send()
    }

    updates.forEach((update) => (member[update] = req.query[update]))
    await member.save()
    res.status(200).send()
  } catch (e) {
    res.status(500).send()
  }
}

module.exports.delete_member = async (req, res) => {
  const _id = req.params.id

  try {
    const member = await Member.findById(_id)

    if (!member) {
      res.status(404).send()
    }

    await member.remove()
    res.status(200).send()
  } catch (e) {
    res.status(500).send()
  }
}
