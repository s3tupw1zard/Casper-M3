import React, { Component } from 'react';
import '@sass/components/ThemeSwitcher.scss';

import { Idb } from '@utils/Idb';

interface ThemeSwitcherProps { }

interface ThemeSwitcherState {
	themeMode: 'light' | 'dark';
	isDarkMode: boolean;
	prefersDarkSchemeFromIdb: "dark" | "light";
	idb: Idb;
}

class ThemeSwitcher extends Component<ThemeSwitcherProps, ThemeSwitcherState> {
	constructor(props: ThemeSwitcherProps) {
		super(props);
		this.state = {
			themeMode: 'light',
			isDarkMode: false,
			prefersDarkSchemeFromIdb: 'light',
			idb: new Idb()
		};

		this.state.idb.connectToIDB();
		this.setState({ isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches });

		this.readSetThemeFromIdb()
	}

	async readSetThemeFromIdb() {
		this.setState({ prefersDarkSchemeFromIdb: await this.state.idb.getData("Material You", "preferredColorScheme") });

		if (this.state.prefersDarkSchemeFromIdb) {
			this.setState({ themeMode: this.state.prefersDarkSchemeFromIdb });
			this.setThemeMode(this.state.themeMode);
		} else if (this.state.isDarkMode && !this.state.prefersDarkSchemeFromIdb) {
			this.setThemeMode("dark");
		} else {
			this.setThemeMode("light");
		}
	}

	toggleThemeMode = () => {
		if (this.state.themeMode === "light") {
			this.setThemeMode("dark");
		} else {
			this.setThemeMode("light");
		}
	};

	setThemeMode(mode: "light" | "dark") {
		switch (mode) {
			case "light":
				document.body.classList.toggle("dark-theme", false);
				document.body.classList.toggle("light-theme", true);
				this.setState({ themeMode: "light" });
				break;
			case "dark":
				document.body.classList.toggle("dark-theme", true);
				document.body.classList.toggle("light-theme", false);
				this.setState({ themeMode: "dark" });
				break;
			default:
				console.error("Invalid theme");
		}

		// this.accent.setThemeMode(this.themeMode);

		this.state.idb.writeToTheme("Material You", {
			preferredColorScheme: this.state.themeMode,
		});
	}

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
