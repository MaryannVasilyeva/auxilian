import Todo from '../models/todo'

export const createTodo = (req, res) => {
  new Todo({
    text: req.body.text,
    userId: req.body.id,
    completed: false
  }).save( function (err, todo) {
    res.json(todo)
  })
}

export const getTodos = (req, res) => {
  let query = Todo.find({})
  query.where('userId', req.query.id )
  query.exec( function (err, todo) {
    res.json(todo)
  })
}
