const GroupModel = require('../models/group.js')

const Group = class Group {
  constructor (app, connect, config) {
    this.app = app
    this.GroupModel = connect.model('Group', GroupModel)

    this.run()
  }

  showGroup() {
    this.app.get('/groups/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Bad Request : Please use a id in the query string parameter'
          })

          return;
        }

        this.GroupModel.findById(req.params.id).then((group) => {
          res.status(200).json(group || {})
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          })
        })
      } catch (err) {
        console.error(`[ERROR] get:groups/:id -> ${err}`)

        res.status(500).json({
          status: 500,
          message: 'Internal Server Error'
        })
      }
    })
  }

  deleteGroup() {
    this.app.delete('/groups/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Bad Request : Please use a id in the query string parameter'
          })

          return;
        }

        this.GroupModel.findOneAndDelete(req.params.id).then((group) => {
          res.status(200).json(group || {})
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          })
        })
      } catch (err) {
        console.error(`[ERROR] delete:groups/:id -> ${err}`)

        res.status(500).json({
          status: 500,
          message: 'Internal Server Error'
        })
      }
    })
  }
  updateGroup() {
    this.app.put('/groups/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Bad Request : Please use a id in the query string parameter'
          })

          return;
        }

        const options = { new: true, runValidators: true };

        this.GroupModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          options
        ).then((groupUpdated) => {
          res.status(200).json(groupUpdated || {})
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          })
        })
      } catch (err) {
        console.error(`[ERROR] delete:groups/:id -> ${err}`)

        res.status(500).json({
          status: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }
  createGroup() {
    this.app.post('/groups/', (req, res) => {
      try {
        const groupModel = new this.GroupModel(req.body)

        groupModel.save().then((group) => {
          res.status(200).json(group || {})
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          })
        })
      } catch (err) {
        console.error(`[ERROR] post:groups/ -> ${err}`)

        res.status(500).json({
          status: 500,
          message: 'Internal Server Error'
        });
      }
    });
  }
  run () {   this.showGroup();
    this.deleteGroup();
    this.updateGroup();
    this.createGroup(); 
  }
}

module.exports = Group
