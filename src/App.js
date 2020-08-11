import React, {useRef} from 'react';
import { useState, useEffect } from 'react';

const App = () => {
  let [tempColor, setTempColor] = useState('cold');
  const [value, setValue] = useState(10);
  const[isRunning, setIsRunning] = useState(false);
  const [isRunningDown, setRunningDown] = useState(false);

    const countEl = useRef(null);
    const counterTemp = () => {
        if (countEl.current >= 15) {
            setTempColor = 'hot';
        } else if(countEl < 15) {
            setTempColor = 'cold';
        }

    };

  useEffect(() => {
      if(isRunning) {
          const id = window.setInterval(() => {
              setValue(value => value + 1);
          }, 125);
          return () => window.clearInterval(id);
      }
      if(isRunningDown) {
          const id = window.setInterval(() => {
              setValue(value => value - 1);
          }, 125);
          return () => window.clearInterval(id);
      }
  }, [isRunning, isRunningDown]);



  return (
      <div className='app-container'>
        <div className='temperature-display-container'>
          <div className={`temperature-display ${tempColor}`}>{value}°C</div>
        </div>
        <div className='button-container'>
          <button ref={counterTemp()} onMouseDown={()=> setRunningDown(true)} onMouseUp={()=> setRunningDown(false)}>-</button>
          <button onMouseDown={()=> setIsRunning(true)} onMouseUp={()=> setIsRunning(false)}>+</button>
        </div>
      </div>
  );
};

export default App;