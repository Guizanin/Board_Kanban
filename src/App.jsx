import React, { Component } from "react";
import "./App.css";

const labels = ["Backlog", "To Do", "In Progress", "Done"];
const cardsTasks = [
  { name: "task 1", stage: 0 },
  { name: "task 2", stage: 0 },
  { name: "task 3", stage: 0 },
  { name: "task 4", stage: 1 },
  { name: "task 5", stage: 2 },
  { name: "task 6", stage: 2 },
  { name: "task 7", stage: 2 },
  { name: "task 8", stage: 0 },
  { name: "task 9", stage: 3 },
  { name: "task 10", stage: 3 },
];
export default class App extends Component {
  state = {
    tasks: cardsTasks,
    organizedTask: [],
  };
  componentDidMount() {
    this.pagedTasks();
  }
  // FIXME: function responsabled for to pagened the task state
  pagedTasks = () => {
    this.setState({
      tasks: cardsTasks,
    });
    console.log("tasksss", this.state.tasks);
    const paginedTasks = this.state.tasks.reduce((acc, item) => {
      const group = item.stage;
      acc[group] = [...(acc[group] || []), item];
      return acc;
    }, []);
    this.setState({
      organizedTask: paginedTasks,
    });
  };
  // FIXME: function responsable for value update in selected itemTask
  updateClickedTask = (operation, oldTask) => {
    console.log("old", oldTask);
    const typeUpdate =
      operation === "prev" ? oldTask.stage - 1 : oldTask.stage + 1;
    const newTask = { ...oldTask, stage: typeUpdate };
    return newTask;
  };

  // FIXME: function responsable for update in task state
  updateStateTasks = (oldStateTasks, taskUpdated, indexTask) => {
    console.log("oldStateTasks", oldStateTasks);
    console.log("taskUpdated", taskUpdated);
    const newStateTask = oldStateTasks.reduce((acc, item, index) => {
      index !== indexTask && (acc = [...acc, item]);
      return acc;
    }, []);
    console.log("new", newStateTask);
    this.setState({
      tasks: [],
    });
    this.pagedTasks();
  };

  handleClick = (typeOperation, task) => {
    const indexTask = this.state.tasks.indexOf(task);
    const oldTask = this.state.tasks[indexTask];
    this.updateStateTasks(
      this.state.tasks,
      this.updateClickedTask(typeOperation, oldTask),
      indexTask
    );
  };

  render() {
    return (
      <>
        <header>
          <h2>Quadro Kamban</h2>
        </header>
        <main>
          {labels.map((itemLabel, indexLabel) => (
            <div
              className={`content-kamban ${itemLabel.replace(" ", "")}`}
              key={indexLabel}
            >
              <h2 className={`top ${itemLabel.replace(" ", "")}`}>
                {itemLabel}
              </h2>
              {this.state.organizedTask[indexLabel] &&
                this.state.organizedTask[indexLabel].map(
                  (tasksItem, indexTasks) => (
                    <div className="box" key={indexTasks}>
                      <span>{tasksItem.name}</span>
                      <div className="content-buttons">
                        <button
                          className="btn-prev"
                          disabled={tasksItem.stage === 0 ? true : false}
                          onClick={() => this.handleClick("prev", tasksItem)}
                        >
                          &#8656;
                        </button>

                        <button
                          className="btn-next"
                          disabled={
                            tasksItem.stage ===
                            this.state.organizedTask.length - 1
                              ? true
                              : false
                          }
                          onClick={() => this.handleClick("next", tasksItem)}
                        >
                          &#8658;{" "}
                        </button>
                      </div>
                    </div>
                  )
                )}
              {/* {this.state.tasks[indexLabel].map((tasksItem, indexTasks) => (
                <div className="box" key={indexTasks}>
                  <span>{tasksItem.name}</span>
                  <div className="content-buttons">
                    <button className="btn-prev">
                      {" "}
                      &#8656; onClick=
                      {() => this.handleClick("prev", tasksItem.name)}
                    </button>
                    <button className="btn-next"> &#8658; </button>
                  </div>
                </div>
              ))} */}
            </div>
          ))}
        </main>
      </>
    );
  }
}
