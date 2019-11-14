import React, { Component } from 'react';
import axios from 'axios';
import { MemberNav } from './MemberNav'
import { Glyphicon, Button, Accordion, Panel } from 'react-bootstrap';
import './css/wishList.css';
import videoGame from './img/Video_Game.jpg';
import { webAddress } from './reference/reference';


export class Home extends Component {
  displayName = Home.name

    constructor(props) {
    super(props);
        this.state = { businessCity: "", email: "", games: [] };

        this.getAllGames = this.getAllGames.bind(this);
        this.gotToProductPage = this.gotToProductPage.bind(this);
        this.getData = this.getData.bind(this);
        this.getBusinessLoginData = this.getBusinessLoginData.bind(this);
        this.productPage = this.productPage.bind(this);
        this.addToCart = this.addToCart.bind(this);

        this.getAllGames();


        axios.get(webAddress + 'api/member/memberId', {
            
        })
            .then(function (response) {
                console.log("The member info for Login on home page is: " + response.data[0] + " , " + response.data[1] + " , " + response.data[2]);

            })
            .catch(function (error) {
                //errorMessage = ""
                console.log("this is the error on the login page for saving the id: " + error);
            });
     

    }

    getAllGames() {

        axios.get(webAddress + '/api/Game/GetAllGames')
            .then(res => {
                const games = res.data;
                this.setState({ games });
                console.log(res.data);

            })
    }

    async  gotToProductPage(productId) {
        console.log("the productId for productPage is " + productId)
        await axios.post(webAddress + 'api/product/productID', {
            GameId: productId
        })
            .then(res => {
                console.log(res);

                this.props.changePage(5);

            })
            .catch(function (error) {
                //errorMessage = "You have entered in incorrect credentails! Please try Again!"
                console.log("this is the error: " + error);
            });
    }

    addToCart(productId) {
        console.log("the productId for addToCart is " + productId)
        axios.post(webAddress + 'api/cart/saveCartItemsFromWishList', {
            GameId: productId
        })
            .then(res => {
                console.log(res.data);
                alert("Successfully added to Cart!");
                //this.setState({ cartCount: this.state.cartCount + 1 });
            })
            .catch(function (error) {
                //errormessage = "you have entered in incorrect credentails! please try again!"
                console.log("this is the error: " + error);
            });

    }


    getData() {

        console.log("test");
        axios.get(webAddress + 'api/APIBusinesses')
            .then(res => {
                console.log(res.data);
                this.setState({
                    businessCity: res.data[0].businessCity
                });
            })
    }

    getBusinessLoginData() {

    console.log("test");
            axios.get(webAddress + 'api/BusinessLogins')
        .then(res => {
            console.log(res.data);
            this.setState({
                email: res.data[0].email
            });
        })

    }


    myFunction = () => {
        console.log("test");
        axios.get(webAddress + 'api/APIBusinesses')
            .then(res => {
                console.log(res.data);
            })

    }

    async productPage() {
        await axios.post(webAddress + 'api/product/productID', {
            GameId: 1           
        })
            .then(res => {
                console.log(res);
                
                this.props.changePage(5);

            })
            .catch(function (error) {
                //errorMessage = "You have entered in incorrect credentails! Please try Again!"
                console.log("this is the error: " + error);
            });

       
    }

            //
        //<ul>
        //  <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
        //  <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
        //  <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
        //</ul>
        //<p>To help you get started, we've also set up:</p>
        //<ul>
        //  <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
        //  <li><strong>Development server integration</strong>. In development mode, the development server from <code>create-react-app</code> runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file.</li>
        //  <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.</li>
        //</ul>
        //    <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
        //    <button onClick={this.getData}>Click Me</button>
        //    <button onClick={this.getBusinessLoginData}>Click Me</button>
        //    <p>{this.state.businessCity} AND the Email is {this.state.email}</p>

        //    <button onClick={this.productPage}>Go To Product Page</button>

  render() {
    return (
      <div>
            <h1>9ners Games</h1>
            <p>Please check the assorted types of games we have to offer!</p>

            <table>
                <tbody>
                    {this.state.games.map(game =>
                        <tr key={game.gameId} className="myTableRow" onClick={() => this.gotToProductPage(game.gameId)}>
                            <td width="65%">
                                <br />
                                <img id="gameImage" src={videoGame} />
                                <div id="gameInfoDiv">
                                    <div>{game.gameTitle}</div>
                                    <div>Description: {game.gameDescription}</div>
                                    
                                </div>
                            </td>

                            <td width="25%">
                                <br />
                                <br />
                                <div>${game.gamePrice}</div>
                                <br />
                            </td>

                        </tr>


                    )}

                </tbody>

            </table>

        </div>
    );
  }
}
