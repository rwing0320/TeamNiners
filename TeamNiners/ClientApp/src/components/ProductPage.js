import React, { Component } from 'react';
import { Glyphicon, Button, Accordion, Panel } from 'react-bootstrap';
import './css/ProductPage.css';
import videoGame from './img/Video_Game.jpg';
import axios from 'axios';
import { webAddress } from './reference/reference';

export class ProductPage extends Component {
    displayName = ProductPage.name

    constructor(props) {
        super(props);
        this.state = { isTrue: false, pageOn: 1, cartCount: 0, gameTitle: "", gameCat: 0, gamePlat: 0, gamePrice: 0, gameDesc: ""};

      
        this.addToCart = this.addToCart.bind(this);
        this.getcartInfo = this.getcartInfo.bind(this);
        this.addToCart = this.addToCart.bind(this);

        this.getProductInfo();
    }

   async getProductInfo() {
        await axios.get(webAddress + 'api/Game/GetGame', {
            
        })
            .then(res => {
                console.log(res.data[0].gameTitle);              
                this.setState({ gameTitle: res.data[0].gameTitle, gameCat: res.data[0].gameCategory, gamePlat: res.data[0].gamePlatform, gamePrice: res.data[0].gamePrice, gameDesc: res.data[0].gameDescription });
            })
            .catch(function (error) {
                //errorMessage = "You have entered in incorrect credentails! Please try Again!"
                console.log("this is the error: " + error);
            });

    }

     addToCart() {
        //axios.post(webAddress + 'api/Cart', {
            
        //})
        //    .then(res => {
        //        console.log(res.data);
               
                //this.setState({ cartCount: this.state.cartCount + 1 });
        //    })
        //    .catch(function (error) {
        //        //errorMessage = "You have entered in incorrect credentails! Please try Again!"
        //        console.log("this is the error: " + error);
        //    });
        
    }

    getcartInfo() {
        return <h4><Glyphicon glyph='shopping-cart' /> Cart <span className="badge">{this.state.cartCount}</span></h4>;
    }

    render() {
        return (
            <div className="productPageDiv">


                <table className="table-borderless purchaseTable">
                    <tbody>
                        <tr >
                            <td width="30%">
                                <img src={videoGame} />
                            </td>

                            <td width="50% ">
                                <div className="gameInfoElement">
                                    <h2 className="Title">{this.state.gameTitle}</h2>
                                    <h2 className="Platform">{this.state.gamePlat}</h2>
                                    <h2 className="Category">{this.state.gameCat}</h2>
                                </div>
                            </td>

                            <td width="20%">
                                <div className="productForm">
                                    <form className="">
                                        <h3 className="ProductPrice" align="left">Price: ${this.state.gamePrice}</h3>
                                        <br />

                                        <Button className="btn btn-lg btn-info btn-block" onClick={this.addToCart}> Add To Cart </Button>


                                        <Button className="btn btn-lg btn-success btn-block"> Add To Favorites </Button>



                                        <div className="productPageCart">

                                            <Accordion className="accordionPanel">

                                                <Panel className="cartPanel" header={this.getcartInfo()} eventKey='1'>
                                                    <div className="scrollCart">
                                                        There are no reviews available!lkdsafhjsalkfjsdlkfjldskfjds
                                                               dsflkjsdflkjsdlkfjdslfdasdasdsadsadsadsad
                                                       dasdsadsadsadsadsad
                                                       dsadasdsadsadsa
                                                       dasdsadsadsa
                                                       dsadsadsad
                                                  
                                                 </div>
                                                </Panel>

                                            </Accordion>


                                        </div>

                                    </form>
                                </div>
                            </td>



                        </tr>
                        <tr className="description">
                            <td colSpan="3" >
                                <h3 className="DescriptionTitle">Description</h3>
                                <p className="Description">{this.state.gameDesc}</p>
                            </td>
                        </tr>
                    </tbody>

                </table>

                <Accordion>
                    <Panel header="Reviews" eventKey='1'>
                        There are no reviews available!
                </Panel>
                </Accordion>


            </div>
        );
    }
}
