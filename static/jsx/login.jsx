class LoginView extends React.Component {   
    constructor(props) {
        super(props);

        this.props.socket.on('validationError', (data) => {
            this.setState({
                errorMsg: data.error
            })
        })

        this.state = {
            validuser: "validate",
            validpass: "validate",
            errorMsg: ""                  
        }

        this.loginOnClick = this.loginOnClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    loginOnClick(ev) {
        
        ev.preventDefault();
        
        if(document.querySelector("#username").value === '') {
            this.setState({
                validuser: "validate invalid",
            })

            return;
        }

        if(document.querySelector("#passwd").value === '') {
            this.setState({
                validpass: "validate invalid",
            })

            return;
        }

        this.setState({
            errorMsg:        
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        });

        this.props.socket.emit('postedUser', {
            postUser: document.querySelector("#username").value,
            postPasswd: document.querySelector("#passwd").value
        });
    }

    handleKeyDown (ev) {
        if(ev.keyCode === 13) {
            ev.preventDefault();
            this.loginOnClick(ev);
        }
    }
    
    render() {
        return (
        <div className="container" onKeyDown={this.handleKeyDown} >
            <div className="row">
            <div className="col s12 m12 l6 offset-l3">
            <div id="loginbox" className="card-panel hoverable z-depth-1 center">
                <div id="login-form">
                    <h4 id="nameapp" className="blue-text text-darken-2"><i className="material-icons">wifi</i> UO</h4>
                    <h5 className="blue-text">Registrar Dispositivos</h5>
                    <div id="error-msg"><span className="red-text text-darken-3">
                        {this.state.errorMsg}
                    </span></div>
                    <div className="input-field">
                        <input id="username" type="text" name="username" placeholder="Usuario" required="true" className={this.state.validuser}/><br/>
                        <input id="passwd" type="password" name="passwd" placeholder="Contraseña" required="true" className={this.state.validpass} /><br/>
                    </div>
                    <button id="loginbtn" onClick={this.loginOnClick} className="waves-effect waves-light btn blue">Aceptar</button>
                </div>
            </div>
            </div>
            </div>
        </div>
        );
    }
}