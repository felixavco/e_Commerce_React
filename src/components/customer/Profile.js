import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfile, getShipRegs } from '../../redux/actions/customerActions';
//Components 
import BasicInfo from './BasicInfo';
import Address from './Address';
import Spinner from '../commons/Spinner';

class Profile extends Component {
	state = {
    isLoading: true,
    profile: {}, 
    shipping_regions: []
  };
  
  componentWillReceiveProps(nextProps){
    if(nextProps.profile !== null){
      this.setState({ 
        profile: nextProps.profile,
        shipping_regions: nextProps.regions,
        isLoading: false 
      });
    }
  }

	componentWillMount() {
    this.props.getProfile();
    this.props.getShipRegs();
  }
  
	render() {
    const { isLoading, profile, shipping_regions } = this.state;
    let content;

    if(isLoading) {
      content = (
        <div style={{ padding: '8rem' }}>
          <Spinner size="big" />
          <h5 className="center-align">Loading Profile...</h5>
        </div>
      )
    } else {
      content = (
        <div className="row">
          <div className="col s12 l6">
            <BasicInfo profile={profile}/>
          </div>
          <div className="col s12 l6">
            <Address shipping_regions={shipping_regions} profile={profile} />
          </div>
        </div>
      )
    }
		return (
			<div className="my-profile container">
				<h3 className="center-align">My Profile</h3>
        { content }
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
  profile: state.customer.profile, 
  regions: state.customer.regions
});

export default connect(mapStateToProps, { getProfile, getShipRegs })(Profile);
