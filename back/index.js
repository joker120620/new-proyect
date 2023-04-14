const fs = require('fs');
const rimraf = require('rimraf');
const express = require('express')
const qrcode = require('qrcode-terminal');
const cors = require('cors')
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const {botSendMenssage, botStart,  botSendWelcome, botSendImages} = require('./src/Bot')
const app = express()
app.use(cors())
app.use(express.json());
const port = 5000
function crearCliente(Client, name ) {
  const client = new Client({
  authStrategy: new LocalAuth({ clientId: `${name}` })
});
  return client
}
let codes=[]
let session=false;
let client = crearCliente(Client,'base')
console.log('iniciando bot')
  client.on('qr', qr => {
    codes[0]=qr
    qrcode.generate(qr, {small: true});
  });
  client.on('ready', () => {
    console.log('Bot conectado');
    client.sendMessage('573133085614@c.us' , 'servicio iniciado');
    session=true;
    codes[0]=''
  });
///fuctions del bot
botSendMenssage(client, 'hola', 'holi')
botSendImages(client , 'feliz')
  client.initialize();
app.get('/', (req, res) => {
  res.send('server online')
})
app.post('/getcode', async (req, res) => {
  if(req.body.token=='12345'){
    if(!session){
      res.json({"status":true, "qrcode":"none", "session": session})
    }else{
      res.json({"status":true, "qrcode":codes[0], "session": session})
    }
    
  }else{
    res.json({"status":false, "qrcode":"none" , "session": session})
  }
})
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
})