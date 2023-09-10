import React, { Component } from 'react';
import { AccentUtil } from '@utils/Accent';

class Post extends Component {
	constructor(props: {} | Readonly<{}>) {
		super(props);
		this.state = {};
	}

	async componentDidMount(): Promise<void> {
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

	render(): React.ReactNode {
		return (
			null
		);
	}
}

export default Post;
