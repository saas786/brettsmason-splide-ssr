import ServerSideRender from '@wordpress/server-side-render';
import { useEffect } from '@wordpress/element';
import Splide from '@splidejs/splide';

import './editor.css';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object} param0
 * @param {Object} param0.attributes
 * @param          param0.attributes.splide
 * @param {Object} param0.clientId
 * @return {WPElement} Element to render.
 *
 *
 */
export default function Edit({ clientId, attributes: { splide } }) {
	useEffect(() => {
		const splide = new Splide(`#block-${clientId}`);
		splide.mount();
	}, []);

	return (
		<ServerSideRender block="pulsar/team-carousel" attributes={splide} />
	);
}
