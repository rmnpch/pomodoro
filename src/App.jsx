import React, { useState, useEffect, useRef } from "react";
import Countdown from "./Countdown";

export default function App() {
  const [rest, setRest] = useState(5);
  const [session, setSession] = useState(25);
  const [timer, setTimer] = useState(1500);
  const [start, setStart] = useState(false);
  const [isResting, setResting] = useState(false);

  function setIncrementDecrement(event) {
    setStart(false);
    switch (event.target.id) {
      case "break-decrement":
        rest > 1 && setRest((prev) => prev - 1);
        break;
      case "break-increment":
        rest < 60 && setRest((prev) => prev + 1);
        break;
      case "session-decrement":
        session > 1 && setSession((prev) => prev - 1);
        break;
      case "session-increment":
        session < 60 && setSession((prev) => prev + 1);
        break;
      default:
        break;
    }
  }

  function startStop() {
    console.log('button')
    setStart(!start);
  }

  //stop timer and reset break to 5min and session to 25min
  function reset() {
    setStart(false);
    setRest(5);
    setSession(25);
    setTimeout(() => {
      setTimer(1500);
    }, 100);
    setResting(false);
    document.getElementById("beep").currentTime = 0;
  }

  //update timer when session or break changes
  useEffect(() => {
    isResting ? setTimer(rest * 60) : setTimer(session * 60);
  }, [session, rest, isResting]);

  //decrease timer each second
  useEffect(() => {
    if (timer > 0 && start) {
      console.log('entrando no if')
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
        setResting(!isResting);
        // play audio each time timer zeroes
        document.getElementById("beep").play();
      }
  }, [timer, start]);

    return (
    <div className="App" id="pomodoro">
      <div>
        <h1 className="title">Pomodoro Timer</h1>
      </div>
      <div className="setup">
        <div id="break-label">
          <p> Break Length</p>
          <div className="changeTime">
            <button onClick={setIncrementDecrement} id="break-decrement">
              ↓
            </button>
            <span id="break-length">{`${rest}`}</span>
            <button onClick={setIncrementDecrement} id="break-increment">
              ↑
            </button>
          </div>
        </div>
        <div id="session-label">
          <p> Session Length</p>
          <div className="changeTime">
            <button onClick={setIncrementDecrement} id="session-decrement">
              ↓
            </button>
            <span id="session-length">{`${session}`}</span>
            {/* <span id="session-length">{`${session}:00`}</span> */}
            <button onClick={setIncrementDecrement} id="session-increment">
              ↑
            </button>
          </div>
        </div>
      </div>

      <div id="timer-label">
        <Countdown timer={timer} resting={isResting} />

        <div className="buttons">
          <button id="start_stop" onClick={startStop}>
            <i
              className={
                start
                  ? "fa-solid fa-light fa-pause"
                  : "fa-solid fa-light fa-play"
              }
            />
          </button>
          <button id="reset" onClick={reset}>
            <i className="fa fa-refresh" />
          </button>
        </div>
      </div>

      <audio
        id="beep"
        src="https://www.pacdv.com/sounds/interface_sound_effects/sound10.mp3"
        type="audio/mp3"
      ></audio>

      <div className="signature">Ramon Pacheco - Apr. 2023</div>
    </div>
  );
}
