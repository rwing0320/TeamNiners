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
                <div id="dashboardContainer">
                    <Grid fluid>
                        <Row>
                            <Col xl={12} id="filterColumn">
                                <div id="filterBar">
                                    <select>
                                        <option value="price_hl">Price: High to Low</option>
                                        <option value="price_lh">Price: Low to High</option>
                                        <option value="name_desc">Name: Descending</option>
                                        <option value="name_asc">Name: Ascending</option>
                                    </select>



                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <div>
                                {this.goToDashboard()}
                                <h1>Show Games Page</h1>
                                <button onClick={() => this.changePage()}>Back</button>

                            </div>
                        </Row>
                    </Grid>
                </div>

            </div>
        );
    }
}