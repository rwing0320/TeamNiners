import React, { Component } from 'react';
import axios from 'axios';
import { MemberNav } from './MemberNav';
import { Dashboard } from './EmployeeDashboard';
import { Redirect, Route, Switch, Router } from 'react-router-dom';
import { Col, Grid, Row, Button, Accordion, Panel } from 'react-bootstrap';
import './css/LoginPage.css';
import { EmployeeLogin } from './EmployeeLogin';
import { EmployeeGameMod } from './EmployeeGameMod';
import { EmployeeShowGames } from './EmployeeShowGames';
import { EmployeeGameReport } from './EmployeeGameReport';
import { EmployeeDashboardLayout, EmployeeDashBoardLayout } from './EmployeeDashboardLayout'

export class MemberLayout extends Component {
    displayName = MemberLayout.name


    constructor(props) {
        super(props);
        this.state = { isLoggedIn: false, error: "", businessName: "", businessId: 0 };

        //this.setBusinessName = this.setBusinessName.bind(this);

    }



    render() {

        return (
            
            <Grid fluid>
                <Row>
                    <Col sm={3}>
                        <MemberNav updatePageState={this.props.updatePageState} />
                    </Col>
                    <Col  sm={9}>
                        {this.props.children}
                    </Col>
                </Row>
            </Grid>
        )

    }
}
