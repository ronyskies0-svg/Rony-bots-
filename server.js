import express from "express";
import { makeWASocket, useMultiFileAuthState } from "@whiskeysockets/baileys";

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/pair", async (req, res) => {
  const { number } = req.body;
  try {
    const { state, saveCreds } = await useMultiFileAuthState(`./session`);
    const sock = makeWASocket({ auth: state });

    const pairCode = await sock.requestPairingCode(number);
    res.json({ code: pairCode });

    sock.ev.on("creds.update", saveCreds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao gerar código" });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Servidor rodando"));
