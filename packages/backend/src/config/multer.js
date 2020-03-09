import path from 'path'
import multer from 'multer'
import crypto from 'crypto'

export default {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, raw) => {
        if (err) cb(err)

        file.key = `${raw.toString('hex')}-${file.originalname}`
        cb(null, file.key)
      })
    },
  }),
}
