// The provider pattern
import React, {Fragment, useState, useContext, createContext, useEffect} from 'react'
import {Switch} from '../switch'

const ToggleContext = createContext({
  on: false,
  toggle: () =>{}
})
const ToggleConsumer = (props) => {
  const context = useContext(ToggleContext);
  return props.children(context)

}

const Toggle = (props) => {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);
  return(
      <ToggleContext.Provider value={{on, toggle}} {...props}/>
    )
}

const Layer1 = () => <Layer2 />
const Layer2 = () => {
  return <ToggleConsumer>
    {({on}) => (
      <Fragment>
        {on ? 'The button is on' : 'The button is off'}
        <Layer3 />
      </Fragment>
    )}
  </ToggleConsumer>
};
const Layer3 = () => <Layer4 />

const Layer4 = () => {
  return <ToggleConsumer>
      {({on, toggle}) => <Switch on={on} onClick={toggle} />}
    </ToggleConsumer>
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Layer1 />
    </Toggle>
  )
}

Usage.title = 'The Provider Pattern'

export {Toggle, Usage as default}
