class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

class Order extends React.Component {
  render() {
    const { user, product, price } = this.props.order;

    return (
      <div className="order">
        <p> {user} bought {product} for {price.value} {price.currency} </p>
      </div>
    );
  }
}

const headphone = {
  id: 102,
  user: "cena@gmail.com",
  product: "Razer Headphone",
  price: {
    value: 99.99,
    currency: "dollars"
  }
};

const energyDrink = {
  id: 77,
  user: "cena@gmail.com",
  product: "Monster 500mL",
  price: {
    value: 9.99,
    currency: "dollars"
  }
};

const orders = [ headphone, energyDrink ];

// O que o componente App é em relação a Order ?
// R: Pai

ReactDOM.render(
  <App>
    <h1> Orders recently created </h1>
    {
      orders.map((order) => <Order order={order} key={order.id}/>)
    }
  </App>,
  document.getElementById('root'),
);