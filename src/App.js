import React from 'react';
import { useState, useEffect } from 'react';

const App = () => {
  let [tempColor, setTempColor] = useState('cold');
  const [value, setValue] = useState(10);
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedDown, setIsClickedDown] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isRunningDown, setIsRunningDown] = useState(false);

    useEffect(() => {
       if(isClicked(true) && isRunning(true) && value >=15) {
           setTempColor = 'hot';
       } else if (isClickedDown(true) && isRunningDown(true) && value < 15) {
           setTempColor = 'cold';
       }
    });

    useEffect(() => {
        if (isClicked) {
            setValue((value) => value + 1);
            setIsClicked(false);
        }
    }, [isClicked]);

    useEffect(() => {
        if (isClickedDown) {
            setValue((value) => value - 1);
            setIsClickedDown(false);
        }
    }, [isClickedDown]);

    useEffect(() => {
        if (isRunning) {
            const id = window.setInterval(() => {
                setValue((value) => value + 1);
            }, 125);
            return () => window.clearInterval(id);
        }
    }, [isRunning]);

    useEffect(() => {
        if (isRunningDown) {
            const id = window.setInterval(() => {
                setValue((value) => value - 1);
            }, 125);
            return () => window.clearInterval(id);
        }
    }, [isRunningDown]);

  return (
      <div className='app-container'>
        <div className='temperature-display-container'>
          <div className={`temperature-display ${tempColor}`}>{value}°C</div>
        </div>
        <div className='button-container'>
          <button
              onClick={() => setIsClicked(true)} onMouseDown={() => setIsRunning(true)}
              onMouseUp={() => setIsRunning(false)}>+</button>
          <button
              onClick={() => setIsClickedDown(true)} onMouseDown={() => setIsRunningDown(true)}
              onMouseUp={() => setIsRunningDown(false)}>-</button>
        </div>
      </div>
  );
};

export default App;