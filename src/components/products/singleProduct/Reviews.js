import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import StarRatings from 'react-star-ratings';

class Reviews extends Component {
	shouldComponentUpdate = (nextProps) => {
		return nextProps.productReviews !== this.props.productReviews;
	};

	render() {
		const { productReviews } = this.props;
		const reviews = productReviews.map((review, i) => (
			<div key={i} className="review-cont">
				<h6>
					<strong>{review.name}</strong>
				</h6>
				<p>{review.review}</p>

				<div className="date">
					<StarRatings
						rating={review.rating}
						starRatedColor="#F62F5E"
						numberOfStars={5}
						name="rating"
						starDimension="20px"
						starSpacing="1px"
						starHoverColor="#F62F5E"
					/>

					<small>{moment(review.created_on).format('MMMM Do, YYYY')}</small>
				</div>
			</div>
		));

		return (
			<div>
				<h5>Reviews</h5>
				{reviews.length > 0 ? reviews : "There are no reviews for this product"}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	productReviews: state.products.productReviews
});

export default connect(mapStateToProps, null)(Reviews);
