import React, { Component } from 'react';
import { AccentUtil } from '@utils/Accent';

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {
		const accentUtil = new AccentUtil();
		const articleImage = document.querySelector('.article-image');

		if (articleImage) {
			const result = await accentUtil.setM3ColorAndTarget(
				null,
				document.body,
				"article-image"
			);
			accentUtil.setThemeRawColorData(result);
			accentUtil.setMetaTagColor();
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
