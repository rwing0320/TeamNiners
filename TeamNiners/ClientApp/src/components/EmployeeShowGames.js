import React, { Component } from 'react';
import { Col, Grid, Row, Button, Accordion, Panel } from 'react-bootstrap';
import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';

export class EmployeeShowGames extends Component {
    constructor(props) {
        super(props);
        this.state = { changePage: false };
      
    }


    changePage() {
        this.setState({ changePage: true })
    }

    goToDashboard() {
        if (this.state.changePage) {
            return <Redirect to='/dashboard' />
        }
    }


    render() {
        return (
            <div>
                {this.goToDashboard()}
                <h1>Show Games Page</h1>
                <button onClick={() => this.changePage()}>Back</button>

            </div>
        );
    }
}