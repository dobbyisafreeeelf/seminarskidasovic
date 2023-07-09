import React, { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: ""
    };
  }

  handleChange = (e) => {
    this.setState({ messageText: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ messageText: "" });
    this.props.onSendMessage(this.state.messageText);
  }

  render() {
    return (
      <div className="Input">
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.messageText}
            type="text"
            placeholder="Type your message here and hit ENTER or Send"
            autoFocus
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default Input;



