import React, { Component } from 'react';
import '@sass/components/ThemeSwitcher.scss';

interface ThemeSwitcherProps { }

interface ThemeSwitcherState {
	themeMode: 'light' | 'dark';
}

class ThemeSwitcher extends Component<ThemeSwitcherProps, ThemeSwitcherState> {
	constructor(props: ThemeSwitcherProps) {
		super(props);
		this.state = {
			themeMode: 'light',
		};
	}

	toggleThemeMode = () => {
		const newThemeMode = this.state.themeMode === 'light' ? 'dark' : 'light';
		this.setState({ themeMode: newThemeMode });
		// You can implement code to update your application's theme here
	};

	render() {
		return (
			<button onClick={this.toggleThemeMode} className="theme-switcher">
				<span className="material-symbols-rounded theme-switcher__toggle-icon">
					{this.state.themeMode === 'light' ? 'dark_mode' : 'light_mode'}
				</span>
				Toggle theme
			</button>
		);
	}
}

export default ThemeSwitcher;
