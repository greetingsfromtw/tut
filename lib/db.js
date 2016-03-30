var mongoose = require('mongoose')

var Schema = mongoose.Schema

var todoDB= new Schema({

	content:String

})

mongoose.model('todoDB',todoDB)
mongoose.connect('mongodb://localhost/tut')

