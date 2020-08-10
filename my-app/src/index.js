import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { v4 as uuidv4 } from 'uuid';
import AddItem from './AddItem';
import ListItem from './ListItem';

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
        body: JSON.stringify({ completed : completed })
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
  
