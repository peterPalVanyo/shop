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
    options:
        {lineItems:[
        { id: 1, product: { id: 0, name: 'towel'}, completed: false },
        {  id: 2, product: { id: 1, name: 'ford'}, completed: false }]},
    shops:[{ id: 1, name: 'FMCG', },
      {  id: 2, name: 'Travel',},
      {  id: 3, name: 'Food',  }],
    user: null,
    showModal: false,
    modalType: null
  };
  handleDeleteOptions = () => {
    this.setState(() => ({ options: { lineItems: []}}));
  };
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: {lineItems: prevState.options.lineItems.filter((option) => optionToRemove !== option)}
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
    const randomNum = Math.floor(Math.random() * this.state.options.lineItems.length);
    console.log(this.state.options.lineItems.length);
    const option = this.state.options.lineItems[randomNum].product.name;
    alert(option);
  };
  handleAddOption = (option) => {
    if (!option) {
      return 'Enter valid value to add item';
    }
    for (let i = 0; i < this.state.options.lineItems.length; i++ ){
        if  (this.state.options.lineItems[i].product.name === option) {
            return 'This option already exists';
        }
    }
    // const newLine = {
    //     id: 1,
    //     product: {id: 3, name: option},
    //     completed: false
    // };

      axios.post("http://localhost:8080/line-item/add", {
          shoppingList: this.state.options,
          quantity: 2,
          product: {name: option}
      }, {headers:{'Content-Type': 'application/json'}})
          .then(res => this.setState((prevState) => ({
              options: {lineItems: prevState.options.lineItems.concat(res.data)}}))
          );

    // this.setState((prevState) => ({
    //   options: {lineItems: prevState.options.lineItems.concat(newLine)}}));
    // this.setState({options:
    //       {lineItems: [...this.state.options.lineItems, newLine]}});
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
        axios.post("http://localhost:8080/shop/add", {
            name: name,
            address: address,
            // openingHours: [],
            tags: []
        }, {headers:{'Content-Type': 'application/json'}})
            .then(res => this.setState((prevState) => ({
                shops: prevState.shops.concat(res.data)}))
            );

        // this.setState((prevState) => ({
        //   options: {lineItems: prevState.options.lineItems.concat(newLine)}}));
        // this.setState({options:
        //       {lineItems: [...this.state.options.lineItems, newLine]}});
    };
    handleLogin = (userCredentials) => {
      axios.post("http://localhost:8080/users/auth", userCredentials, { headers: {'Content-Type': 'application/json'}})
          .then((response) => {
              if(response.status <= 300) {
                  this.setState({user: response.data});
                  window.localStorage.setItem("user", JSON.stringify(response.data));
                  this.setState({showModal: false});
              }
          })
    };
    showModal = (type) => {
        this.setState({showModal: true});
        this.setState({modalType: type});
    };
    hideModal = () => {
        this.setState({showModal: false})
    };
  componentDidMount() {
      axios.get('http://localhost:8080/shopping-list/all')
          .then(res => {
              this.setState({ options: res.data });
          });
      axios.get('http://localhost:8080/shops')
          .then(res => this.setState({ shops: res.data}));
      const user = window.localStorage.getItem("user");
      if(user) this.setState({user: JSON.parse(user)});
    // try {
    //   const json = localStorage.getItem('options');
    //   const options = JSON.parse(json);
    //
    //   if (options) {
    //     this.setState(() => ({ options }));
    //   }
    // } catch (e) {
    //   // Do nothing at all
    // }
  }
  componentDidUpdate(prevProps, prevState) {
  //   if (prevState.options.length !== this.state.options.length) {
  //     const json = JSON.stringify(this.state.options);
  //     localStorage.setItem('options', json);
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
                showModal={this.showModal}/>
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
                          options={this.state.options.lineItems}
                          handleDeleteOptions={this.handleDeleteOptions}
                          handleDeleteOption={this.handleDeleteOption}
                      />
                      <AddOption
                          handleAddOption={this.handleAddOption}
                      />
                    </div>
                    <Action
                        hasOptions={this.state.options.lineItems.length > 0}
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
                        handleLogin={this.handleLogin}/>
                </React.Fragment>
          </div>
        </Router>
    );
  }
}


export default App;
