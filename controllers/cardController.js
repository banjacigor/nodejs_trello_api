const Card = require("../models/card")
const Comment = require("../models/comment")
const mongoose = require("mongoose")

module.exports.create_card = async (req, res) => {
  const card = new Card(req.query)

  try {
    await card.save()
    res.status(201).send(card)
  } catch (e) {
    res.status(400).send(e)
  }
}

module.exports.get_card = async (req, res) => {
  const _id = req.params.id
  const obj = mongoose.Types.ObjectId(_id)
  const { members = false } = req.query
  let agg

  if (members) {
    agg = [
      {
        $match: { _id: obj },
      },
      {
        $lookup: {
          from: "members",
          localField: "idMembers",
          foreignField: "_id",
          as: "members",
        },
      },
    ]
  } else {
    agg = [
      {
        $match: { _id: obj },
      },
    ]
  }

  try {
    const card = await Card.aggregate(agg)
    if (!card) {
      return res.status(404).send
    }
    return res.status(200).send(card[0])
  } catch {
    return res.status(500).send()
  }
}

module.exports.update_card = async (req, res) => {
  const _id = req.params.id
  const updates = Object.keys(req.query)
  const idComments = req.query.idComments
  const idMembers = req.query.idMembers
  const allowedUpdates = [
    "name",
    "desc",
    "due",
    "dueComplete",
    "idComments",
    "idMembers",
  ]
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates." })
  }

  try {
    const card = await Card.findById({ _id })
    if (!card) {
      res.status(404).send()
    }
    updates.forEach((update) => {
      card[update] = req.query[update]
    })

    await card.save()
    return res.status(200).send(card)
  } catch (e) {
    res.status(500).send()
  }
}

module.exports.add_comment = async (req, res) => {
  const _id = req.params.id
  let text = req.query.text
  if (!text) {
    return res.status(400).send()
  }
  try {
    const card = await Card.findById(_id)

    if (!card) {
      return res.status(404).send()
    }
    const comment = new Comment({ text })
    card.idComments.push(comment._id)
    await comment.save()
    await card.save()
    return res.status(200).send(card)
  } catch (e) {
    return res.status(500).send()
  }
}

module.exports.add_member = async (req, res) => {
  const idMember = req.query.value
  const _id = req.params.id
  if (!idMember) {
    return res.status(422).send()
  }

  try {
    const card = await Card.findById(_id)
    if (!card) {
      return res.status(404).send()
    }
    if (card.idMembers.includes(idMember)) {
      return res.status(304).send()
    }
    card.idMembers.push(idMember)
    await card.save()
    return res.status(200).send(card)
  } catch (e) {
    return res.status(500).send()
  }
}

module.exports.delete_comment = async (req, res) => {
  const _id = req.params.id
  const idAction = req.params.idAction

  try {
    const card = await Card.findById(_id)
    card.idComments = card.idComments.filter((el) => el.toString() !== idAction)
    await card.save()
    await Comment.deleteOne({ _id: idAction })
    return res.status(200).send(card)
  } catch (e) {
    return res.status(500).send()
  }
}

module.exports.delete_member = async (req, res) => {
  const _id = req.params.id
  const idMember = req.params.idMember

  try {
    const card = await Card.findById(_id)
    card.idMembers = card.idMembers.filter((el) => el.toString() !== idMember)
    await card.save()
    return res.status(200).send(card)
  } catch (e) {
    return res.status(500).send()
  }
}

module.exports.delete_card = async (req, res) => {
  const _id = req.params.id

  try {
    const card = await Card.findById(_id)
    if (!card) {
      return res.status(404).send()
    }
    await card.remove()

    return res.status(200).send()
  } catch (e) {
    return res.status(500).send()
  }
}
