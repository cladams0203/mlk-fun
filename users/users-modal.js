const knex = require('knex')
const knexConfig = require('../knexfile')
const dataBase = knex(knexConfig.development)

module.exports = {
    // names of datatbase functions
    find,
    insert,
    update,
    remove,
    findByUsername,
    findById
}

function find() {
    return dataBase('users')
}

function insert(user) {
    return dataBase('users').insert(user)
}

function update(id, changes) {
    return dataBase('users')
     .where({id : id})
     .update(changes)   
}

function remove(id) {
    return dataBase('users')
        .where({id : id})
        .del()
}

function findByUsername(username) {
    return dataBase('users').where({username}).first()
}

function findById(id) {
    return dataBase('users')
        .where({ id })
        .first()
}