import React, { Component } from 'react';
import axios from 'axios';
import { MemberNav } from './MemberNav';
import { Col, Grid, Row} from 'react-bootstrap';
import './css/LoginPage.css';
import { MemberNewAccount } from './MemberNewAccount';
import { MemberAccountInfo } from './MemberAccountInfo';
import { MemberLogin } from './MemberLogin';
import { Redirect } from 'react-router-dom';
import { Home } from './Home';

export class MemberLayout extends Component {
    displayName = MemberLayout.name


    constructor(props) {
        super(props);
        this.state = { isLoggedIn: false, error: "", businessName: "", businessId: 0, userId: 0, userName: "", pageNumber: 3, savedUsername: false};

        this.changePage = this.changePage.bind(this);
        this.changePageNumber = this.changePageNumber.bind(this);
        this.changeIsLoggedIn = this.changeIsLoggedIn.bind(this);
    }


    changeMemberNav() {
        try {
            if (this.state.isLoggedIn == false) {
                this.setState({isLoggedIn: true});
            }
            else {
                this.setState({ isLoggedIn: false });
            }


        } catch (e) {
            this.setState({ isLoggedIn: false });
        }
    }

    changePageNumber(newPageNumber, userName, isLoggedIn) {
        if (isLoggedIn == true) {
            if (this.state.savedUsername == false) {
                this.setState({ pageNumber: newPageNumber, userName: userName, savedUsername: true });
            }
            else {
                this.setState({ pageNumber: newPageNumber });
            }
        }
        else {
            this.setState({ pageNumber: newPageNumber });
        }
     
        
    }

    changeIsLoggedIn() {
        this.setState({ isLoggedIn: true });
    }

    changePage() {
        if (this.state.pageNumber == 1) {
            return <MemberLogin changePage={this.changePageNumber.bind(this)} loginUser={this.changeIsLoggedIn.bind(this)}></MemberLogin>;
        }
        else if (this.state.pageNumber == 2) {
            return <MemberNewAccount changePage={this.changePageNumber.bind(this)} loginUser={this.changeIsLoggedIn.bind(this)}></MemberNewAccount>;
        } else if (this.state.pageNumber == 3) {
            return <Home changePage={this.changePage.bind(this)}></Home>
        } else if (this.state.pageNumber == 4) {
            <Redirect to="/AccountInfo" push />
            return <MemberAccountInfo changePage={this.changePage.bind(this)}></MemberAccountInfo>
        }
    }

    changeNavLayout() {
        if (this.state.isLoggedIn == false) {
            return <MemberNav updatePageState={this.props.updatePageState} userName={this.state.userName} memberLoggedIn={this.state.isLoggedIn}  changePage={this.changePageNumber.bind(this)} />
        }
        else {
            return <MemberNav updatePageState={this.props.updatePageState} userName={this.state.userName} memberLoggedIn={this.state.isLoggedIn} changePage={this.changePageNumber.bind(this)} />
        }
    }
  

    render() {

        return (
            
            <Grid fluid>
                <Row>
                    <Col sm={3}>
                        {this.changeNavLayout()}
                    </Col>
                    <Col sm={9}>

                        {this.changePage()}
                    </Col>
                </Row>
            </Grid>
        )

    }
}
