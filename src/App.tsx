import React, { Component } from 'react';
import '@sass/components/App.scss';

import Post from '@components/Post';
import ThemeSwitcher from '@components/ThemeSwitcher';

class App extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount(): void {
		
	}

	render(): React.ReactNode {
		return (
			<div className="app">
				<ThemeSwitcher />
				<Post/>
			</div>
		);
	}
}

export default App;