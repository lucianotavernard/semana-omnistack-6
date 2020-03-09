import { Router } from 'express'

import multer from 'multer'
import multerConfig from './config/multer'

import BoxController from './app/controllers/BoxController'
import FileController from './app/controllers/FileController'

const routes = Router()
const uploadFile = multer(multerConfig).single('file')

routes.post('/boxes', BoxController.store)
routes.get('/boxes/:id', BoxController.show)

routes.post('/boxes/:id/files', uploadFile, FileController.store)

export default routes
