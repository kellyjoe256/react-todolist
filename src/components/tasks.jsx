import React, { Component } from 'react';
import Paginate from './paginate';

export default class Tasks extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <>
                <h1>Tasks</h1>
                <Paginate />
            </>
        );
    }
}
