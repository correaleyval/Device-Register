class Help extends React.Component {
    constructor(props) {
        super(props);

        this.backView = this.backView.bind(this);
    }

    backView () {
        ReactDOM.render(<RegDev socket={this.props.socket}/>, document.getElementById('app'));
    }

  render() {
    return (
    <div className="container">
    <div className="row">
    <div className="col s12 m12 l6 offset-l3">
    <div id="helpbox" className="card-panel hoverable z-depth-1 center">
        <div className="row">
            <a className="btn-floating btn-large waves-effect waves-light blue" onClick={this.backView}><i title="Atrás" className="material-icons">exit_to_app</i></a>
        </div>
        <div className="row">
            <video className="responsive-video" controls>
                <source src="video.mp4" type="video/mp4" />
            </video>
        </div>
    </div>
    </div>
    </div>
    </div>
    );
  }
}
      