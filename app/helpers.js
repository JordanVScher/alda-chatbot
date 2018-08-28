function formatDate(moment, date) {
	return `${moment(date).format('dddd')}, ${moment(date).format('D')} de ${moment(date).format('MMMM')} às ${moment(date).format('hh:mm')}`;
}

module.exports.formatDate = formatDate;

function findCCS(CCSList, place) {
	const result = CCSList.find(obj => (obj.bairro.includes(place)));

	if (result) {
		result.neighborhoods = [];
		CCSList.forEach((element) => {
			if (element.cod_ccs === result.cod_ccs) {
				result.neighborhoods.push(element.bairro);
			}
		});
		console.log(result);
		return result;
	}
	return undefined;
}

module.exports.findCCS = findCCS;

// TODO turn this and the next function to be the same function
function findCCSMunicipio(CCSList, municipio) {
	const sameMunicipio = [];

	CCSList.forEach((element) => { // get every ccs on the same municipio (we say municipio but we are actually using regiao)
		if (element.regiao.toLowerCase() === municipio.trim().toLowerCase()) {
			sameMunicipio.push(element);
		}
	});

	if (sameMunicipio.length > 0) {
		return sameMunicipio;
	}
	return undefined;
}

module.exports.findCCSMunicipio = findCCSMunicipio;

function findCCSBairro(sameMunicipio, bairro) {
	const theBairro = [];

	sameMunicipio.forEach((element) => {
		if (element.bairro.toLowerCase() === bairro.trim().toLowerCase()) {
			theBairro.push(element);
		}
	});

	if (theBairro.length > 0) {
		return theBairro;
	}
	return undefined;
}

module.exports.findCCSBairro = findCCSBairro;

function getNeighborhood(results) {
	let neighborhood = results.find(x => x.types.includes('political'));
	if (!neighborhood) { neighborhood = results.find(x => x.types.includes('sublocality')); }
	if (!neighborhood) { neighborhood = results.find(x => x.types.includes('sublocality_level_1')); }
	return neighborhood;
}

module.exports.getNeighborhood = getNeighborhood;

function findBairrosByCod(CCSList, cod) { // find other bairros that are also served by this CCS using the ccs_cod
	const bairros = [];

	for (const element of CCSList) { // eslint-disable-line
		if (element.cod_ccs === cod) { // if their code is the same, this bairro is on the same CCS
			bairros.push(element.bairro);
			console.log(bairros);
		}
	}
	return bairros;
}

module.exports.findBairrosByCod = findBairrosByCod;
