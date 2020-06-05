const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require("./config");
const errorHandler = require("./middleware/errorHandler");
const { Movies } = require("./models/movie-model");
const { Actors } = require("./models/actor-model");

const app = express();

app.patch(
	"/api/delete-movie-actor/:movie_ID",
	jsonParser,
	async (req, res, next) => {
		// Check id in req body
		const { id } = req.body;
		if (!id) {
			next({ code: 1 });
			return;
		}

		// Check id and movie_ID matches
		const { movie_ID } = req.params;
		if (String(id) !== String(movie_ID)) {
			next({ code: 2 });
			return;
		}

		// Check firstName and lastName values
		const { firstName, lastName } = req.body;
		if (!firstName || !lastName) {
			next({ code: 3 });
			return;
		}

		const movie = await Movies.getMovieByID(movie_ID);
		const actor = await Actors.getActorByName({ firstName, lastName });

		// Check movie and actor exists
		if (!movie || !actor) {
			next({ code: 4 });
			return;
		}

		const updatedMovie = await Movies.removeActorFromMovieList(
			movie_ID,
			actor._id
		);

		return res.status(201).json(updatedMovie);
	}
);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log("This server is running on port 8080");
	new Promise((resolve, reject) => {
		const settings = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		};
		mongoose.connect(DATABASE_URL, settings, (err) => {
			if (err) {
				return reject(err);
			} else {
				console.log("Database connected successfully.");
				return resolve();
			}
		});
	}).catch((err) => {
		console.log(err);
	});
});
