import React, { Component } from 'react';
import { Col, Grid, Row, Button, Accordion, Panel } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';


export class EmployeeGameReport extends Component {
    constructor(props) {
        super(props);
        this.state = { changePage: false };
        this.goToDashboard = this.goToDashboard.bind(this);
    }


    changePage() {
        this.setState({ changePage: true })
    }

    goToDashboard() {
        this.props.changePage(1)
    }


    render() {
        return (
            <div>
           
                <h1>Game Report Page</h1>

                <Link to={'/DashBoard'}>
                    <button onClick={() => this.goToDashboard()}>Back</button>
                </Link>

            </div>
        );
    }
}