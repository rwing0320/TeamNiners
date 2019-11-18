import React, { Component } from 'react';
import axios from 'axios';
import { MemberNav } from './MemberNav';
import { Col, Grid, Row} from 'react-bootstrap';
import './css/LoginPage.css';
import { MemberNewAccount } from './MemberNewAccount';
import { MemberAccountInfo } from './MemberAccountInfo';
import { MemberLogin } from './MemberLogin';
import { WishList } from './WishList';
import { Cart } from './Cart';
import { Redirect } from 'react-router-dom';
import { Home } from './Home';
import { ProductPage } from './ProductPage';

export class MemberLayout extends Component {
    displayName = MemberLayout.name


    constructor(props) {
        super(props);
        this.state = { isLoggedIn: false, error: "", businessName: "", businessId: 0, userId: 0, userName: "", pageNumber: 3, savedUsername: false};

        this.changePage = this.changePage.bind(this);
        this.changePageNumber = this.changePageNumber.bind(this);
        this.changeIsLoggedIn = this.changeIsLoggedIn.bind(this);
        this.changeIsLoggedOut = this.changeIsLoggedOut.bind(this);
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

    changeIsLoggedOut() {
        this.setState({ isLoggedIn: false, pageNumber: 3 });
    }

    changePage() {
        if (this.state.pageNumber == 1) {
            return <MemberLogin changePage={this.changePageNumber.bind(this)} loginUser={this.changeIsLoggedIn.bind(this)}></MemberLogin>;
        }
        else if (this.state.pageNumber == 2) {
            return <MemberNewAccount changePage={this.changePageNumber.bind(this)} loginUser={this.changeIsLoggedIn.bind(this)}></MemberNewAccount>;
        } else if (this.state.pageNumber == 3) {
            return <Home changePage={this.changePageNumber.bind(this)}></Home>
        } else if (this.state.pageNumber == 4) {
            <Redirect to="/AccountInfo" push />
            return <MemberAccountInfo changePage={this.changePageNumber.bind(this)}></MemberAccountInfo>
        }
        else if(this.state.pageNumber == 5) {
            <Redirect to="/product" push />
            //return <MemberAccountInfo changePage={this.changePage.bind(this)}></MemberAccountInfo>
            return <ProductPage changePage={this.changePageNumber.bind(this)}></ProductPage>
        }
        else if (this.state.pageNumber == 6) {
            <Redirect to="/wishlist" push />
            //return <MemberAccountInfo changePage={this.changePage.bind(this)}></MemberAccountInfo>
            return <WishList changePage={this.changePageNumber.bind(this)}></WishList>
        }
        else if (this.state.pageNumber == 7) {
            <Redirect to="/cart" push />
            //return <MemberAccountInfo changePage={this.changePage.bind(this)}></MemberAccountInfo>
            return <Cart changePage={this.changePageNumber.bind(this)}></Cart>
        }
    }

    changeNavLayout() {
        if (this.state.isLoggedIn == false) {
            return <MemberNav updatePageState={this.props.updatePageState} userName={this.state.userName} memberLoggedOut={this.changeIsLoggedOut.bind(this)} memberLoggedIn={this.state.isLoggedIn}  changePage={this.changePageNumber.bind(this)} />
        }
        else {
            return <MemberNav updatePageState={this.props.updatePageState} userName={this.state.userName} memberLoggedOut={this.changeIsLoggedOut.bind(this)} memberLoggedIn={this.state.isLoggedIn} changePage={this.changePageNumber.bind(this)} />
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
