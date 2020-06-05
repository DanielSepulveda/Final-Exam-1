import React from "react";

function BookForm(props) {
	return (
		<div>
			<form onSubmit={props.handleSubmit}>
				<label htmlFor="name">Name of the book</label>
				<input type="text" id="name" name="name" required />
				<button type="submit">Search!</button>
			</form>
		</div>
	);
}

export default BookForm;
