import React from 'react'
import {Switch} from '../switch'

// Right now our component can only clone and pass props to immediate children.
// So we need some way for our compound components to implicitly accept the on
// state and toggle method regardless of where they're rendered within the
// Toggle component's "posterity" :)
//
// The way we do this is through context. React.createContext is the API we
// want. Here's a simple example of that API:
//
// const defaultValue = 'light'
// const ThemeContext = React.createContext(defaultValue)
//   Note: The `defaultValue` can be an object, function, or anything.
//   It's simply what React will use if the ThemeContext.Consumer is rendered
//   outside a ThemeContext.Provider
//   In our situation, it wouldn't make sense to render a Consumer outside a
//   Provider, so you don't have to specify a defaultValue. One of the extra
//   credit items shows how to throw a helpful error message if someone attempts
//   to render a Consumer without a Provider.
//
// ...
// <ThemeContext.Provider value={this.state}>
//   {this.props.children}
// </ThemeContext.Provider>
// ...
//
// ...
// <ThemeContext.Consumer>
//   {contextValue => <div>The current theme is: {contextValue}</div>}
// </ThemeContext.Consumer>
// ...
//
// NOTE: Spacing matters!! For example, these are not the same:
// <Context.Consumer> {val => val} </Context.Consumer>
// <Context.Consumer>{val => val}</Context.Consumer>
//
// To visualize the difference, here's what these would be with a named children prop:
// <Context.Consumer children={[' ', {val => val}, ' ']} />
// <Context.Consumer children={val => val} />
// make sure that you don't have the extra space in there
//   (newlines are ok, like in the above example)

// 🐨 create a ToggleContext with React.createContext here

const ToggleContext = React.createContext({
	on: false,
	toggle: () => {
	}
});

class Toggle extends React.Component {

	static On = ({children}) => <ToggleContext.Consumer>{contextValue => (contextValue.on ? children : null)}</ToggleContext.Consumer>;
	static Off = ({children}) => <ToggleContext.Consumer>{contextValue => (contextValue.on ? null : children)}</ToggleContext.Consumer>;
	static Button = props => <ToggleContext.Consumer>
		{contextValue => (<Switch on={contextValue.on} onClick={contextValue.toggle} {...props}/>)}
	</ToggleContext.Consumer>;



	toggle = () =>
		this.setState(
			({on}) => ({on: !on}),
			() => this.props.onToggle(this.state.on),
		);

	state = {on: false, toggle: this.toggle};

	render() {
		return (
			<ToggleContext.Provider value={this.state}
			>
				{this.props.children}
			</ToggleContext.Provider>
		)
	}
}

// 💯 Extra credit: rather than having a default value, make it so the consumer
// will throw an error if there's no context value to make sure people don't
// attempt to render one of the compound components outside the Toggle.
// 💯 Extra credit: avoid unnecessary re-renders of the consumers by not
// creating a new `value` object ever render and instead passing an object
// which only changes when the state changes.


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
