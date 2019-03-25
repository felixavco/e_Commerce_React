import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { postReview, getProductReviews } from '../../../redux/actions/productsAction'
import StarRatings from 'react-star-ratings';

class PostReview extends Component {
	state = {
		review: '',
		rating: 1
  };
  
  onChange = e => {
    this.setState({
      review: e.target.value
    })
  }

	onChangeRating = (newRating) => {
		this.setState({
			rating: newRating
		});
  };
  
  formSubmit = e => {
    e.preventDefault();
    const { review,rating } = this.state;
    const data = { review,rating }
    this.props.postReview(this.props.prodId, data, this.getReviews)
    this.setState({
      review: '', 
      rating: 1
    })
  }

  getReviews = () => {
    this.props.getProductReviews(this.props.prodId)
  }

	render() {
		return (
			<div>
        <h5 className="center-align">Leave a Review</h5>
				<form onSubmit={this.formSubmit}>
					<textarea onChange={this.onChange} name="review" value={this.state.review} />

					<StarRatings
						rating={this.state.rating}
						starRatedColor="#F62F5E"
						changeRating={this.onChangeRating}
						numberOfStars={5}
						name="rating"
						starDimension="30px"
						starSpacing="5px"
						starHoverColor="#F62F5E"
					/>

					<div className="btn-cont">
						<button type="submit">Leave review</button>
					</div>
				</form>
			</div>
		);
	}
}

PostReview.propTypes = {
	postReview: PropTypes.func.isRequired,
	getProductReviews: PropTypes.func.isRequired,
	prodId: PropTypes.number,
}

export default connect(null, { postReview, getProductReviews })(PostReview);
