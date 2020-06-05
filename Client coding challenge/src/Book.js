import React from "react";

function Book(props) {
	return (
		<div className="bookCard">
			<div>
				{props?.volumeInfo?.imageLinks?.thumbnail ? (
					<img
						src={props.volumeInfo.imageLinks.thumbnail}
						alt="Book Thumbnail"
					/>
				) : (
					<h3>No image found</h3>
				)}
			</div>
			{props?.volumeInfo?.title && <h1>{props.volumeInfo.title}</h1>}
			{props?.searchInfo?.textSnippet && <p>{props.searchInfo.textSnippet}</p>}
			<div>
				<ul>
					{props?.volumeInfo?.authors?.map((author, i) => (
						<li key={i}>{author}</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Book;
