import React from 'react';
import './index.css';

class ListItem extends React.Component {

    render() {
      const isCompleted = this.props.completed;
      if (isCompleted) {
         return (<li key={this.props.itemId}><s>{this.props.text}</s>
          <input type="checkbox" checked={isCompleted} onChange={() => {this.props.onChange(this.props.itemId)}} />
          <input type="submit" onClick={()=>this.props.onDelete(this.props.itemId)} value="Delete Item" />
         </li>);
      }
      return (<li key={this.props.itemId}>{this.props.text} <input type="checkbox" checked={isCompleted} onChange={() => {this.props.onChange(this.props.itemId)}} /><input type="submit" onClick={()=>this.props.onDelete(this.props.itemId)} value="Delete Item" /></li>);
    }
  }

  export default ListItem;