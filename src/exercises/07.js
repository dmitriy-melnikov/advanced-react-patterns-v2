import React, {useState, useEffect} from 'react'
import {Switch} from '../switch'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

const Toggle = (props) => {

  //const [on, setOn] = useState(Toggle.initialOn)
  const [on, setOn] = useState(props.initialOn)
  const toggle = () => setOn(!on)
  useEffect(() => props.onToggle(on))

  const reset = () => setOn(Toggle.initialOn)
  useEffect(() => props.onReset(on))


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
