RenderView = (view) => {
    ReactDOM.render(view, document.getElementById('app'));
}

$(document).ready(function () {
    var socket = io();
    
    RenderView(<LoginView socket={socket}/>);

    socket.on('renderDevReg', function(data) {
        localStorage.setItem("username", data.user);
        RenderView(<RegDev socket={socket} user={data.user} uid={data.uid} />);
    });
});

