import React, { Component } from 'react';
import Tasks from './components/tasks';
import TaskForm from './components/taskForm';

export default class App extends Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        return (
            <div className="container is-fluid">
                <div className="columns">
                    <div className="column is-one-third">
                        <TaskForm />
                    </div>
                    <div className="column">
                        <Tasks />
                    </div>
                </div>
            </div>
        );
    }
}
