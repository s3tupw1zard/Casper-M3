import { Theme, argbFromHex, themeFromImage, themeFromSourceColor, applyTheme } from "@material/material-color-utilities";
import ColorThief, { RGBColor } from 'colorthief';

export class AccentUtil {
	themeMode = "light";
	themeRawColorData = undefined;

	/**
	 * Converts ARGB color value to RGB
	 * 
	 * Reference: https://stackoverflow.com/questions/12579598/how-can-i-convert-argb-to-hex-in-javascript
	 * @param color ARGB color
	 * @returns Hex value
	 */
	argbToRgb(color) {
		return '#' + ('000000' + (color & 0xFFFFFF).toString(16)).slice(-6);
	}

	rgbToHex(rgb) {
		const [r, g, b] = rgb.map((color) => Math.round(color).toString(16).padStart(2, '0'));
		return `#${r}${g}${b}`;
	}

	setThemeRawColorData(theme) {
		this.themeRawColorData = theme;
	}

	getColorFromImage(imgElement) {
		if (imgElement.complete) {
			// If the image is already loaded, directly get the color.
			const colorThief = new ColorThief();
			const color = colorThief.getColor(imgElement, 100);
			return Promise.resolve(color);
		} else {
			// If the image is not loaded yet, wait for the 'onload' event to get the color.
			return new Promise((resolve, reject) => {
				imgElement.onload = () => {
					const colorThief = new ColorThief();
					const color = colorThief.getColor(imgElement, 100);
					resolve(color);
				};

				imgElement.onerror = () => {
					// If there is an error loading the image or getting the color, reject the promise.
					reject(new Error('Failed to load the image or get the color.'));
				};
			});
		}
	}

	setMetaTagColor() {
		const metaThemeColor = document.querySelector('meta[name="theme-color"]');

		if (metaThemeColor) {
			metaThemeColor.setAttribute('content', this.argbToRgb(
				this.themeRawColorData?.schemes[this.themeMode].primaryContainer
			));
		}
	}

	async setThemeFromM3(element) {
		const theme = await this.setM3ColorAndTarget(
			null,
			document.body,
			"article-image"
		);
		if (theme) {
			this.themeRawColorData = theme;
		}
		this.setMetaTagColor();
	}

	async setM3ColorAndTarget(
		parentOfImg,
		target,
		elementClass
	) {
		let theme = null;
		const parentElement = document.getElementById(parentOfImg);
		const colorThief = new ColorThief();
		const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		this.themeMode = systemDark ? 'dark' : 'light';

		if (parentElement) {
			const imgElement = parentElement.querySelector("img");
			let color = "";

			if (imgElement) {
				color = this.rgbToHex(await this.getColorFromImage(imgElement));
				theme = themeFromSourceColor(argbFromHex(color));
				// theme = await themeFromImage(imgElement as HTMLImageElement);
			} else {
				console.error("No <img> element found within the parent element.");
				theme = themeFromSourceColor(argbFromHex("#0099ff"));
			}
		} else if (elementClass) {
			const imgElement = document.querySelector("." + elementClass).querySelector("img");
			let color = "";

			if (imgElement) {
				imgElement.crossOrigin = "anonymous";
				color = this.rgbToHex(await this.getColorFromImage(imgElement));
				theme = themeFromSourceColor(argbFromHex(color));
			} else {
				console.error("No <img> element found within the parent element.");
				theme = themeFromSourceColor(argbFromHex("#0099ff"));
			}
		} else {
			console.error("Parent element with ID '" + parentOfImg + "' not found.");
			theme = themeFromSourceColor(argbFromHex("#0099ff"));
		}

		if (theme) {
			applyTheme(
				theme,
				{
					target: target,
					dark: systemDark
				}
			);

		}

		return theme;
	}
}