# Get element and Event in React

### There are two type of component in react (Functional & Class)

## Get element for functional component

### `const ref = React.useReaf()`

This is used to get the element in functional components

### `React.useEffect(()=>{...})`

Because of react render the funtion at the end so if we want to get the element data we need to wrap it.
This funtion us used to get get data. It use a callback method to get the data from component

### `ref.current`

This is used to get the current component

## Get element for class component

### `ref = React.createRef()`

This is used to get the element in class components

### `componentDidMount() {...}`

This is used to get component data after DOM loads.

### Example

### `componentDidMount() {this.ctx = this.ref.current.getContext("2d");}`

# Event in React (Get the current event data)

The event object returned by react is a react SyntheticEvent which wraps the normal JavaScript event object
and contains some cross browser conveniences.

### `e.nativeEvent`

**Note: In React The event object returned by react is a react SyntheticEvent which wraps the** **normal JavaScript event object**
**and contains some cross browser conveniences**

That's why we nee to call it as e.nativeEvent.offsetX
here `nativeEvent` helps us to get the actual event.
