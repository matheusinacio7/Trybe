class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

class Image extends React.Component {
  render() {
    return <img src={this.props.source} alt={this.props.alternativeText} />;
  }
}

class UserProfile extends React.Component {
  render() {
    return (
      <div>
        <p> {this.props.user.name} </p>
        <p> {this.props.user.email} </p>
        <Image source={this.props.user.avatar} alternativeText="User avatar" />
      </div>
    );
  }
}

const joao = {
  id: 102,
  name: "João",
  email: "joao@gmail.com",
  avatar: "https:\/\/cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_640.png"
};

const amelia = {
  id: 77,
  name: "Amélia",
  email: "amelia@gmail.com",
  avatar: "https:\/\/cdn.pixabay.com/photo/2017/01/31/13/05/cameo-2023867_640.png"
};

const users = [joao, amelia];

ReactDOM.render(
  <App>
    {users.map((user) => <UserProfile user={user} key={user.id} />)}
  </App>,
  document.getElementById('root'),
);