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

import PostController from './app/controllers/blog/PostController'
import CommentController from './app/controllers/blog/CommentController'

import BannerController from './app/controllers/layout/BannerController'
import ProjectController from './app/controllers/layout/ProjectController'
import TestimonialController from './app/controllers/layout/TestimonialController'

import auth from './app/middlewares/auth'

const routes = new Router()
const upload = multer(multerConfig)

routes.get('/', (req, res) => res.json({ message: 'Api Running' }))

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)
routes.get('/products', ProductController.index)
routes.get('/banners', BannerController.index)
routes.get('/banners/:id', BannerController.show)
routes.get('/testimonials', TestimonialController.index)
routes.get('/testimonials/:id', TestimonialController.show)
routes.get('/projects', ProjectController.index)
routes.get('/projects/:id', ProjectController.show)
routes.get('/categories', CategoryController.index)
routes.get('/providers', ProviderController.index)
routes.get('/posts', PostController.index)
routes.put('/comments', CommentController.update)

routes.use(auth)

// routes of users

routes.put('/users', UserController.update)
routes.get('/admins', AdminController.index)

// routes of layout

routes.post('/banners', BannerController.store)
routes.post('/testimonials', TestimonialController.store)
routes.post('/projects', ProjectController.store)

// routes of store

routes.post('/categories', CategoryController.store)
routes.put('/categories', CategoryController.update)

routes.post('/providers', ProviderController.store)
routes.put('/providers', ProviderController.update)

routes.post('/products', ProductController.store)

// routes of blog

routes.post('/posts', PostController.store)
routes.put('/posts', PostController.update)

routes.post('/comments', CommentController.store)
routes.get('/comments/:id', CommentController.index)

// route if files

routes.post('/files', upload.single('file'), FileController.store)
routes.get('/files', FileController.index)
routes.get('/files/:id', FileController.show)

export default routes