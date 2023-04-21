const Countdown = (props) => {
  return (
    <div className="time-left">
      <span className="timerTitle">{props.resting
      ?'Break':'Session'
      }</span>
      <span id="time-left">

      {Math.floor(props.timer     / 60)}:{props.timer%60<10?'0'+props.timer%60:props.timer%60}
      </span>
    </div>
  );
};

export default Countdown;
