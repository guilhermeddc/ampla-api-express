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
routes.get('/products/:id', ProductController.show)
routes.get('/categories', CategoryController.index)
routes.get('/categories/:id', CategoryController.show)
routes.get('/providers', ProviderController.index)
routes.get('/providers/:id', ProviderController.show)

routes.get('/banners', BannerController.index)
routes.get('/banners/:id', BannerController.show)
routes.get('/testimonials', TestimonialController.index)
routes.get('/testimonials/:id', TestimonialController.show)
routes.get('/projects', ProjectController.index)
routes.get('/projects/:id', ProjectController.show)

routes.get('/posts', PostController.index)
routes.get('/posts/:id', PostController.show)
routes.put('/comments/:id', CommentController.update)
routes.delete('/comments/:id', CommentController.destroy)

routes.use(auth)

// routes of users

routes.put('/users', UserController.update)
routes.get('/admins', AdminController.index)

// routes of layout

routes.post('/banners', BannerController.store)
routes.put('/banners/:id', BannerController.update)
routes.delete('/banners/:id', BannerController.destroy)
routes.post('/testimonials', TestimonialController.store)
routes.put('/testimonials/:id', TestimonialController.update)
routes.delete('/testimonials/:id', TestimonialController.destroy)
routes.post('/projects', ProjectController.store)
routes.put('/projects/:id', ProjectController.update)
routes.delete('/projects/:id', ProjectController.destroy)

// routes of store

routes.post('/categories', CategoryController.store)
routes.put('/categories/:id', CategoryController.update)
routes.delete('/categories/:id', CategoryController.destroy)

routes.post('/providers', ProviderController.store)
routes.put('/providers/:id', ProviderController.update)
routes.delete('/providers/:id', ProviderController.destroy)

routes.post('/products', ProductController.store)
routes.put('/products/:id', ProductController.update)
routes.delete('/products/:id', ProductController.destroy)

// routes of blog

routes.post('/posts', PostController.store)
routes.put('/posts/:id', PostController.update)
routes.delete('/posts/:id', PostController.destroy)

routes.post('/comments', CommentController.store)
routes.get('/comments/:id', CommentController.index)

// route if files

routes.post('/files', upload.single('file'), FileController.store)
routes.get('/files', FileController.index)
routes.get('/files/:id', FileController.show)
routes.delete('/files/:id', FileController.destroy)

export default routes