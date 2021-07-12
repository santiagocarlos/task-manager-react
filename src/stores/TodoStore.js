import React from 'react';
import { observable, action, computed, configure, runInAction } from 'mobx';
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'; //modify for integrate Laravel API
configure({enforceActions: true});

class TodoStore {
  @observable todoInput = React.createRef();
  @observable filter = 'all';
  @observable beforeEditCache = '';
  @observable todos = [];

  @action retrieveTodos = () => {
    axios.get('/tasks')
      .then(response => {
        let tempTodos = response.data;

        runInAction(() => {
          this.todos = tempTodos.data.map(todo => ({...todo, editing: todo.editing = false}));
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  @action getTodosByName = () => {
    const todoInput = this.todoInput.current.value;
      if (todoInput.trim().length === 0) {
        return;
      }
      axios.post('tasks/search', {
        title: todoInput,
      })
        .then(response => {
          console.log(response.data);
          const { data: {data} } = response;
          runInAction(() => {
            this.todos = data;
          });
        })
        .catch(error => {
          console.log(error);
        });

      this.todoInput.current.value = '';
  }

  @action addTodo = event => {
    if (event.key === 'Enter') {
      const todoInput = this.todoInput.current.value;

      if (todoInput.trim().length === 0) {
        return;
      }

      axios.post('/tasks', {
        title: todoInput,
        completed: false,
      })
        .then(response => {
          const { data: {data} } = response;
          runInAction(() => {
            this.todos.push({
              id: data.id,
              title: data.title,
              completed: false,
              editing: false,
            });
          });
        })
        .catch(error => {
          console.log(error);
        });

      this.todoInput.current.value = '';
    }
  }

  @action deleteTodo = id => {
    axios.delete('/tasks/' + id)
      .then(response => {
        runInAction(() => {
          const index = this.todos.findIndex(item => item.id === id);
          this.todos.splice(index, 1);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  @action checkTodo = (todo, event) => {
    axios.patch('/tasks/' + todo.id, {
      title: todo.title,
      completed: !todo.completed,
    })
      .then(response => {
        runInAction(() => {
          todo.completed = !todo.completed;
          const index = this.todos.findIndex(item => item.id === todo.id);
          this.todos.splice(index, 1, todo);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  @action editTodo = (todo, event) => {
    todo.editing = true;
    this.beforeEditCache = todo.title;

    const index = this.todos.findIndex(item => item.id === todo.id);

    this.todos.splice(index, 1, todo);
  }

  @action doneEdit = (todo, event) => {
    todo.editing = false;

    if (event.target.value.trim().length === 0) {
      todo.title = this.beforeEditCache;
    } else {
      todo.title = event.target.value;
    }

    axios.patch('/tasks/' + todo.id, {
      title: todo.title,
      completed: todo.completed,
    })
      .then(response => {
        runInAction(() => {
          const index = this.todos.findIndex(item => item.id === todo.id);
          this.todos.splice(index, 1, todo);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  @action cancelEdit = (todo, event) => {
    todo.title = this.beforeEditCache;
    todo.editing = false;

    const index = this.todos.findIndex(item => item.id === todo.id);

    this.todos.splice(index, 1, todo);
  }

  @action checkAllTodos = (event) => {
    this.todos.forEach(todo => todo.completed = event.target.checked);
    event.persist();

    axios.patch('/tasks/checkAll', {
      completed: event.target.checked,
    })
      .then(response => {
        runInAction(() => {
          this.todos.forEach(todo => todo.completed = event.target.checked);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  @action updateFilter = filter => {
    this.filter = filter;
  }

  @computed get todosCompletedCount() {
    return this.todos.filter(todo => todo.completed).length;
  }

  @computed get todosFiltered() {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }

    return this.todos;
  }

  @computed get remaining() {
    return this.todos.filter(todo => !todo.completed).length;
  }

  @computed get anyRemaining() {
    return this.remaining !== 0;
  }
}

const store = new TodoStore();
export default store;
