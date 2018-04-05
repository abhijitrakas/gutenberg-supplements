import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;

const {
	registerBlockType
} = wp.blocks;


registerBlockType( 'rtgb/testimonial', {

	title: __( 'Testimonial' ),
	icon: 'format-status',
	category: 'layout',
	description: __( 'Display a testimonial with a picture, text, name and company' ),

	attributes: {

		image: {
			type: 'object',
			field: {
				type: 'image',
				buttonText: __( 'Upload' ),
				removeButtonText: __( 'Remove' ),
			},
		},

		content: {
			type: 'array',
			field: {
				type: 'rich-text',
				className: 'testimonial-content',
				placeholder: __( 'Write testimonial content here' ),
				tagName: 'div',
			},
			selector: '.testimonial-content',
			source: 'children',
		},

		name: {
			type: 'array',
			field: {
				type: 'rich-text',
				className: 'testimonial-name',
				placeholder: 'Name',
				tagName: 'p',
			},
			selector: '.testimonial-name',
			source: 'children',
		},

		companyName: {
			type: 'array',
			field: {
				type: 'rich-text',
				className: 'testimonial-company',
				placeholder: 'Company',
				tagName: 'p',
			},
			selector: '.testimonial-company',
			source: 'children',
		},
	},

	edit( props, middleware ) {

		const className = props.className ? props.className : '';

		return (
	    	
			<div className={ className + ' testimonial-wrapper' } >
				<div className='testimonial-image'>
					{ middleware.fields.image }
				</div>
				<div className='testimonial-details'>
					{/*<div className='testimonial-content'>*/}
						{ middleware.fields.content }
					{/*</div>*/}
					<div className='testimonial-signature'>
						{ middleware.fields.name }
						{ middleware.fields.companyName }
					</div>
				</div>
			</div>
			
		);
	},

	save( props ) {
		const {
			attributes: {
				image,
				content,
				name,
				companyName
			}
		} = props;

		const className = props.className ? props.className : '';
		let imageContent = '';

		if ( image ) {
			imageContent = (
            	<div className='testimonial-image'>
					<figure>
            			<img src={ image.url } alt={ image.title } />
					</figure>
            	</div>
			);
		}

		return(
	       	<div className={ className + ' testimonial-wrapper' } >
	       		{ imageContent }
	       		<div className='testimonial-details'>
	       			<div className='testimonial-content'>
	       				{ content }
	       			</div>
	       			<div className='testimonial-signature'>
	       				<p className="testimonial-name">{ name }</p>
	       				<p className="testimonial-company">{ companyName }</p>
	       			</div>
	       		</div>
	       	</div>
		);
	}
});
