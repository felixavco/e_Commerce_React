import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAuthModal } from '../../redux/actions/authActions';

import Login from './Login';
import Register from './Register';

class AuthModal extends Component {
	state = {
		isRegister: false,
		isModalActive: false
	};

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.modal_state !== this.props.modal_state) {
			this.openModal(nextProps.modal_state);
		}
	};

  //Close the modal if the user clicks on the X or outside of the main container
	closeModal = (e) => {
		if (e.target.className.includes('auth-modal') || e.target.className.includes('modal-cont')) {
			this.setState({ isModalActive: false });
			this.props.setAuthModal('');
		}
  };

  //Close modal after the user submits the form for login or register
  closeModal2 = () => {
    this.setState({ isModalActive: false });
    this.props.setAuthModal('');
  }
  


	openModal = (modalState) => {
		switch (modalState) {
			case 'register':
				this.setState({
					isRegister: true,
					isModalActive: true
				});
				break;

			case 'login':
				this.setState({
					isRegister: false,
					isModalActive: true
				});
				break;

			default:
				break;
		}
	};

	render() {
		const { isRegister, isModalActive } = this.state;
		let content;
		if (isRegister) {
			content = <Register closeModal={this.closeModal2} />;
		} else {
			content = <Login closeModal={this.closeModal2} />;
		}
		return (
			<div onClick={this.closeModal} className={`auth-modal ${isModalActive ? 'modal-active' : ''}`}>
				{content}
			</div>
		);
	}
}

AuthModal.propTypes = {
	modal_state: PropTypes.string,
	setAuthModal: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	modal_state: state.auth.modal_state, 
});

export default connect(mapStateToProps, { setAuthModal })(AuthModal);
