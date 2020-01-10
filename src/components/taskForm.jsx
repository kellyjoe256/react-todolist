/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TaskForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            priorityOptions: {
                '': 'Select Priority',
                low: 'Low',
                medium: 'Medium',
                high: 'High',
            },
        };
    }

    getError(field) {
        const { errors } = this.props;
        const error = errors.find((e) => e[field]);
        if (error) {
            return error[field];
        }

        return null;
    }

    hasError(field) {
        const { errors } = this.props;

        return errors.some((error) => error[field]);
    }

    displayError(field) {
        if (!this.hasError(field)) {
            return null;
        }

        return <p className="help is-danger">{this.getError(field)}</p>;
    }

    render() {
        const { priorityOptions } = this.state;
        const { task, onChange, onSubmit } = this.props;

        // prettier-ignore
        return (
            <form autoComplete="off" onSubmit={onSubmit}>
                <div className="field">
                    <label className="label" htmlFor="title">
                        Task / Title
                    </label>
                    <div className="control">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Task"
                            value={task.title}
                            onChange={onChange}
                            className={`input${
                                this.hasError('title') ? ' is-danger' : ''
                            }`}
                        />
                        {this.displayError('title')}
                    </div>
                </div>
                <div className="field">
                    <label className="label" htmlFor="priority">
                        Priority
                    </label>
                    <div className="control">
                        <div
                            className={`select is-fullwidth${
                                this.hasError('priority') ? ' is-danger' : ''
                            }`}
                        >
                            <select
                                id="priority"
                                name="priority"
                                value={task.priority}
                                onChange={onChange}
                            >
                                {Object.keys(priorityOptions).map((key) => (
                                    <option key={key} value={key}>
                                        {priorityOptions[key]}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {this.displayError('priority')}
                    </div>
                </div>
                <div className="field">
                    <label className="label" htmlFor="start_date">
                        Start Date
                    </label>
                    <div className="control">
                        <input
                            type="text"
                            id="start_date"
                            name="start_date"
                            pattern="\d{4}-\d{2}-\d{2}"
                            placeholder="YYYY-MM-DD"
                            value={task.start_date}
                            onChange={onChange}
                            className={`input${
                                this.hasError('start_date') ? ' is-danger' : ''
                            }`}
                        />
                        {this.displayError('start_date')}
                    </div>
                </div>
                <div className="field">
                    <label className="label" htmlFor="due_date">
                        Due Date
                    </label>
                    <div className="control">
                        <input
                            type="text"
                            id="due_date"
                            name="due_date"
                            pattern="\d{4}-\d{2}-\d{2}"
                            placeholder="YYYY-MM-DD"
                            value={task.due_date}
                            onChange={onChange}
                            className={`input${
                                this.hasError('due_date') ? ' is-danger' : ''
                            }`}
                        />
                        {this.displayError('due_date')}
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button type="submit" className="button is-link">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

TaskForm.propTypes = {
    task: PropTypes.objectOf(PropTypes.any).isRequired,
    errors: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default TaskForm;
