import React, { Component } from 'react';

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		console.warn("Post");
	}

	// Lifecycle methods

	render() {
		return (
			<div>
				Post
			</div>
		);
	}
}

export default Post;
