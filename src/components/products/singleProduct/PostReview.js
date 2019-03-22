import React, { Component } from 'react'

 class PostReview extends Component {
   state = {
     review: "", 
     raiting: "1"
   }

  render() {
    let options = [];
    for(let i = 5; i >= 1; i--){
      options = [(<option value={i}>{i}</option>), ...options];
    }
    return (
      <div>
        <form>
          <select style={{display: "block"}} name="raiting">
            { options }
          </select>
          <textarea name="review" value={this.state.review}></textarea>
        </form>
      </div>
    )
  }
}

export default PostReview;
