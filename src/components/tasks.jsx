/* eslint-disable no-underscore-dangle, class-methods-use-this, object-curly-newline */
import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Paginate from './paginate';

class Tasks extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    ucfirst(value) {
        const v = String(value);
        return v[0].toUpperCase() + v.slice(1).toLowerCase();
    }

    fromNow(value) {
        return moment(value).fromNow();
    }

    formatDate(value) {
        return moment(value).format('Do MMM YYYY');
    }

    renderTasks() {
        const { tasks, onEdit, onDelete, onCompletion } = this.props;

        if (tasks.length === 0) {
            return <p>No tasks available</p>;
        }

        return (
            <table className="table is-striped is-fullwidth is-narrow">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Priority</th>
                        <th>Start Date</th>
                        <th>Due Date</th>
                        <th>Created</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr
                            key={task._id}
                            className={task.completed ? 'is-selected' : ''}
                        >
                            <td>{task.title}</td>
                            <td>{this.ucfirst(task.priority)}</td>
                            <td>{this.formatDate(task.start_date)}</td>
                            <td>{this.formatDate(task.due_date)}</td>
                            <td>{this.fromNow(task.created_at)}</td>
                            <td className="control-buttons">
                                <button
                                    type="button"
                                    className="button is-small is-info is-light"
                                    onClick={() => {
                                        onEdit(task);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="button is-small is-danger is-light"
                                    onClick={() => {
                                        onDelete(task);
                                    }}
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    className="button is-small is-light is-success"
                                    onClick={() => {
                                        onCompletion(task);
                                    }}
                                >
                                    Mark as
                                    {` ${
                                        !task.completed
                                            ? 'complete'
                                            : 'incomplete'
                                    }`}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    render() {
        const { meta, onSearch, onChangeLimit, onPageChange } = this.props;
        // prettier-ignore
        return (
            <>
                <div className="data-controls">
                    <select
                        onChange={(e) => {
                            onChangeLimit(e.target.value);
                        }}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                    </select>
                    <input
                        type="text"
                        className="input"
                        placeholder="Search..."
                        onKeyUp={(e) => {
                            onSearch(e.target.value.trim());
                        }}
                    />
                </div>
                {this.renderTasks()}
                {meta.total_pages > 1
                    ? <Paginate meta={meta} onPageChange={onPageChange} />
                    : null}
            </>
        );
    }
}

Tasks.propTypes = {
    meta: PropTypes.objectOf(PropTypes.any).isRequired,
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCompletion: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    onChangeLimit: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Tasks;
