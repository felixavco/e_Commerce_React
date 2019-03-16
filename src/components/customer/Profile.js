import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getProfile } from '../../redux/actions/customerActions';

class Profile extends Component {

  componentWillMount() {
    this.props.getProfile();
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Profile</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.customer.profile
})

export default connect(mapStateToProps, { getProfile })(Profile);
