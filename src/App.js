import React from 'react';
// import './App.css';
import AddOption from './components/actual/AddOption';
import Header from './components/Header';
import Action from './components/actual/Action';
import Options from './components/actual/Options';
import Welcome from './components/welcome/Welcome';
import './styles/container.css';
import './styles/widget.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import axios from 'axios';

class App extends React.Component {
  state = {
    options:
        {lineItems:[
        { id: 1, product: { id: 0, name: 'towel'}, completed: false },
        {  id: 2, product: { id: 1, name: 'ford'}, completed: false }]},
      shops:[{ id: 1, name: 'FMCG', },
          {  id: 2, name: 'Travel',},
          {  id: 3, name: 'Food',  }]
  };
  handleDeleteOptions = () => {
    this.setState(() => ({ options: { lineItems: []}}));
  };
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: {lineItems: prevState.options.lineItems.filter((option) => optionToRemove !== option)}
    }));
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
    const newLine = {
      id: 1,
      product: {id: 3, name: option},
      completed: false
    };

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
  componentDidMount() {
      axios.get('http://localhost:8080/shopping-list/all')
          .then(res => {
              this.setState({ options: res.data });
          });
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
            <Header subtitle={subtitle} />
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
                            <h1>THIS IS the shops!!</h1>
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
          </div>
        </Router>
    );
  }
}


export default App;
