import ServerSideRender from '@wordpress/server-side-render';
import { useEffect } from '@wordpress/element';
import Splide from '@splidejs/splide';
import {
	Spinner,
} from '@wordpress/components';

import './editor.css';

const TriggerWhenLoadingFinished = props => {

	return ( {children, showLoader} ) => {
		useEffect( () => {
			// Call action when the loading component unmounts because loading is finished.
			return () => {
				const slider = document.querySelector(`#block-${props.clientId} .splide`);
				if ( slider ) {
					const splide = new Splide( slider, {
						type   : 'slide',
						perPage: 1,
						rewind : true,
					} ).mount();
				}
			};
		} );

		return (
			<div style={{position: 'relative'}}>
				{showLoader && (
					<div
						style={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							marginTop: '-9px',
							marginLeft: '-9px',
						}}
					>
						<Spinner />
					</div>
				)}
				<div style={{opacity: showLoader ? '0.3' : 1}}>
					{children}
				</div>
			</div>
		);
	};
};

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
export default function Edit( props ) {
	return (
		<div id={`block-${props.clientId}`}>
			<ServerSideRender LoadingResponsePlaceholder={TriggerWhenLoadingFinished( props )} block="pulsar/team-carousel" attributes={ props.attributes } />
		</div>
	);
}
