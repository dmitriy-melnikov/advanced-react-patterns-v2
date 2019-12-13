import React, {useState, useEffect} from 'react'
import {Switch} from '../switch'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))
const getInitialState = (args) => args || false;
const Toggle = (props) => {

  //const [on, setOn] = useState(Toggle.initialOn)
  const [on, setOn] = useState(getInitialState(props.initialOn))
  useEffect(() => {
    props.onToggle(on);
  },[on])
  const toggle = () => {
    setOn((previousOn) => !previousOn);
  }


  const reset = () => {
    setOn(false);
    props.onReset(getInitialState(props.initialOn))
  }

  const getTogglerProps = ({onClick, ...props} = {}) => {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }

  const getStateAndHelpers = () => {
    return {
      on,
      toggle,
      reset,
      getTogglerProps,
    }
  }

  return props.children(getStateAndHelpers())

}

Toggle.defaultProps = {
  initialOn: false
}


function Usage({
                 initialOn = false,
                 onToggle = (...args) => console.log('onToggle', ...args),
                 onReset = (...args) => console.log('onReset', ...args),
               }) {
  return (
    <Toggle
      initialOn={initialOn}
      onToggle={onToggle}
      onReset={onReset}
    >
      {({getTogglerProps, on, reset}) => (
        <div>
          <Switch {...getTogglerProps({on})} />
          <hr/>
          <button onClick={() => reset()}>Reset</button>
        </div>
      )}
    </Toggle>
  )
}

Usage.title = 'State Initializers'

export {Toggle, Usage as default}
