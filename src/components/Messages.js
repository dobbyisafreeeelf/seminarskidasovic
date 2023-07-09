import React, { Component } from "react";

class Messages extends Component {
  render() {
    const { messages } = this.props;
    return (
      <ul className="Messages-list">
        {messages.map((message, index) => this.renderMessage(message, index))}
      </ul>
    );
  }

  renderMessage(message, index) {
    const { member, text, timestamp } = message;
    const { currentMember } = this.props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";

    const username = member.clientData && member.clientData.username ? member.clientData.username : "";

    return (
      <li key={index} className={className}>
        <div className="avatar" style={{ backgroundColor: member.clientData.color }}>
          {getInitials(username)}
        </div>
        <div className="Message-content">
          <div className="message-header">
            <div className="username">{username}</div>
            <div className="Messages-timestamp">{this.formatTimestamp(timestamp)}</div>
          </div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }

  formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  }
}

function getInitials(username) {
  const parts = username.split(" ");
  return parts
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export default Messages;
