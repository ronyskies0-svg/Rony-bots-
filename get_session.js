// Script mínimo para gerar SESSION_ID
const { default: makeWASocket, useSingleFileAuthState } = require('@adiwajshing/baileys');
const { state, saveState } = useSingleFileAuthState('./session.json');

async function start() {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on('creds.update', saveState);

    console.log("Escaneie o QR code com seu WhatsApp para gerar SESSION_ID");
}

start();
