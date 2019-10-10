import React, { Component } from 'react';
import axios from 'axios';
import { MemberNav } from './MemberNav';
import { Col, Grid, Row} from 'react-bootstrap';
import './css/LoginPage.css';


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
