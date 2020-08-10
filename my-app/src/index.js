import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { v4 as uuidv4 } from 'uuid';

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
  
  class App extends React.Component {

    constructor(props) {
      super(props);
      fetch("http://localhost:8000/items")
        .then(response => response.json())
        .then(body => {
          this.setState({
            TodoItems : body
          });
        });

      this.state = {
        TodoItems : []
      };
    }

    handleSubmit(text) {
      const todoItems = this.state.TodoItems;
      let item = {
        text : text,
        itemId : uuidv4(),
        completed : false
      };
      this.setState({
        TodoItems : todoItems.concat([item])
      });

      fetch("http://localhost:8000/items", {
        method : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      })
      .then(resp => resp.json())
        .then(body => {
          // alert('An item was inserted: ' + body.itemId);
        });
    }

    handleCheckboxChange(id) {
      const todoItems = this.state.TodoItems.slice(0, this.state.TodoItems.length)
      let completed = false;
      for (let i = 0; i < todoItems.length; i++ ){
        if (todoItems[i].itemId === id) {
          todoItems[i].completed = !todoItems[i].completed;
          completed = todoItems[i].completed;
          break;
        }
      }
      this.setState({
        TodoItems : todoItems
      });

      fetch(`http://localhost:8000/items/${id}`, {
        method : "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ itemId : id, completed : completed})
      }).then(resp => resp.json())
        .then(body => {
        //alert('An item was updated: ' + body.itemId);
      });
    }

    handleDeleteItem(id) {
      const items = this.state.TodoItems;
      const newItems = items.filter((item) =>{
          if (item.itemId !== id) {
            return true;
          }
          return false;
      });

      this.setState({
        TodoItems : newItems
      });

      fetch(`http://localhost:8000/items/${id}`, {
        method : "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      }).then(resp => resp.json())
        .then(body => {
        //alert('An item was deleted: ' + body.itemId);
      });

    }

    render() {
      const todoItems = this.state.TodoItems;
      const todoListItems = todoItems.map((item)=>{
        return (
            <ListItem onChange={(id) => this.handleCheckboxChange(id)} onDelete={(id)=>this.handleDeleteItem(id)} itemId={item.itemId} completed={item.completed} text={item.text}></ListItem>
        );
      });

      return (
        <div>
          <div>
            <h1>Todo App</h1>
          </div>
          <div name="todoItemsBlk">
            <ul name="todoItemsList">
              {todoListItems}
            </ul>
            <AddItem onSubmit={(text) => this.handleSubmit(text)} />
          </div>
        </div>
      );
    }
  }

  // ========================================
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
  
