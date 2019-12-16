import React, {useState, useEffect, createContext, useContext} from 'react'
import {Switch} from '../switch'

const ToggleContext = createContext({
  on: false,
  toggle: () => {
  },
})

const Toggle = (props) => {
  const [on, setOn] = useState(false)
  useEffect(() => props.onToggle(on))
  const toggle = () => setOn(!on)
  return (
    <ToggleContext.Provider value={{on, toggle}}
    >
      {props.children}
    </ToggleContext.Provider>
  )

}

Toggle.On = ({children}) => {
  const context = useContext(ToggleContext);
  return context.on ? children : null
}

Toggle.Off = ({children}) => {
  const context = useContext(ToggleContext);
  return context.on ? null : children
}

Toggle.Button = props => {
  const context = useContext(ToggleContext);
  return <Switch on={context.on} onClick={context.toggle} {...props}/>
}



function Usage({
                 onToggle = (...args) => console.log('onToggle', ...args),
               }) {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <div>
        <Toggle.Button/>
      </div>
    </Toggle>
  )
}

Usage.title = 'Flexible Compound Components'

export {Toggle, Usage as default}
