class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.children}</div>
  }
}


class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteRegion: 'targon',
    };

    this.handleSelectRegion = this.handleSelectRegion.bind(this);
  }

  handleSelectRegion(e) {
    this.setState({favoriteRegion: e.target.value});
  }

  render() {
    return(
      <form className="form">
        <input type="text" name="nickname" placeholder="Qual seu nickname?"/>
        <input type="email" name="email" placeholder="Qual seu email mais organizado?"/>
        
        <label htmlFor="form__favorite-region">Escolha sua Região Favorita do LoR</label>
        <select
          name="favorite-retion" 
          id="form__favorite-region"
          value={this.state.favoriteRegion}
          onChange={this.handleSelectRegion}
          >
          <option value="demacia">Demacia</option>
          <option value="noxus">Noxus</option>
          <option value="ionia">Ionia</option>
          <option value="freljord">Freljord</option>
          <option value="shadow-isles">Shadow Isles</option>
          <option value="piltover-and-zaun">Piltover &amp; Zaun</option>
          <option value="bilgewater">Bilgewater</option>
          <option value="targon">Targon</option>
          <option value="shurima">Shurima</option>
        </select>
        <textarea name="reason" cols="30" rows="10" placeholder="Descreva o motivo de você preferir esta região."></textarea>
      </form>
    );
  }
}


ReactDOM.render(
  <App>
    <Form />
  </App>,
  document.getElementById('root'),
);