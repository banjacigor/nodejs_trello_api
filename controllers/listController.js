const { query } = require("express")
const mongoose = require("mongoose")
const List = require("../models/list")
const Card = require("../models/card")

module.exports.create_list = async (req, res) => {
  const list = new List(req.query)

  try {
    await list.save()
    return res.status(201).send(list)
  } catch (e) {
    return res.status(500).send()
  }
}

module.exports.get_list = async (req, res) => {
  const _id = req.params.id

  try {
    const list = await List.findById(_id)

    if (!list) {
      return res.status(404).send()
    }

    return res.status(200).send(list)
  } catch (e) {
    return res.status(500).send()
  }
}

module.exports.update_list = async (req, res) => {
  const _id = req.params.id
  const updates = Object.keys(req.query)

  try {
    const list = await List.findById(_id)
    if (!list) {
      return res.status(404).send()
    }

    updates.forEach((update) => (list[update] = req.query[update]))

    await list.save()
    return res.status(200).send(list)
  } catch (e) {
    return res.status(500).send(e)
  }
}

module.exports.get_cards = async (req, res) => {
  const _id = req.params.id
  const obj = mongoose.Types.ObjectId(_id)
  try {
    const list = await List.aggregate([
      {
        $match: { _id: obj },
      },
      {
        $lookup: {
          from: "cards",
          localField: "_id",
          foreignField: "idList",
          as: "cards",
        },
      },
    ])
    if (typeof list !== undefined && list.length === 0) {
      return res.status(404).send()
    }

    return res.status(200).send(list[0].cards)
  } catch (e) {
    return res.status(500).send()
  }
}

module.exports.get_board_for_list = async (req, res) => {
  const _id = req.params.id
  const obj = mongoose.Types.ObjectId(_id)

  try {
    const list = await List.aggregate([
      {
        $match: { _id: obj },
      },
      {
        $lookup: {
          from: "boards",
          localField: "idBoard",
          foreignField: "_id",
          as: "boards",
        },
      },
    ])
    if (typeof list !== undefined && list.length === 0) {
      return res.status(404).send()
    }
    return res.status(200).send(list[0].boards[0])
  } catch (e) {
    return res.status(500).send()
  }
}

module.exports.move_list_to_board = async (req, res) => {
  const idBoard = req.query.value
  const _id = req.params.id
  if (!idBoard) {
    return res.status(422).send()
  }

  try {
    const list = await List.findById(_id)
    if (!list) {
      return res.status(404).send()
    }

    list.idBoard = idBoard
    await list.save()

    return res.status(200).send(list)
  } catch (e) {
    return res.status(500).send()
  }
}

module.exports.move_all_cards = async (req, res) => {
  const _id = req.params.id
  const idBoard = req.query.idBoard
  const idList = req.query.idList

  if (!idBoard || !idList) {
    return res.status(422).send()
  }

  try {
    await Card.updateMany(
      { idList: _id },
      {
        $set: {
          idList,
        },
      }
    )

    await List.updateOne(
      {
        _id: idList,
      },
      {
        $set: {
          idBoard,
        },
      }
    )
    res.status(200).send()
  } catch (e) {
    res.status(500).send()
  }
}
