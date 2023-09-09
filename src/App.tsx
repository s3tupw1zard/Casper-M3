import React, { Component } from 'react';
import { Container } from '@components/Container';
import Post from '@components/Post';

class App extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount(): void {
		
	}

	render(): React.ReactNode {
		return (
			<div className="app">
				<Post/>
			</div>
		);
	}
}

export default App;