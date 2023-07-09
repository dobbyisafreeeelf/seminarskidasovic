import React, { Component } from "react";
import "./App.css";
import Messages from "./components/Messages";
import Input from "./components/Input";

function generateRandomName() {
  const adjectives = [
    "brave",
    "creative",
    "daring",
    "elegant",
    "fierce",
    "gracious",
    "harmonious",
    "innovative",
    "joyful",
    "kind",
    "lovely",
    "magnificent",
    "noble",
    "optimistic",
    "passionate",
    "quirky",
    "radiant",
    "sincere",
    "talented",
    "unique",
    "vibrant",
    "witty",
    "xenial",
    "youthful",
    "zealous",
  ];
  const nouns = [
    "butterfly",
    "dreamer",
    "explorer",
    "gazer",
    "hero",
    "inventor",
    "journeyer",
    "keeper",
    "learner",
    "maker",
    "navigator",
    "observer",
    "pioneer",
    "questioner",
    "resilient",
    "seeker",
    "trailblazer",
    "unifier",
    "visionary",
    "wanderer",
    "x-factor",
    "yearner",
    "zealot",
  ];
  const adjective = capitalizeFirstLetter(adjectives[Math.floor(Math.random() * adjectives.length)]);
  const noun = capitalizeFirstLetter(nouns[Math.floor(Math.random() * nouns.length)]);
  return adjective + " " + noun;
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const usedColors = [];

function generateRandomColor() {
  const colors = ["#586863", "#BCB695", "#B69769", "#2D1519", "#835D55", "#B09379", "#2D3127", "#5B5E42", "#AF713A", "#4D292A", "#684F5A", "#907178", "#483429", "#A14A3D", "#B3795F", "#C6ADB3", "#3D3F43", "#87A8A8", "#383645", "#5A483E"];
  let color = colors[Math.floor(Math.random() * colors.length)];
  
  while (usedColors.includes(color)) {
    color = colors[Math.floor(Math.random() * colors.length)];
  }

  usedColors.push(color);
  return color;
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: generateRandomName(),
      color: generateRandomColor(),
    },
  };

  constructor() {
    super();
    this.drone = new window.Scaledrone("eUC2CO8WUrhsKvzK", {
      data: this.state.member,
    });
  }

  componentDidMount() {
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });

    const room = this.drone.subscribe("observable-room");
    room.on("data", (data, member) => {
      const messages = [...this.state.messages];
      messages.push({ member, text: data, timestamp: Date.now() });
      this.setState({ messages });
    });
  }

  render() {
    return (
      <div className="ChatApp">
        <div className="ChatApp-header">
          <h1>Welcome to Chatify!</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message,
    });
  };
}

export default App;

