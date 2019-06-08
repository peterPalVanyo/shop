import React from 'react';
// import './App.css';
import AddOption from './components/AddOption';
import Header from './components/Header';
import Action from './components/Action';
import Options from './components/Options';
import './styles/container.css';
import './styles/widget.css';

class App extends React.Component {
  state = {
    options: []
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
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      // Do nothing at all
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    const subtitle = 'Take that home....';

    return (
        <div>
          <Header subtitle={subtitle} />
          <div className="container">
            <div className="widget">
              <Options
                  options={this.state.options}
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
        </div>
    );
  }
}


export default App;
