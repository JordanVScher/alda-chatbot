
const { MessengerClient } = require('messaging-api-messenger');

const config = require('./bottender.config').messenger;
const help = require('./helpers');

const client = MessengerClient.connect({
	accessToken: config.accessToken,
	appSecret: config.appSecret,
});

// sends to the user a notification warning him that one non-active ccs he once searched is now active
// USER_ID = context-id of user
// ccs_name = name of said ccs
// bairros = array of bairros that are also part of this ccs (maybe there's only one bairro)
module.exports.sendActivatedNotification = async function sendActivatedNotification(USER_ID, ccsName, bairros) {
	let textMsg = '';
	const textTwo = 'se encontra agora ativo. Quando você buscou informações sobre este conselho ele não estava ativo mas agora ele está pronto para te ouvir.';
	if (bairros.length === 0) { // just to be safe
		textMsg = `Olá, o ${ccsName} ${textTwo}`;
	} else if (bairros.length === 1) {
		textMsg = `Olá, o ${ccsName} ${textTwo} Este conselho encobre o bairro ${bairros[0]}.`;
	} else {
		textMsg = `Olá, o ${ccsName} ${textTwo} Este conselho encobre os bairros ${bairros.join(', ').replace(/,(?=[^,]*$)/, ' e')}.`;
	}
	const response = await client.sendText(USER_ID, textMsg, {
		quick_replies: [
			{
				content_type: 'text',
				title: 'Entendi',
				payload: 'advance',
			},
			{
				content_type: 'text',
				title: 'Sobre o conselho',
				payload: 'councilMenu',
			},
		],
	}).then(resp => // eslint-disable-line no-unused-vars
		true).catch((error) => {
		// console.log(error); // formatted error message
		// console.log(error.stack); // error stack trace
		// console.log(error.config); // axios request config
		// console.log(error.request); // HTTP request
		console.log(error.response); // HTTP response
		return false;
	});

	return response;
};


// sends to the user a notification warning him that the agenda he once saw has changed
// USER_ID = context-id of user
// dataHora = The new date-time for the reunion/agenda
// address = The new place the reunion will take place
// ccsName = the name of said CCS
module.exports.sendAgendaNotification = async function sendAgendaNotification(USER_ID, dataHora, address, ccsName) {
	const textMsg = `Olá, a próxima reunião do ${ccsName} mudou. A reunião agora será as: ${help.formatDate(dataHora)} no ${address}. Venha participar!`;
	const response = await client.sendText(USER_ID, textMsg, {
		quick_replies: [
			{
				content_type: 'text',
				title: 'Entendi',
				payload: 'councilMenu',
			},
		],
	}).then(resp => // eslint-disable-line no-unused-vars
		true).catch((error) => {
		// console.log(error); // formatted error message
		// console.log(error.stack); // error stack trace
		// console.log(error.config); // axios request config
		// console.log(error.request); // HTTP request
		console.log(error.response); // HTTP response
		return false;
	});

	return response;
};