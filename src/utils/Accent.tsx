import { Theme, argbFromHex, themeFromImage, themeFromSourceColor, applyTheme } from "@material/material-color-utilities";
// import ColorThief, { RGBColor } from 'colorthief';

export class AccentUtil {
	themeMode: "light" | "dark" = "light";
	themeRawColorData: Theme | undefined;

	/**
	 * Converts ARGB color value to RGB
	 * 
	 * Reference: https://stackoverflow.com/questions/12579598/how-can-i-convert-argb-to-hex-in-javascript
	 * @param color ARGB color
	 * @returns Hex value
	 */
	argbToRgb(color: number) {
		return '#' + ('000000' + (color & 0xFFFFFF).toString(16)).slice(-6);
	}

	setThemeRawColorData(theme: Theme) {
		this.themeRawColorData = theme;
	}

	/*
	rgbToHex(rgb: RGBColor): string {
		const [r, g, b] = rgb.map((color) => Math.round(color).toString(16).padStart(2, '0'));
		return `#${r}${g}${b}`;
	}

	getColorFromImage(imgElement: HTMLImageElement): Promise<RGBColor> {
		if (imgElement.complete) {
			// If the image is already loaded, directly get the color.
			const colorThief = new ColorThief();
			const color: RGBColor = colorThief.getColor(imgElement, 100);
			return Promise.resolve(color);
		} else {
			// If the image is not loaded yet, wait for the 'onload' event to get the color.
			return new Promise((resolve, reject) => {
				imgElement.onload = () => {
					const colorThief = new ColorThief();
					const color: RGBColor = colorThief.getColor(imgElement, 100);
					resolve(color);
				};

				imgElement.onerror = () => {
					// If there is an error loading the image or getting the color, reject the promise.
					reject(new Error('Failed to load the image or get the color.'));
				};
			});
		}
	}
	*/

	setMetaTagColor() {
		const metaThemeColor = document.querySelector('meta[name="theme-color"]');

		if (metaThemeColor && this.themeRawColorData?.schemes[this.themeMode].primaryContainer) {
			metaThemeColor.setAttribute('content', this.argbToRgb(
				this.themeRawColorData?.schemes[this.themeMode].primaryContainer
			));
		}
	}

	async setThemeFromM3(parentElement: Element | HTMLElement) {
		const theme = await this.setM3ColorAndTarget(
			null,
			document.body,
			parentElement
		);
		if (theme) {
			this.themeRawColorData = theme;
			this.setThemeRawColorData(theme);
			this.setMetaTagColor();
		}
	}

	async setM3ColorAndTarget(
		parentOfImg: string | null,
		target: string | HTMLElement,
		elementClass: Element | HTMLElement | null
	) {
		let theme: Theme | null = null;
		const parentElement = document.getElementById(parentOfImg);
		// const colorThief = new ColorThief();
		const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		this.themeMode = systemDark ? 'dark' : 'light';

		if (parentElement) {
			const imgElement = parentElement.querySelector("img");
			let color = "";

			if (imgElement) {
				// color = this.rgbToHex(await this.getColorFromImage(imgElement));
				// theme = themeFromSourceColor(argbFromHex(color));
				theme = await themeFromImage(imgElement as HTMLImageElement);
			} else {
				console.error("No <img> element found within the parent element.");
				theme = themeFromSourceColor(argbFromHex("#b0b2bd"));
			}
		} else if (elementClass && elementClass !== null) {
			const imgElement = elementClass.querySelector("img");
			let color = "";

			if (imgElement) {
				imgElement.crossOrigin = "anonymous";
				// color = this.rgbToHex(await this.getColorFromImage(imgElement));
				// theme = themeFromSourceColor(argbFromHex(color));
				theme = await themeFromImage(imgElement as HTMLImageElement);
			} else {
				console.error("No <img> element found within the parent element.");
				theme = themeFromSourceColor(argbFromHex("#b0b2bd"));
			}
		} else {
			console.error("Parent element with ID '" + parentOfImg + "' not found.");
			theme = themeFromSourceColor(argbFromHex("#b0b2bd"));
		}

		if (theme) {
			applyTheme(
				theme,
				{
					target: typeof target === "string" ? document.getElementById(target) as HTMLElement : target,
					dark: this.themeMode === "light" ? false : true
				}
			);

		}

		return theme;
	}
}