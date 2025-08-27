import io from 'socket.io-client';
import readline from 'readline';

const socket = io('http://57.159.24.214:4500',
    {
        auth: {
            token: "mobile_app"
        }
    }
);

socket.on('connect', () => {
    console.log('Connected to server');
    waitForInput();
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

async function triggerGetDonnaDesktop() {
    const response = await new Promise((resolve) => {
        socket.emit('getDonnaDesktop', null, (response) => {
            resolve(response);
        });
    });
    console.log('Received response from server:', response);
}

function triggerSendMsgtoDonnaDesktop() {
    // You can customize the payload as needed
    const payload = {
        id: Date.now(),
        text: "Hello from Donna Mobile",
        sender: 'user',
        timestamp: new Date().toISOString()
      };
    socket.emit('sendMsgToDonnaDesktop', payload, (response) => {
        console.log('Received response from server:', response);
    });
}

function waitForInput() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('\nType a command and press Enter:');
    console.log('1 - Trigger getDonnaDesktop');
    console.log('2 - Trigger sendMsgtoDonnaDesktop');
    console.log('exit - Quit\n');

    rl.on('line', (input) => {
        if (input.trim() === '1') {
            triggerGetDonnaDesktop();
        } else if (input.trim() === '2') {
            triggerSendMsgtoDonnaDesktop();
        } else if (input.trim().toLowerCase() === 'exit') {
            rl.close();
            socket.disconnect();
            process.exit(0);
        } else {
            console.log('Unknown command. Please enter 1, 2, or exit.');
        }
        if (rl.listenerCount('line') > 0) {
            // Only prompt again if not exiting
            console.log('\nType a command and press Enter:');
        }
    });
}
