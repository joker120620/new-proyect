module.exports.generateCodeString = function (client) {
  console.log('generando codigo')
  client.on('qr', qr => {
    console.log(qr)
  });
}
module.exports.botStart = function (client,qrcode ) {
  console.log('iniciando bot')
  client.on('qr', qr => {
    console.log(qr)
    qrcode.generate(qr, {small: true});
  });
  client.on('ready', () => {
    console.log('Bot conectado');
  });

  client.initialize();
};
module.exports.botSendWelcome = function (client ,  MessageMedia,  titleImage) {
  client.on('message', async message => {
    if (message.body==='hola') {
      const media = await MessageMedia.fromUrl('https://i.pinimg.com/originals/1d/71/f6/1d71f6291ade5d6261d52c5e18f2f05f.jpg');
      chat.sendMessage(media, {caption: titleImage})
 
    }
  });
};
module.exports.botSendMenssage = function (client, resive , response ) {
  client.on('message', message => {
    if (message.body === resive) {
      console.log(message.from)
      client.sendMessage(message.from, response);
    }
  });
};
module.exports.botSendImages = function (client , titleImage) {
  client.on('message', message => {
    if (message.hasMedia) {
      const media = new MessageMedia('image/png', 'https://static.nationalgeographic.es/files/styles/image_3200/public/75552.ngsversion.1422285553360.jpg?w=1600&h=1067');
      chat.sendMessage(media, {caption: titleImage})
    }
  });
};
