import React, { Component } from 'react';
import { AccentUtil } from '@utils/Accent';

class Post extends Component {
	constructor(props: {} | Readonly<{}>) {
		super(props);
		this.state = {};
	}

	async componentDidMount(): Promise<void> {
		// const accentUtil = new AccentUtil();
		// const articleImage = document.querySelector('.article-image');

		// if (articleImage) {
		// 	await accentUtil.setThemeFromM3(
		// 		articleImage
		// 	);
		// }
	}

	render(): React.ReactNode {
		return (
			null
		);
	}
}

export default Post;
