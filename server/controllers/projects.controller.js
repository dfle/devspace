let request = require('request-promise')
let cache = require('../cache')
let projectsController = {}

projectsController.GET_ALL_PROJECTS = (req, res) => {

}

projectsController.GET_PROJECT = (req, res) => {
  let owner = req.params.owner
  let repo = req.params.repo
  let key = owner + repo

  let options = {
    url: `https://api.github.com/repos/${owner}/${repo}/commits`,
    headers: {
      'User-Agent': 'request'
    }
  }

  function getProjectCommits (owner, repo) {
    return request.get(options)
      .then(result => {
        return result
      })
      .catch(err => {
        console.log(err)
      })
  }

  cache.get(key, (err, result) => {
    if (result) {
      res.send({ 'commits': JSON.parse(result), 'source': 'redis' })
      console.log((typeof result), 'redis')
    } else {
      getProjectCommits(key)
        .then(result => {
          console.log(result, 'result')
          cache.setexAsync(key, 60, result)
          res.send({ 'commits': JSON.parse(result), 'source': 'github' })
        })
        .catch(response => {
          if (res.status === 404) {
            res.send('Not found')
          } else {
            res.send(response)
          }
        })
    }
  })
}

projectsController.POST_PROJECT = (req, res) => {

}

projectsController.UPDATE_PROJECT = (req, res) => {

}

projectsController.DELETE_PROJECT = (req, res) => {

}

module.exports = projectsController
