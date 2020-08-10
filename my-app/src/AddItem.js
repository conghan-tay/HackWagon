import React from 'react';
import './index.css';

class AddItem extends React.Component{
    constructor(props) {
      super(props);
      this.state = {text : ""};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({text: event.target.value});
    }
  
    handleSubmit(event) {
      // alert('A todo was submitted: ' + this.state.text);
      this.props.onSubmit(this.state.text);
      event.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.text} onChange={this.handleChange} 
                  name="newItemInput"/>
          <input type="submit" value="Add Item" />
        </form>
      );
    }
}

export default AddItem;