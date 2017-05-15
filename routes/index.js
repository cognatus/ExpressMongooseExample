var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.get('/', function(req, res, next) {
	console.log('Cookie', req.cookies.wea);
	console.log('Sesion', req.session.weonada)
	res.render('index', { title: 'Home' });
});

router.post('/galleta', function(req, res, next) {
	res.cookie("wea" , req.body.cook);
	req.session.weonada = req.body.cook;
	res.redirect('/');
});



router.get('/parametroUrl/:cosa', function(req, res, next) {
	res.render('parametroUrl', { title: req.params.cosa });
});



router.get('/altas', function(req, res, next) {
	res.render('altas', { title: 'Registra' });
});

router.post('/altas', function(req, res, next) {

	var guardaUser = new User({
					_id: req.body.email,//email
					nombre: req.body.nombre,
					edad: req.body.edad,
					telefono: req.body.telefono,
					escuela: req.body.escuela
	});

	guardaUser.save(function(err, alumno) {
		if (err){
			res.render('exito', { title: err });
		}else{
			res.render('exito', { title: 'Exito registrando!' });
		}
	});

});



router.post('/bajas', function(req, res, next) {

	User.remove({_id: req.body.email}, function(err, doc){
		if(err){
			res.send(err);
		}else{
			res.render('exito', { title: 'Pasado de verga, porque lo borras?' });
		}
	})

});

router.get('/bajas', function(req, res, next) {
	res.render('bajas', { title: 'Borra' });
});



router.get('/cambios', function(req, res, next) {
	res.render('cambios', { title: 'Cambios' });
});

router.post('/cambios', function(req, res, next) {

	//el id no se puede modificar

	User.findById(req.body.oldEmail, function (err, doc) {
		if (err) {
			res.send(err);
		} else {
			
			doc.nombre = req.body.nombre || doc.nombre;
			doc.edad = req.body.edad || doc.edad;
			doc.telefono = req.body.telefono || doc.telefono;
			doc.escuela = req.body.escuela || doc.escuela;

			doc.save(function (err, doc) {
				if (err) {
					res.send(err)
				}
				res.render('exito', { title: 'Exito modificando info!' });
			});
		}
	});



	/*User.update({_id: req.body.oldEmail},{
			$set:{

				nombre: req.body.nombre,
				edad: req.body.edad,
				telefono: req.body.telefono,
				escuela: req.body.escuela
					
			}
		}, function(err, documento){
			if(err){
				res.send(err);
			}else{
				res.render('exito', { title: 'Exito cambiando!' });
			}	
	});*/
});



router.get('/consultas', function(req, res, next) {

	var data = [];

	User.find({}, function(err, doc){
		if(err){
			res.send('Error.');
		}else{
			res.render('consultas', { title: 'Wacha', info: doc });
		}
	})
});



router.get('/addMateria', function(req, res, next) {
	res.render('addMateria', { title: 'addMateria' });
});

router.post('/addMateria', function(req, res, next) {

	User.findById(req.body.email, function (err, doc) {
		if (err) {
			res.send(err);
		} else {
			doc.materias.push({
					nombre: req.body.nombre,
					semestre: req.body.semestre,
					califiacion: req.body.califiacion
				})

			doc.save(function (err, doc) {
				if (err) {
					res.send(err)
				}
				res.render('exito', { title: 'Exito añadiendo materia!' });
			});
		}
	});

	/*User.update(
		{ _id: req.body.email },
		{ $addToSet: { 
				materias: {
					nombre: req.body.nombre,
					semestre: req.body.semestre,
					califiacion: req.body.califiacion
				} 
			} 
		}, function(err, documento){
			if(err){
				res.send(err)
			}else{
				res.render('exito', { title: 'Exito añadiendo materia!' });
			}
	});*/
});



router.get('/removeMateria', function(req, res, next) {
	res.render('removeMateria', { title: 'removeMateria' });
});

router.post('/removeMateria', function(req, res, next) {

	User.update( {_id: req.body.email}, {
		$pull: {materias: { nombre: req.body.materia}}
	},function (err, doc) {
		if (err) {
			res.send(err)
		}
			res.render('exito', { title: 'Exito borrando materia!' });
		}
	)

});



router.get('/updateMateria', function(req, res, next) {
	res.render('updateMateria', { title: 'updateMateria' });
});

router.post('/updateMateria', function(req, res, next) {

	User.update( {_id: req.body.email, "materias.nombre": req.body.materiaOld }, {
		$set: {materias: {
					nombre: req.body.nombre,
					semestre: req.body.semestre,
					califiacion: req.body.califiacion
				}
			}
	},function (err, doc) {
		if (err) {
			res.send(err)
		}
			res.render('exito', { title: 'Exito modificando materia!' });
		}
	)

});

module.exports = router;
