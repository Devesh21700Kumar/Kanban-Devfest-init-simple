import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Comments = () => {
	const { category, id } = useParams();
	const [comment, setComment] = useState("");
	const [commentList, setCommentList] = useState([]);

	const addComment = (e) => {
		e.preventDefault();
		setComment("");
	};

	return (
		<div className='comments__container'>
			<form className='comment__form' onSubmit={addComment}>
				<label htmlFor='comment'>Add a comment</label>
				<textarea
					placeholder='Type your comment...'
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					rows={5}
					id='comment'
					name='comment'
					required
				></textarea>
				<button className='commentBtn'>ADD COMMENT</button>
			</form>
			<div className='comments__section'>
				<h2>Existing Comments</h2>
				{commentList.map((comment) => (
					<div key={comment.id}>
						<p>
							<span style={{ fontWeight: "bold" }}>{comment.text} </span>by{" "}
							{comment.name}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Comments;