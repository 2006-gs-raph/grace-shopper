import React from 'React'

class ProdQtyButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1,
      show: true,
      max: 100,
      min: 0
    }
  }

  IncrementItem = () => {
    this.setState(prevState => {
      if (prevState.quantity < 9) {
        return {
          quantity: prevState.quantity + 1
        }
      } else {
        return null
      }
    })
  }
  DecreaseItem = () => {
    this.setState(prevState => {
      if (prevState.quantity > 0) {
        return {
          quantity: prevState.quantity - 1
        }
      } else {
        return null
      }
    })
  }

  ToggleClick = () => {
    this.setState({
      show: !this.state.show
    })
  }

  handleChange = event => {
    this.setState({quantity: event.target.value})
  }

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary mx-2 mb-2"
          onClick={this.DecreaseItem}
        >
          -
        </button>
        <input
          // className="btn"
          value={this.state.quantity}
          onChange={this.handleChange}
        />
        <button
          type="button"
          className="btn btn-primary mx-2 mb-2"
          onClick={this.IncrementItem}
        >
          +
        </button>
      </div>
    )
  }
}

export default ProdQtyButton
