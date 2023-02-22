let peer = new Peer();

peer.on('open', peerId => {
    console.log(`Peer ID: ${peerId}`);
})

let conn = null;

peer.on('connection', dataConnection => {
    if (conn) {
        console.log('Connection already established!');
        return;
    }

    conn = dataConnection;
    console.log('Connection received.');

    conn.on('data', data => {
        console.log(`Received: "${data}"`);
    });
})

document.querySelector('input[value="Connect"]').onclick = () => {
    let peerId = document.querySelector('input#peerId').value;
    if (peerId == '') {
        console.log(`No peer to connect!`);
        return;
    }
    console.log(`Trying to connect to ${peerId}`);

    conn = peer.connect(peerId);
    
    conn.on('open', () => {
        console.log('Connection established.');

        conn.on('data', data => {
            console.log(`Received: "${data}"`);
        })
    })
}

document.querySelector('input[value="Send"]').onclick = () => {
    if (!conn) {
        console.log("There is no connection established!")
        return;
    }

    let message = document.querySelector('input#message').value;

    conn.send(message);
    console.log(`Sended: "${message}"`);
}