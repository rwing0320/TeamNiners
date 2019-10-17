import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './css/MemberNav.css';



export class MemberNav extends Component {
    displayName = MemberNav.name

    constructor(props) {
        super(props);
        this.state = { pageOn: "Member", error: "", businessName: "", businessId: 0, memberLoggedIn: false };

        //this.setBusinessName = this.setBusinessName.bind(this);


        this.goToBusinessLogin = this.goToBusinessLogin.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.checkUserName = this.checkUserName.bind(this);
        //this.functionCalled = this.functionCalled.bind(this);
       
      
    }

    componentDidMount() {
        this.checkUserName();
    }

    

    checkUserName() {
        try {
            if (this.props.userName != null && this.props.userName != "") {
                this.setState({ memberLoggedIn: true });
            } else {
                this.setState({ memberLoggedIn: false });
            }

        } catch (e) {
            this.setState({ memberLoggedIn: false });
            console.log("there was an error that was caught");
        }
    }


    passNewPage(pageNumber) {
        this.props.changePage(pageNumber, "");
    }
  
    loginUser() {
        if (this.props.memberLoggedIn == true) {
            return<Nav>
            <LinkContainer to={'/member'} exact>
                <NavItem>
                        <Glyphicon glyph='user' /> {this.props.userName}
                             </NavItem>
            </LinkContainer>
               
                <LinkContainer to={'/cart'}>
                    <NavItem>
                        <Glyphicon glyph='shopping-cart' /> Cart
                             </NavItem>
                </LinkContainer>
                <LinkContainer to={'/settings'}>
                    <NavItem>
                        <Glyphicon glyph='cog' /> Wish List
                            </NavItem>
                </LinkContainer>
                <NavItem id="BusinessLogin" onClick={this.goToBusinessLogin}>
                    <Glyphicon glyph='share' /> Business Login
                        </NavItem>
            </Nav>
        } else {
            return <Nav>
                <NavItem onClick={() => this.passNewPage(1)}>
                    <Glyphicon glyph='user' /> Login
                             </NavItem>
            
                <NavItem onClick={() =>  this.passNewPage(2)}>
                    <Glyphicon glyph='user' /> Create Account
                </NavItem>
            
                
                <NavItem>
                    <Glyphicon glyph='shopping-cart' /> Cart
                </NavItem>
              
                <NavItem id="BusinessLogin" onClick={this.goToBusinessLogin}>
                   <Glyphicon glyph='share' /> Business Login
                        </NavItem>
            </Nav>
        }
    }

    goToBusinessLogin() {
        this.props.updatePageState(2);
    }

    render() {

 


        return (
            <Navbar inverse fixedTop fluid >
                <Navbar.Header>
                
                        <Link to={'/member'}>
                            <div>
                                <img className="Nav_Icon" src={require('./img/9ners_Logo.svg')} alt="company_logo" width="50" height="50" />
                            </div>
                        </Link>
                
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                        {this.loginUser()}               
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

 //<LinkContainer to={'/memberlogin'} exact>
                        //    <NavItem>
                        //        <Glyphicon glyph='user' /> Login
                        //     </NavItem>
                        //</LinkContainer>
                        //<LinkContainer to={'/member/register'} exact>
                        //    <NavItem >
                        //        <Glyphicon glyph='user' /> Create Account
                        //     </NavItem>
                        //</LinkContainer>
                        //<LinkContainer to={'/cart'}>
                        //    <NavItem>
                        //        <Glyphicon glyph='shopping-cart' /> Cart
                        //     </NavItem>
                        //</LinkContainer>
                        //<LinkContainer to={'/settings'}>
                        //    <NavItem>
                        //        <Glyphicon glyph='cog' /> Settings
                        //    </NavItem>
                        //</LinkContainer>