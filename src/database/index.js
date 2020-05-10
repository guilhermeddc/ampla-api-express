import Sequelize from 'sequelize'

import User from '../app/models/User'
import File from '../app/models/File'

import Banner from '../app/models/layout/Banner'
import Testimonial from '../app/models/layout/Testimonial'
import Project from '../app/models/layout/Project'

import Category from '../app/models/store/Category'
import Provider from '../app/models/store/Provider'
import Product from '../app/models/store/Product'

import Post from '../app/models/blog/Post'
import Comment from '../app/models/blog/Comment'

import databaseConfig from '../config/database'

const models = [
  User, File, Banner, Testimonial, Project, Category, Provider, Product, Post, Comment
]

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