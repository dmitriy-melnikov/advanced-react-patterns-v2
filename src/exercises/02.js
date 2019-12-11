import React, {cloneElement, Children, useEffect, useState} from 'react'
import { Switch } from '../switch'

const Toggle = ({onToggle, children}) => {
  const [on, setOn] = useState(false)
  useEffect(() => onToggle(on))
  const toggle = () => setOn(!on);

  return (
    Children.map(children, (childElement => {
      return cloneElement(childElement, {on, toggle})
    }))
  )
}

Toggle.On = (props) => props.on ? props.children : null;
Toggle.Off = (props) => !props.on ? props.children : null;
Toggle.Button = ({on, toggle}) => <Switch on={on} onClick={toggle}/>;

function Usage({onToggle = (...args) => console.log('onToggle', ...args),}) {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button/>
    </Toggle>
  )
}

Usage.title = 'Compound Components'

export {Toggle, Usage as default}
