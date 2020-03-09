import Box from '../models/Box'
import File from '../models/File'

export default {
  async store(req, res) {
    const box = await Box.findById(req.params.id)

    const { originalname, key } = req.file

    const file = await File.create({ title: originalname, path: key })

    box.files.push(file)

    await box.save()

    req.io.sockets.to(box._id).emit('file', file)

    return res.json(file)
  },
}
