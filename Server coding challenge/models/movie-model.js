const mongoose = require("mongoose");

const moviesSchema = mongoose.Schema({
	movie_ID: {
		type: Number,
		unique: true,
		required: true,
	},
	movie_title: {
		type: String,
		required: true,
	},
	year: {
		type: Number,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	actors: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "actors",
			required: true,
		},
	],
});

const moviesCollection = mongoose.model("movies", moviesSchema);

const Movies = {
	createMovie: function (newMovie) {
		return moviesCollection
			.create(newMovie)
			.then((createdMovie) => {
				return createdMovie;
			})
			.catch((err) => {
				throw new Error(err);
			});
	},
	getMovieByID: function (movieId) {
		return moviesCollection
			.findOne({ movie_ID: movieId })
			.then((movie) => {
				return movie;
			})
			.catch((err) => {
				throw new Error(err);
			});
	},
	removeActorFromMovieList: function (movieId, actorId) {
		return moviesCollection
			.findOneAndUpdate({ movie_ID: movieId }, { $pull: { actors: actorId } })
			.then(() => {
				return moviesCollection
					.findOne({ movie_ID: movieId })
					.populate({ path: "actors", select: "firstName lastName actor_ID" });
			})
			.then((movie) => {
				return movie;
			})
			.catch((err) => {
				throw new Error(err);
			});
	},
};

module.exports = {
	Movies,
};
