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

class App extends React.Component {
  state = {
    options:
        {lineItems:[
        { id: 1, product: { id: 0, name: 'towel'}, completed: false },
        {  id: 2, product: { id: 1, name: 'ford'}, completed: false }]}
  };
  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  };
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  };
  handleAddOption = (option) => {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }

    this.setState((prevState) => ({
      options: prevState.options.concat(option)
    }));
  };
  componentDidMount() {
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
                        hasOptions={this.state.options.length > 0}
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
