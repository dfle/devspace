let projectsRouter = require('express').Router()
let projectsController = require('../controllers').projectsController

projectsRouter.route('/:owner')
    .get(projectsController.GET_ALL_PROJECTS)
    .post(projectsController.POST_PROJECT)

projectsRouter.route('/:owner/:repo')
  .get(projectsController.GET_PROJECT)
  .put(projectsController.UPDATE_PROJECT)
  .delete(projectsController.DELETE_PROJECT)

module.exports = projectsRouter
