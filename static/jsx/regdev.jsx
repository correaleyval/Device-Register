class RegDev extends React.Component {
    constructor(props) {
        super(props);

        this.props.socket.on('validationError', (data) => {
            this.setState({
                errorMsg: data.error
            })
        })

        this.RegisterDev = this.RegisterDev.bind(this);
        this.logout = this.logout.bind(this);
        this.help = this.help.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.state = {
            validMAC1: "validate",
            validMAC2: "validate",
            validMAC3: "validate",
            errorMsg: ""
        }
    }

    onChange(e) {
        var mac_old = e.target.value.toUpperCase();

        var mac_clean = '';

        var mac='';

        for(var i = 0; i < mac_old.length && i < 17; i++)
            if((mac_old[i] >= '0' && mac_old[i] <= '9') || (mac_old[i] >= 'A' && mac_old[i] <= 'F'))
                mac_clean += mac_old[i];

        for(var i = 0; i < mac_clean.length; i++) {
            mac += mac_clean[i];

            if((i+1) % 2 == 0 && i+1 < mac_clean.length)
                mac += ':';
        }

        e.target.value = mac;
    }

    RegisterDev() {
        var mac1 = document.querySelector("#mac1").value;
        var mac2 = document.querySelector("#mac2").value;
        var mac3 = document.querySelector("#mac3").value;

        if(mac1.length > 0 && mac1.length < 17) {
            this.setState({
                validMAC1: "validate invalid",
            })
            return;
        }

        if(mac2.length > 0 && mac2.length < 17) {
            this.setState({
                validMAC2: "validate invalid",
            })
            return;
        }

        if(mac3.length > 0 && mac3.length < 17) {
            this.setState({
                validMAC3: "validate invalid",
            })
            return;
        }
        if(mac1 != '' || mac2 != '' || mac3 != '') {
            this.setState({
                errorMsg:
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            });

            this.props.socket.emit('macSended', {mac1, mac2, mac3});
        }
    }

    handleKeyDown (ev) {
        if(ev.keyCode === 13) {
            ev.preventDefault();
            this.RegisterDev(ev);
        }
    }

    logout() {
        ReactDOM.render(<LoginView socket={this.props.socket}/>, document.getElementById('app'));
    }

    help() {
        ReactDOM.render(<Help socket={this.props.socket}/>, document.getElementById('app'));
    }

    render() {

        return (
        <div className="container" onKeyDown={this.handleKeyDown}>
            <div className="row">
            <div className="col s12 m12 l6 offset-l3">
            <div id="registerbox" className="card-panel hoverable z-depth-1 center">
                <div className="card-panel blue row">
                    <div className="col s12">
                        <i className="material-icons">account_circle</i><span className="white-text text-darken-3 col s12 md8">{localStorage.username}</span>
                    </div>
                    <div className="col s12">
                        <a className="btn-floating btn-large waves-effect waves-light blue" onClick={this.logout}><i title="Salir" className="material-icons">exit_to_app</i></a>
                        <a className="btn-floating btn-large waves-effect waves-light blue" onClick={this.help}><i title="Ayuda" className="material-icons">help</i></a>
                    </div>
                </div>
                <div className="card-panel white row">
                    <div id="error-msg"><span className="red-text text-darken-3">
                        {this.state.errorMsg}
                    </span></div>
                    <ul className="col md12 s12">
                        <li>
                            <div className="input-field col s12">
                                <input autoFocus placeholder="00:00:00:00:00:00" id="mac1" type="text" onChange={this.onChange} className={this.state.validMAC1}/>
                            </div>
                        </li>
                        <li>
                            <div className="input-field col s12">
                                <input placeholder="00:00:00:00:00:00" id="mac2" type="text" onChange={this.onChange} className={this.state.validMAC2}/>
                            </div>
                        </li>
                        <li>
                            <div className="input-field col s12">
                                <input placeholder="00:00:00:00:00:00" id="mac3" type="text" onChange={this.onChange} className={this.state.validMAC3}/>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="row center">
                    <button id="loginbtn" onClick={this.RegisterDev} className="waves-effect waves-light btn blue">Registrar</button>
                </div>
            </div>
            </div>
            </div>
        </div>
        );
    }
}
