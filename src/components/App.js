import React, { Component } from 'react';
import '../App.css';
import TodosRemaining from './TodosRemaining';
import TodoItem from './TodoItem';
import TodosCheckAll from './TodosCheckAll';
import TodosFiltered from './TodosFiltered';
import { inject, observer } from 'mobx-react';

@inject('TodoStore')
@observer
class App extends Component {
  render() {
    const TodoStore = this.props.TodoStore;

    const todosFiltered = TodoStore.todosFiltered;
    const todosCompletedCount = TodoStore.todosCompletedCount; 
    
    return (
      <div className="App">
        
        <div className="Todo-container">
          <input type="text" className="todo-input" placeholder="What needs to be done" ref={TodoStore.todoInput} onKeyUp={TodoStore.addTodo} />
          <button onClick={TodoStore.getTodosByName}>Serch By Name</button>
          <button onClick={TodoStore.retrieveTodos}>Clean</button>
          
          <div className="extra-container">
            <TodosFiltered />
          </div>
          <div className="extra-container">
            <TodosCheckAll />
            <TodosRemaining />
          </div>
          {todosFiltered.length !== 0 && todosFiltered.map((todo) =>
            <TodoItem key={todo.id} todo={todo} />
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.TodoStore.retrieveTodos();
  }
}

export default App;
