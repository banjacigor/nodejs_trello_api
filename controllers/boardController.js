const Board = require("../models/board")

module.exports.create_board = async (req, res) => {
  const board = new Board(req.query)

  try {
    await board.save()
    return res.status(201).send(board)
  } catch (e) {
    res.status(500).send()
  }
}

module.exports.get_board = async (req, res) => {
  const _id = req.params.id

  try {
    const board = await Board.findById(_id)
    if (!board) {
      return res.status(404).send()
    }
    return res.status(200).send(board)
  } catch (e) {
    return res.status(500).send()
  }
}

module.exports.delete_board = async (req, res) => {
  const _id = req.params.id

  try {
    const board = await Board.findById(_id)

    if (!board) {
      res.status(404).send()
    }

    await board.remove()
    res.status(200).send()
  } catch (e) {
    res.status(500).send()
  }
}
