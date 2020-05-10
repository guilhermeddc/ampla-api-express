import { Router } from 'express'
import multer from 'multer'

import multerConfig from './config/multer'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'
import AdminController from './app/controllers/AdminController'

import CategoryController from './app/controllers/store/CategoryController'
import ProviderController from './app/controllers/store/ProviderController'
import ProductController from './app/controllers/store/ProductController'
import ProductImageController from './app/controllers/store/ProductImageController'

import PostController from './app/controllers/blog/PostController'
import CommentController from './app/controllers/blog/CommentController'

import auth from './app/middlewares/auth'

const routes = new Router()
const upload = multer(multerConfig)

routes.get('/', (req, res) => res.json({ message: 'Api Running' }))

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)
routes.get('/products', ProductController.index)
routes.get('/products/:product_id/images', ProductImageController.index)

routes.use(auth)

routes.put('/users', UserController.update)
routes.get('/admins', AdminController.index)

routes.post('/categories', CategoryController.store)
routes.put('/categories', CategoryController.update)
routes.get('/categories', CategoryController.index)

routes.post('/providers', ProviderController.store)
routes.put('/providers', ProviderController.update)
routes.get('/providers', ProviderController.index)

routes.post('/products', ProductController.store)

routes.post('/products/:product_id/images', upload.single('file'), ProductImageController.store)

routes.post('/posts', PostController.store)
routes.put('/posts', PostController.update)
routes.get('/posts', PostController.index)

routes.post('/comments', CommentController.store)
routes.put('/comments', CommentController.update)
routes.get('/comments/:id', CommentController.index)

routes.post('/files', upload.single('file'), FileController.store)

export default routes