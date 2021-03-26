import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class Main extends Component {
  state = {
    tasks: ["Pay bills", "Clean the house", "Improve graphic design"],
  };

  handleSubmit = (task) => {
    this.setState({ tasks: [...this.state.tasks, task] });
  };

  handleDelete = (index) => {
    const newArr = [...this.state.tasks];
    newArr.splice(index, 1);
    this.setState({ tasks: newArr });
  };

  render() {
    return (
      <div className="wrapper">
        <div className="card frame">
          <Header numTodos={this.state.tasks.length} />
          <TodoList tasks={this.state.tasks} onDelete={this.handleDelete} />
          <SubmitForm onFormSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

class SubmitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.term === "") return;
    this.props.onFormSubmit(this.state.term);
    this.setState({ term: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="input form-control"
          placeholder="Enter Item"
          value={this.state.term}
          onChange={(e) => this.setState({ term: e.target.value })}
        />
        <Button variant="primary" type="submit" className="button">
          Submit
        </Button>
      </form>
    );
  }
}

const Header = (props) => {
  return (
    <div className="card-header">
      <h3 className="card-title">You have {props.numTodos} Todos</h3>
    </div>
  );
};

const TodoList = (props) => {
  const todos = props.tasks.map((todo, index) => {
    return (
      <Todo content={todo} key={index} id={index} onDelete={props.onDelete} />
    );
  });
  return <div className="list-wrapper">{todos}</div>;
};

const Todo = (props) => {
  return (
    <div className="list-item">
      <div className="item">{props.content}</div>
      <Button
        variant="primary"
        size="sm"
        className="deleteButton"
        onClick={() => {
          props.onDelete(props.id);
        }}
      ></Button>
    </div>
  );
};

export default Main;
