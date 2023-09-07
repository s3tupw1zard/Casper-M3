import React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('react-post');
const root = createRoot(container);

root.render(
	<div>
		Post
	</div>
);

export const Post = () => (
	null
);
