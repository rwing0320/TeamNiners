import React, { Component } from 'react';
import { Col, Grid, Row, Button, Accordion, Panel } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/ShowGamesPage.css';


export class EmployeeShowGames extends Component {
    constructor(props) {
        super(props);
        this.state = { changePage: false };
        this.goToDashboard = this.goToDashboard.bind(this);
    }


    changePage() {
        this.setState({ changePage: true })
    }

    goToDashboard() {
        //if (this.state.changePage) {
        //    return <Redirect to='/dashboard' />
        //}
        this.props.changePage(1)
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
                                
                                <h1>Show Games Page</h1>
                                <Link to={"/Dashboard"}>
                                    <button onClick={() => this.goToDashboard()}>Back</button>
                                </Link>
                            </div>
                        </Row>
                    </Grid>
                </div>

            </div>
        );
    }
}