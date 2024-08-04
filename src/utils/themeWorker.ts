import { themeFromImage } from "@material/material-color-utilities";

self.addEventListener('message', async (event) => {
	const { arrayBuffer, width, height } = event.data;
	const blob = new Blob([arrayBuffer]);
	const imageBitmap = await createImageBitmap(blob);

	// Create an OffscreenCanvas and draw the imageBitmap onto it
	const offscreenCanvas = new OffscreenCanvas(width, height);
	const ctx = offscreenCanvas.getContext('2d');
	ctx.drawImage(imageBitmap, 0, 0);

	// Convert the OffscreenCanvas to a Blob and create an object URL
	const blobURL = await offscreenCanvas.convertToBlob().then(URL.createObjectURL);

	// Send the Blob URL back to the main thread
	self.postMessage(blobURL);
});
