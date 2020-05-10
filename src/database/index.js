import Sequelize from 'sequelize'

import User from '../app/models/User'
import File from '../app/models/File'

import Category from '../app/models/store/Category'
import Provider from '../app/models/store/Provider'
import Product from '../app/models/store/Product'
import ProductImage from '../app/models/store/ProductImage'

import Post from '../app/models/blog/Post'
import Comment from '../app/models/blog/Comment'

import databaseConfig from '../config/database'

const models = [User, File, Category, Provider, Product, ProductImage, Post, Comment]

class Database {
  constructor() {
    this.init()
  }

  init () {
    this.connection = new Sequelize(databaseConfig)

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))
  }
}

export default new Database()