import React from "react";
import "./App.css";
import Book from "./Book";
import BookForm from "./BookForm";

const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

const App = () => {
	const [books, setBooks] = React.useState([]);
	const [error, setError] = React.useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();

		const value = document.querySelector("#name").value;

		fetch(`${API_URL}${value}`)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.then((data) => {
				if (data.totalItems > 0) {
					setBooks(data.items);
					setError(null);
					console.log(data);
				} else {
					setError("No results found!");
					setBooks([]);
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<div className="container">
			<div className="search-form">
				<BookForm handleSubmit={handleSubmit} />
			</div>
			{error && (
				<div className="error">
					<h1>{error}</h1>
				</div>
			)}
			<div className="results-container">
				{books.map((book, i) => (
					<Book {...book} key={i} />
				))}
			</div>
		</div>
	);
};

export default App;
