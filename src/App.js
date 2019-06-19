import React from 'react';
// import './App.css';
import AddOption from './components/actual/AddOption';
import AddShop from './components/shops/AddShop';
import Header from './components/header/Header';
import Action from './components/actual/Action';
import Options from './components/actual/Options';
import Welcome from './components/welcome/Welcome';
import Shops from './components/shops/Shops';
import './styles/container.css';
import './styles/widget.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import axios from 'axios';
import MyModal from "./components/modal/MyModal";

class App extends React.Component {
  state = {
    latestShoppingList:
        {lineItems: []},
    shops:[],
    user: null,
    showModal: false,
    modalType: null,
    isUserAuthFailed: false,
    userModalErrorMessage: null,
  };
  handleDeleteOptions = () => {
    this.setState(() => ({ latestShoppingList: { lineItems: []}}));
  };
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      latestShoppingList: {lineItems: prevState.latestShoppingList.lineItems.filter((option) => optionToRemove !== option)}
    }));
  };

  handleDeleteShop = (shopToRemove) => {
     this.setState((prevState) => ({
         shops: prevState.shops.filter((shop) => shopToRemove !== shop)
     }));
  };
  handleDeleteShops = () => {
      this.setState(() => ({shops:[]}));
  };


  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.latestShoppingList.lineItems.length);
    console.log(this.state.latestShoppingList.lineItems.length);
    const option = this.state.latestShoppingList.lineItems[randomNum].product.name;
    alert(option);
  };
  handleAddOption = (option) => {
    if (!option) {
      return 'Enter valid value to add item';
    }
    for (let i = 0; i < this.state.latestShoppingList.lineItems.length; i++ ){
        if  (this.state.latestShoppingList.lineItems[i].product.name === option) {
            return 'This option already exists';
        }
    }
    // const newLine = {
    //     id: 1,
    //     product: {id: 3, name: option},
    //     completed: false
    // };

      axios.post("http://localhost:8080/line-item/add", {
          shoppingList: this.state.latestShoppingList,
          quantity: 2,
          product: {name: option}
      }, {headers:{'Content-Type': 'application/json'}})
          .then(res => this.setState((prevState) => ({
              latestShoppingList: {lineItems: prevState.latestShoppingList.lineItems.concat(res.data)}}))
          );

    // this.setState((prevState) => ({
    //   latestShoppingList: {lineItems: prevState.latestShoppingList.lineItems.concat(newLine)}}));
    // this.setState({latestShoppingList:
    //       {lineItems: [...this.state.latestShoppingList.lineItems, newLine]}});
  };
    handleAddShop = (name, address) => {
        if (!name) {
            return 'Enter valid value to add item';
        }
        for (let i = 0; i < this.state.shops.length; i++ ){
            if  (this.state.shops[i].name === name) {
                return 'This shop already exists';
            }
        }
        axios.post("http://localhost:8080/shops", {
            name: name,
            address: address,
            // openingHours: [],
            tags: []
        }, {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.state.user.token}`
        }})
            .then(res => this.setState((prevState) => ({
                shops: prevState.shops.concat(res.data)}))
            );

        // this.setState((prevState) => ({
        //   latestShoppingList: {lineItems: prevState.latestShoppingList.lineItems.concat(newLine)}}));
        // this.setState({latestShoppingList:
        //       {lineItems: [...this.state.latestShoppingList.lineItems, newLine]}});
    };
    handleLogin = (userCredentials) => {
      axios.post("http://localhost:8080/users/auth", userCredentials, { headers: {'Content-Type': 'application/json'}})
          .then((response) => {
              if(response.status <= 300) {
                  this.setState({user: response.data});
                  window.localStorage.setItem("user", JSON.stringify(response.data));
                  this.hideModal();
              }
          })
          .catch((error) => {
              if(error.response.status === 403) {
                  this.setState({userModalErrorMessage: "Invalid username or password"});
              }
          })

    };
    handleRegistration = (registrationCredentials) => {
      axios.post("http://localhost:8080/users", registrationCredentials, { headers: {'Content-Type': 'application/json'}})
          .then(() => {
              alert("Successful registration");
              this.hideModal()
          })
          .catch((error) => {
              this.sendModalErrorMessage(error.response.data)
          })
    };
    handleLogout = () => {
      this.setState({user: null});
      window.localStorage.removeItem("user");
    };
    showModal = (type) => {
        this.setState({showModal: true});
        this.setState({modalType: type});
    };
    hideModal = () => {
        this.setState({showModal: false});
        this.setState({userModalErrorMessage: null});
    };
    sendModalErrorMessage = (message) => {
        this.setState({userModalErrorMessage: message});
    };

    componentDidMount() {
        let user = window.localStorage.getItem("user");
        if(user) {
            user = JSON.parse(user);
            this.setState({user: user})
        }
        axios.get(`http://localhost:8080/shopping-lists/latest/${user.id}`, {headers: {'Authorization': `Bearer ${user.token}`}})
            .then(res => {
                if(res.data) {
                    this.setState({latestShoppingList: res.data});
                }
        });
        axios.get('http://localhost:8080/shops', {headers: {'Authorization': `Bearer ${user.token}`}})
            .then(res => this.setState({ shops: res.data}));
        // try {
        //   const json = localStorage.getItem('latestShoppingList');
        //   const latestShoppingList = JSON.parse(json);
        //
        //   if (latestShoppingList) {
        //     this.setState(() => ({ latestShoppingList }));
        //   }
        // } catch (e) {
        //   // Do nothing at all
        // }
    }
    componentDidUpdate(prevProps, prevState) {
  //   if (prevState.latestShoppingList.length !== this.state.latestShoppingList.length) {
  //     const json = JSON.stringify(this.state.latestShoppingList);
  //     localStorage.setItem('latestShoppingList', json);
  //   }
  // }
  // componentWillUnmount() {
  //   console.log('componentWillUnmount');
  }

  render() {
    const subtitle = 'Take that home....';

    return (
        <Router>
          <div>
            <Header
                subtitle={subtitle}
                user={this.state.user}
                showModal={this.showModal}
                handleLogout={this.handleLogout}/>
            {/*<Route exact path="/" component={Welcome} />*/}
            <Route exact path="/" render={props => (
                <React.Fragment>
                  <div className="container">
                    <div className="widget">
                      <Welcome/>
                    </div>
                  </div>
                </React.Fragment>
            )}/>
            <Route path="/shops" render={props => (
                <React.Fragment>
                    <div className="container">
                        <div className="widget">
                            <Shops
                                shops={this.state.shops}
                                handleDeleteOptions={this.handleDeleteShops}
                                handleDeleteOption={this.handleDeleteShop}
                            />
                            <AddShop
                                handleAddOption={this.handleAddShop}
                            />
                        </div>
                    </div>
                </React.Fragment>
            )}/>
            <Route path="/actual" render={props => (
                <React.Fragment>
                  <div className="container">
                    <div className="widget">
                      <Options
                          options={this.state.latestShoppingList.lineItems}
                          handleDeleteOptions={this.handleDeleteOptions}
                          handleDeleteOption={this.handleDeleteOption}
                      />
                      <AddOption
                          handleAddOption={this.handleAddOption}
                      />
                    </div>
                    <Action
                        hasOptions={this.state.latestShoppingList.lineItems.length > 0}
                        handlePick={this.handlePick}
                    />
                  </div>
                </React.Fragment>
            )} />
                <React.Fragment>
                    <MyModal
                        showModal={this.state.showModal}
                        hideModal={this.hideModal}
                        type={this.state.modalType}
                        handleLogin={this.handleLogin}
                        handleRegistration={this.handleRegistration}
                        isUserAuthFailed={this.state.isUserAuthFailed}
                        errorMessageSender={this.sendModalErrorMessage}
                        errorMessage={this.state.userModalErrorMessage}/>
                </React.Fragment>
          </div>
        </Router>
    );
  }
}


export default App;
