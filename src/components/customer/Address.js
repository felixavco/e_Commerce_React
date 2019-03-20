import React, { Component, Fragment } from 'react'
import EditAddress from './EditAddress';

class Address extends Component {

  state = {
    editMode: false
  }

  openEditMode = (e) => {
    e.preventDefault();
    this.setState({ editMode: true })
  };

  closeEditMode = (e) => {
    e.preventDefault();
    this.setState({ editMode: false })
  }

  selectElm = (text) => {
    return <a onClick={this.openEditMode} href="#!">{text}</a>
  }
  
  render() {
    const { 
      address_1, 
      address_2, 
      city, 
      region, 
      postal_code, 
      country,
      shipping_region_id, 
    } = this.props.profile

    const { shipping_regions } = this.props;
    const { editMode } = this.state;
    let ship_reg = shipping_regions.filter(reg => shipping_region_id === reg.shipping_region_id)[0];

    if(ship_reg) {
      ship_reg = ship_reg.shipping_region;
    }

    let content; 
    let editBtnCont;
    
    if(address_1 === null ) {
      content = (
        <div style={{ padding: "2rem 0", cursor: "pointer" }}>
          <h6 onClick={this.openEditMode} className="center-align">
            <i className="fas fa-home"/>&nbsp;Click here to update your address information
          </h6>
        </div>
      )
    } else {
      content = (
        <Fragment>
          <li><span>Address 1:</span>{ address_1 }</li>
          <li className={address_2 === "" || null ? "hide-btn" : ""}><span>Address 2:</span>{ address_2 }</li>
          <li><span>City:</span>{ city }</li>
          <li><span>Region:</span>{ region }</li>
          <li><span>Postal Code:</span>{ postal_code }</li>
          <li><span>Country:</span>{ country }</li>
          <li><span>Shipping Region:</span>{ ship_reg === "Please Select" ? this.selectElm(ship_reg) : ship_reg}</li>
        </Fragment>
      )

      editBtnCont = (
        <div className={`edit-btn-cont ${editMode ? "hide-btn" : ""}`}>
          <button onClick={this.openEditMode} className="btn">
            Edit
            &nbsp;
            <i className="fas fa-pencil-alt" />
          </button>
        </div>
      )
    }

    if(editMode) {
      content = (
        <EditAddress 
          closeEditMode={this.closeEditMode}
          shipping_regions={this.props.shipping_regions} 
          profile={this.props.profile}
        />
      )
    }

  
    return (
      <div className="address">
        <ul>
          <h5>Address</h5>
          { content }
        </ul>
        { editBtnCont }
      </div>
    )
  }
}

export default Address
