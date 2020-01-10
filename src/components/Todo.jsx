/* eslint-disable no-param-reassign, object-curly-newline, no-underscore-dangle */
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import pick from 'lodash.pick';
import Tasks from './tasks';
import TaskForm from './taskForm';

export default class Todo extends Component {
    constructor() {
        super();

        this.state = {
            meta: {},
            task: {
                title: '',
                priority: '',
                start_date: '',
                due_date: '',
            },
            tasks: [],
            errors: [],
        };

        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onCompletion = this.onCompletion.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getTasks();
    }

    onEdit(task) {
        const taskToEdit = { ...task };
        taskToEdit.due_date = moment(task.due_date).format('YYYY-MM-DD');
        taskToEdit.start_date = moment(task.start_date).format('YYYY-MM-DD');

        this.setState({ task: taskToEdit });
    }

    onDelete(task) {
        /* eslint-disable-next-line */
        if (!confirm('Are you sure?')) {
            return;
        }

        axios
            .delete(`tasks/${task._id}`)
            .then(() => {
                this.resetForm();
                this.getTasks();
            })
            .catch(({ response }) => {
                console.log(response);
            });
    }

    onCompletion(task) {
        const taskToComplete = { ...task };
        taskToComplete.completed = !taskToComplete.completed;

        this.saveTask(taskToComplete);
    }

    getTasks() {
        axios
            .get('tasks')
            .then(({ data }) => {
                this.setState({
                    meta: data.meta,
                    tasks: data.data,
                });
            })
            .catch((error) => console.log(error));
    }

    resetForm() {
        this.setState({
            task: {
                title: '',
                priority: '',
                start_date: '',
                due_date: '',
            },
            errors: [],
        });
    }

    saveTask(task) {
        const method = task._id ? 'PUT' : 'POST';
        const url = task._id ? `tasks/${task._id}` : 'tasks';
        const fields = [
            'title',
            'priority',
            'completed',
            'start_date',
            'due_date',
        ];

        axios({
            url,
            method,
            data: pick(task, fields),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(() => {
                this.resetForm();
                this.getTasks();
            })
            .catch(({ response }) => {
                this.setState({ errors: response.data });
            });
    }

    handleChange({ target }) {
        const { task } = this.state;
        task[target.name] = target.value;

        this.setState({ task });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { task } = this.state;

        this.saveTask(task);
    }

    render() {
        const { meta, task, tasks, errors } = this.state;

        return (
            <div className="container is-fluid">
                <div className="columns">
                    <div className="column is-one-third">
                        <h1>Create / Update Task</h1>
                        <TaskForm
                            task={task}
                            errors={errors}
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                        />
                    </div>
                    <div className="column">
                        <h1>Tasks</h1>
                        <Tasks
                            meta={meta}
                            tasks={tasks}
                            onEdit={this.onEdit}
                            onDelete={this.onDelete}
                            onCompletion={this.onCompletion}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
