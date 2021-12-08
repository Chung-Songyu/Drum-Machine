import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

const audioOne = [
  {
    id: "Heater-1",
    innerText: "Q",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    id: "Heater-2",
    innerText: "W",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    id: "Heater-3",
    innerText: "E",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    id: "Heater-4",
    innerText: "A",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    id: "Clap",
    innerText: "S",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    id: "Open-HH",
    innerText: "D",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    id: "Kick-n'-Hat",
    innerText: "Z",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    id: "Kick",
    innerText: "X",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    id: "Closed-HH",
    innerText: "C",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

const audioTwo = [
  {
    id: "Chord-1",
    innerText: "Q",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  },
  {
    id: "Chord-2",
    innerText: "W",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  },
  {
    id: "Chord-3",
    innerText: "E",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  },
  {
    id: "Shaker",
    innerText: "A",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  },
  {
    id: "Open-HH",
    innerText: "S",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  },
  {
    id: "Closed-HH",
    innerText: "D",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  },
  {
    id: "Punchy-Kick",
    innerText: "Z",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  },
  {
    id: "Side-Stick",
    innerText: "X",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  },
  {
    id: "Snare",
    innerText: "C",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  }
];

class ButtonGrid extends React.Component {
  render() {
    const mobileButtonGrid = document.documentElement.clientWidth<830? "col-12 no-gutters row px-3 pt-2 m-auto justify-content-center": "col-6 no-gutters row p-3 m-auto justify-content-center";
    const currentAudio = this.props.soundBank==="1"? audioOne: audioTwo;
    return (
      <div className={mobileButtonGrid} id="buttons">
        {currentAudio.map((audioBank, index, array) => (
          <Button buttonId={array[index].id} buttonText={array[index].innerText} buttonAudio={array[index].audio} buttonCode={array[index].innerText.charCodeAt(0)} volume={this.props.volume} changeText={this.props.changeText} resetText={this.props.resetText} power={this.props.power}/>
        ))}
      </div>
    )
  };
}

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(e) {
    if (e.keyCode === this.props.buttonCode) {
      this.playAudio();
    }
  }

  playAudio() {
    const audio = document.getElementById(this.props.buttonText);
    audio.currentTime = 0;
    audio.play();
    audio.volume = this.props.volume/100;
    this.props.changeText(this.props.buttonId);
    this.props.resetText();
    document.getElementById(this.props.buttonId).classList.add("buttonPress");
    const removeButtonPress = () => {
      return document.getElementById(this.props.buttonId).classList.remove("buttonPress")
    };
    setTimeout(removeButtonPress, 250);
  }

  render() {
    const powerOnButton = this.props.power? this.playAudio.bind(this): null;
    return (
      <button className="drum-pad col-3 m-1" id={this.props.buttonId} onClick={powerOnButton}>
        <audio className="clip" id={this.props.buttonText} src={this.props.buttonAudio}/>{this.props.buttonText}
      </button>
    )
  };
}

class DisplayPanel extends React.Component {
  render() {
    const mobileDisplayPanel = document.documentElement.clientWidth<830? "my-3 p-3 text-center": "mt-5 mb-3 p-3 text-center";
    return (
      <div className={mobileDisplayPanel} id="display-panel">{this.props.displayText}
      </div>
    )
  };
}

class Volume extends React.Component {
  render() {
    return (
      <input type="range" className="mb-2 cursor" id="slider" min="0" max="100" onChange={this.props.volumeNew}/>
    )
  };
}

class AudioBank extends React.Component {
  render() {
    const showLeft = this.props.soundBank==="2"? "fas fa-caret-left mx-1 cursor": "fas fa-caret-left mx-1 visibility";
    const showRight = this.props.soundBank==="1"? "fas fa-caret-right mx-1 cursor": "fas fa-caret-right mx-1 visibility";
    const mobileAudioBank = document.documentElement.clientWidth<830? "audio-bank": "mb-auto audio-bank";
    const powerOnAudioBank = this.props.power? this.props.changeBank: null;
    return (
      <div className={mobileAudioBank}>
        Audio bank <i class={showLeft} onClick={powerOnAudioBank}></i><i class={showRight} onClick={powerOnAudioBank}></i>
      </div>
    )
  };
}

class PowerButton extends React.Component {
  render() {
    const powerStyle = this.props.power? "fas fa-power-off on": "fas fa-power-off off";
    const mobilePowerButton = document.documentElement.clientWidth<830? " mt-2 mb-3 p-2": " align-self-end m-4 p-2";
    const combinedStyle = powerStyle.concat(mobilePowerButton);
    return (
      <i class={combinedStyle} onClick={this.props.onOff}></i>
    )
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: "",
      volume: 50,
      soundBank: "1",
      power: true
    };
  };

  changeText(text) {
    this.setState({
        displayText: text
    });
  }

  resetText() {
    const emptyText = () => {
      return this.changeText("")
    };
    setTimeout(emptyText, 1500);
  }

  volumeNew(e) {
    if(this.state.power) {
      this.setState({
        volume: e.target.value
      });
      this.changeText("Volume: " + e.target.value);
      this.resetText();
    }
  }

  changeBank() {
    if(this.state.soundBank==="1") {
      this.setState({
        soundBank: "2"
      });
      this.changeText("Audio 2");
      this.resetText();
    } else {
      this.setState({
        soundBank: "1"
      });
      this.changeText("Audio 1");
      this.resetText();
    }
  }

  goodbye() {
    const G = () => {
      return this.changeText("G")
    };
    const Go = () => {
      return this.changeText("Go")
    };
    const Goo = () => {
      return this.changeText("Goo")
    };
    const Good = () => {
      return this.changeText("Good")
    };
    const Goodb = () => {
      return this.changeText("Goodb")
    };
    const Goodby = () => {
      return this.changeText("Goodby")
    };
    const Goodbye = () => {
      return this.changeText("Goodbye")
    };
    const Goodbyee = () => {
      return this.changeText("Goodbye!")
    };
    const emptyText = () => {
      return this.changeText("")
    };
    setTimeout(G, 250);
    setTimeout(Go, 500);
    setTimeout(Goo, 750);
    setTimeout(Good, 1000);
    setTimeout(Goodb, 1250);
    setTimeout(Goodby, 1500);
    setTimeout(Goodbye, 1750);
    setTimeout(Goodbyee, 2000);
    setTimeout(emptyText, 3000);
  }

  onOff() {
    if(this.state.power) {
      this.setState({
        power: false
      });
      this.goodbye();
    } else {
      this.setState({
        power: true
      });
      this.changeText("Power: ON");
      this.resetText();
    }
  }

  render() {
    const mobileRight = document.documentElement.clientWidth<830? "col-12 d-flex flex-column align-items-center": "col-6 d-flex flex-column align-items-center";
    const mobileHeight = document.documentElement.clientHeight<510? "container-fluid h-100 d-flex flex-column align-items-center justify-content-center": "container-fluid vh-100 d-flex flex-column align-items-center justify-content-center";
    return (
      <div className={mobileHeight}>
        <div id="title" className="text-nowrap mb-2">Drum Machine</div>
        <div id="drum-machine">
          <div id="display" className="no-gutters row h-100">
            <ButtonGrid power={this.state.power} volume={this.state.volume} soundBank={this.state.soundBank} changeText={this.changeText.bind(this)} resetText={this.resetText.bind(this)}/>
            <div className={mobileRight} id="panel">
              <DisplayPanel displayText={this.state.displayText}/>
              <label for="volume">Volume</label>
              <Volume power={this.state.power} volumeNew={this.volumeNew.bind(this)}/>
              <AudioBank power={this.state.power} soundBank={this.state.soundBank} changeBank={this.changeBank.bind(this)}/>
              <PowerButton power={this.state.power} onOff={this.onOff.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    )
  };
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
