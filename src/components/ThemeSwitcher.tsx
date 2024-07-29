import React, { Component } from 'react';
// import '@sass/components/ThemeSwitcher.scss';

import { Idb } from '@utils/Idb';
import { AccentUtil } from '@utils/Accent';

interface ThemeSwitcherProps { }

interface ThemeSwitcherState {
	themeMode: 'light' | 'dark';
	isDarkMode: boolean;
	prefersDarkSchemeFromIdb: "dark" | "light";
	idb: Idb;
	top: string | null;
}

class ThemeSwitcher extends Component<ThemeSwitcherProps, ThemeSwitcherState> {
	constructor(props: ThemeSwitcherProps) {
		super(props);
		this.state = {
			themeMode: 'light',
			isDarkMode: false,
			prefersDarkSchemeFromIdb: 'light',
			idb: new Idb(),
			top: null
		};

		this.state.idb.connectToIDB();
		this.setState({ isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches });

		this.readSetThemeFromIdb();
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = () => {
		const scrollTop = window.scrollY;
		const newTop = window.innerWidth <= 767 ? (scrollTop > 64 ? '32px' : undefined) : (scrollTop > 88 ? '32px' : undefined);
		this.setState({ top: newTop });
	};

	async readSetThemeFromIdb() {
		const prefersDarkSchemeFromIdb = await this.state.idb.getData("Material You", "preferredColorScheme")
		// this.setState({ prefersDarkSchemeFromIdb:  });

		if (prefersDarkSchemeFromIdb) {
			this.setThemeMode(prefersDarkSchemeFromIdb);
			this.setState({ themeMode: prefersDarkSchemeFromIdb });
		} else if (this.state.isDarkMode && !prefersDarkSchemeFromIdb) {
			this.setThemeMode("dark");
			this.setState({ themeMode: "dark" });
		} else {
			this.setThemeMode("light");
			this.setState({ themeMode: "light" });
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
				break;
			case "dark":
				document.body.classList.toggle("dark-theme", true);
				document.body.classList.toggle("light-theme", false);
				break;
			default:
				console.error("Invalid theme");
		}

		const accentUtil = new AccentUtil();
		accentUtil.setThemeMode(mode);

		this.state.idb.writeToTheme("Material You", {
			preferredColorScheme: mode,
		});

		switch (mode) {
			case "light":
				this.setState({ themeMode: "light" });
				break;
			case "dark":
				this.setState({ themeMode: "dark" });
				break;
			default:
				console.error("Invalid theme");
		}
	}

	render() {
		const { top } = this.state;
		return (
			<button
				onClick={this.toggleThemeMode}
				className="theme-switcher" 
				style={ top ? { top } : undefined }
			>
				<span className="material-symbols-rounded theme-switcher__toggle-icon">
					{this.state.themeMode === 'light' ? 'dark_mode' : 'light_mode'}
				</span>
				Toggle theme
			</button>
		);
	}
}

export default ThemeSwitcher;
