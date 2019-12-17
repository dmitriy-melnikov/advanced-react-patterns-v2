import React, {Fragment, useEffect, useContext, useState} from 'react'
// 🐨 you're going to need this :)
// import hoistNonReactStatics from 'hoist-non-react-statics'
import {Switch} from '../switch'

const ToggleContext = React.createContext();

const ToggleConsumer = (props) => {
  const context = useContext(ToggleContext);
  return props.children(context);
}

const Toggle = (props) => {
  const [on, setOn] = useState(false);
  useEffect(() => {props.onToggle(on)}, [on]);
  const toggle = () => setOn(!on);
  return (
      <ToggleContext.Provider value={{on, toggle}} {...props} />
    )

}

/*function withToggle(Component) {
  return (props) => {
    const context = useContext(ToggleContext);
    //console.log('context', context);
    return <Component {...context} {...props} />
  }
}*/

function withToggle(Component) {
  function Wrapper(props) {
    return(
      <ToggleConsumer {...props}>
        {(props) => <Component {...props}/>}
      </ToggleConsumer>
    )
  }
  Wrapper.displayName = `withToggle(${Component.displayName || Component.name})`;
  return Wrapper
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
const Layer1 = () => <Layer2 />
const Layer2 = withToggle(({ on, toggle, }) => (
  <Fragment>
    {on ? 'The button is on' : 'The button is off'}
    <Layer3 />
  </Fragment>
))
const Layer3 = () => <Layer4 />
const Layer4 = withToggle(({on, toggle}) => (
  <Switch on={on} onClick={toggle} />
))

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Layer1 />
    </Toggle>
  )
}
Usage.title = 'Higher Order Components'

export {Toggle, withToggle, Usage as default}
