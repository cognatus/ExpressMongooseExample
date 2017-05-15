//coleccion de usuario
var mongoose = require('mongoose');

var User = mongoose.Schema({

	_id: {type: String, required: true},
	nombre: {type: String, required: true},
	edad: {type: Number, required: true},
	telefono: {type: String, required: true},
	escuela: {type: String, required: false},
	materias: [{
				nombre: {type: String, required: true},
				semestre: {type: Number, required: true},
				califiacion: {type: Number, required: true}
	}]

});

module.exports = mongoose.model('user', User);
