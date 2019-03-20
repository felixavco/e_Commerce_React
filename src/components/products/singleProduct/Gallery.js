import React, { Component } from 'react';
import { baseURL } from '../../../config/config';
const imgURL = baseURL + '/images/products/';

class Gallery extends Component {
	state = { url: '' };

	onSelect = (e) => this.setState({ url: e.target.src });

	render() {
		const content = this.props.images.map((img) => (
			<span>
				<img onClick={this.onSelect} src={imgURL + img} alt="img"/>
			</span>
		));
		return (
			<div className="gallery">
				<div className="img-cont">
					<img src={this.state.url || imgURL + this.props.images[0]} alt={this.props.images[0]} />
				</div>

				<hr />
        
				<div className="img-selector">{content}</div>
			</div>
		);
	}
}

export default Gallery;
