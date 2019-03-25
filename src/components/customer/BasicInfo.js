import React, { Component } from 'react';
import PropTypes from 'prop-types'
import EditBasicInfo from './EditBasicInfo';

class  BasicInfo extends Component {

  state = {
    editMode: false
  }

  openEditMode = (e) => {
    e.preventDefault();
    this.setState({ editMode: true });
  }
  closeEditMode = () => this.setState({ editMode: false });

  render() {

    const { 
      name, 
      email, 
      credit_card,
      day_phone, 
      eve_phone, 
      mob_phone, 
    } = this.props.profile

    const { editMode } = this.state
  
    let addPhoneCont = <a onClick={this.openEditMode} href="#!">Add Phone</a>;
    let addCC = <a onClick={this.openEditMode} href="#!">Add Credit Card</a>;
    let content;

    if(editMode) {
      content = <EditBasicInfo closeEditMode={this.closeEditMode} profile={this.props.profile} />
    } else {
      content = (
        <ul>
          <li><span><i className="fas fa-user"/>&nbsp;Name: </span>{ name }</li>
          <li><span><i className="fas fa-at"/>&nbsp;Email: </span>{ email }</li>
          <li><span><i className="far fa-credit-card"/>&nbsp;Credit Card: </span>{ credit_card || addCC }</li>
          <li><span><i className="fas fa-phone-square"/>&nbsp;Phone: </span>{ day_phone || addPhoneCont }</li>
          <li><span><i className="fas fa-phone-square"/>&nbsp;Phone 2: </span>{ eve_phone || addPhoneCont }</li>
          <li><span><i className="fas fa-mobile-alt"/>&nbsp;Mobile: </span>{ mob_phone || addPhoneCont }</li>
        </ul>
      )
    }

    return (
      <div className="basic-info">
        <h5>Basic Info</h5>

        { content }
        
        <div className={`edit-btn-cont ${editMode ? "hide-btn" : ""}`}>
          <button onClick={this.openEditMode} className="btn">
            Edit
            &nbsp;
            <i className="fas fa-pencil-alt"/>
          </button>
        </div>
      </div>
    )
  }
}

BasicInfo.propTypes = {
  profile: PropTypes.object.isRequired
}

export default BasicInfo
