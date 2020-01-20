const router = require('express').Router()
const db = require('./users-modal')

router.get('/', (req,res) => {
    db.find()
        .then(user => {
            const users = user.map(item => {
                return {
                    username: item.username,
                    id: item.id, 
                    role: item.role
                }
            })
            // const {username, id, role} = user[0]
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'could not find users'})
        })
})

router.post('/', validateUser, (req,res) => {
    db.insert(req.body)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'unable to add user'})
        })
})

router.put('/:id', validateUserId, (req, res) => {
    db.update(req.user, req.body)
        .then(user => {
            res.status(203).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'unable to edit user'})
        })
})

router.delete('/:id',validateUserId,(req,res) => {
    db.remove(req.user)
        .then(user => {
            res.status(203).json({message: 'user succesfully deleted', deleted_records: `${user}`})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'could not delete user'})
        })
})

function validateUser(req, res, next) {
    const username = req.body.username
    if(!username) {
        res.status(403).json({message: 'please provide a username'})
    }else{
        db.findByUsername(username)
            .then(user => {
                if(user) {
                    res.status(404).json({message: 'username already exists'})
                }else{
                    next()
                }
               
            })        
    }
    
}
function validateUserId(req, res, next) {
    // do your magic!
    db.findById(req.params.id)
      .then(user => {
        if(user) {
          req.user = user.id
          next()
        }else{
          res.status(400).json({message: "invalid user id" })
        }
        
      })
  }

module.exports = router