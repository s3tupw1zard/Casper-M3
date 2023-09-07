import React, { Component } from 'react';
import { AccentUtil } from '@utils/Accent';

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const accentUtil = new AccentUtil();
		const articleImage = document.querySelector('.article-image');

		if (articleImage) {
			const result = accentUtil.setM3ColorAndTarget(
				null,
				document.body,
				"article-image"
			);
		}
	}

	// Lifecycle methods

	render() {
		return (
			null
		);
	}
}

export default Post;
