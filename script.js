const fetchCountries = async (filter) => {
	const apiResponse = await fetch(`https://restcountries.com/v3.1/${filter}`);

	if (apiResponse.status == 200) {
		const data = await apiResponse.json();
		return data;
	}
}

async function loadHome(filter) {

	const data = await fetchCountries(filter);

	var element = document.querySelector(".countries--area");
	while (element.firstChild) {
  		element.removeChild(element.firstChild);
  	}

	await data.map((item, index) => {
		let countrie = document.querySelector('.ahrefCountrie').cloneNode(true);
		let countrieDiv = document.querySelector('.countrie--card');

		countrie.setAttribute('href', `./country.html?${item.name.common}`);
		countrieDiv.setAttribute('data-key', index);
		countrie.querySelector('.flag--img').src = item.flags.png;
		countrie.querySelector('.countrie--name').innerHTML = item.name.common;
		countrie.querySelector('.population--countrie').innerHTML = item.population;
		countrie.querySelector('.region--countrie').innerHTML = item.region;
		countrie.querySelector('.capital--countrie').innerHTML =  item.capital;

		document.querySelector('.countries--area').append(countrie);
	})
}

async function loadCountry() {

	var country = (location.search).slice(1);

	const data = await fetchCountries(`name/${country}?fullText=true`);


		let countrie = document.querySelector('.ct--area').cloneNode(true);

		countrie.querySelector('.flag--image').src = data[0].flags.png;
		countrie.querySelector('.ct--Name').innerHTML = data[0].name.common;
		countrie.querySelector('.ct--nativeName').innerHTML = data[0].name.official;
		countrie.querySelector('.ct--population').innerHTML = data[0].population;
		countrie.querySelector('.ct--region').innerHTML =  data[0].region;
		countrie.querySelector('.ct--subRegion').innerHTML =  data[0].subregion;
		countrie.querySelector('.ct--capital').innerHTML =  data[0].capital[0];
		countrie.querySelector('.ct--topLevelDomain').innerHTML =  data[0].tld[0];
		countrie.querySelector('.ct--currencies').innerHTML = Object.values(data[0].currencies)[0].name;
		countrie.querySelector('.ct--languages').innerHTML = Object.values(data[0].languages);

		if (data[0].borders) {

			let countriesBorderData = data[0].borders;
			let borderNames = [];

			for (i = 0; i < countriesBorderData.length; i++) {
				const dataBorders = await fetchCountries(`alpha/${countriesBorderData[i]}`);
				borderNames.push(dataBorders[0].name.common);
			}

			countrie.querySelector('.ct--borderName').innerHTML = borderNames;

		} else {
			countrie.querySelector('.ct--borderName').innerHTML = 'This country has no border countries.';
		}

		document.querySelector('.countrie--area').append(countrie);

}

function searchCountries(event) {
	var country = document.querySelector('#inputSearch').value;

	loadHome(`name/${country}`);
}

function selectRegion() {
	var region = document.querySelector('#inputSelect').value;

	if(region == 'all') {
		loadHome('all');
	} else {
		loadHome(`region/${region}`);
	}
}

function changeThemeHome() {

	var header = document.querySelector('header');
	var title =  document.querySelector('.title');
	var button = document.querySelector('.styleChange');
	var body = document.querySelector('body');
	var inputSearchArea = document.querySelector('.inputSearch_Area');
	var inpSearch = document.querySelector('#inputSearch');
	var inpSel = document.querySelector('.inputSelect');
	var card = document.querySelectorAll('#countrie--card');

	if (header.classList == '') {
		header.style.backgroundColor = 'hsl(209, 23%, 22%)';
		header.style.boxShadow = 'rgba(19, 19, 19, 0.2) 0px 2px 8px 0px';
		title.style.color = 'white';
		button.style.color = 'white';
		body.style.backgroundColor = 'hsl(207, 26%, 17%)';
		inputSearchArea.style.backgroundColor = 'hsl(209, 23%, 22%)';
		inputSearchArea.style.color = 'white';
		inputSearchArea.style.boxShadow = 'rgba(19, 19, 19, 0.2) 0px 2px 8px 0px';
		inpSearch.classList = 'inputSearchBlack';
		inpSel.style.backgroundColor = 'hsl(209, 23%, 22%)';
		inpSel.style.boxShadow = 'rgba(19, 19, 19, 0.2) 0px 2px 8px 0px';
		inpSel.style.color = 'white';
		inpSel.classList = 'inputSelect inputSelect_black';
		for (i = 0; i < card.length; i++) {
			card[i].classList = 'countrie--card card_black';
		}
		header.classList = 'blackTheme';
	} else {
		header.style.backgroundColor = 'white';
		header.style.boxShadow = 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px';
		title.style.color = 'hsl(200, 15%, 8%)';
		button.style.color = 'hsl(200, 15%, 8%)';
		body.style.backgroundColor = 'hsl(0, 0%, 98%)';
		inputSearchArea.style.backgroundColor = 'white';
		inputSearchArea.style.color = 'hsl(209, 23%, 22%)';
		inputSearchArea.style.boxShadow = 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px';
		inpSearch.classList = 'inputSearchWhite';
		inpSel.style.backgroundColor = 'white';
		inpSel.style.boxShadow = 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px';
		inpSel.style.color = 'hsl(209, 23%, 22%)';
		inpSel.classList = 'inputSelect inputSelect_white';
		for (i = 0; i < card.length; i++) {
			card[i].classList = 'countrie--card card_white';
		}
		header.classList = '';
	}
}

function changeThemeCountry() {

	var header = document.querySelector('header');
	var title =  document.querySelector('.title');
	var button = document.querySelector('.styleChange');
	var body = document.querySelector('body');
	var btnBack = document.querySelector('.btnBack');
	var infoAr = document.querySelector('.countrie--area .infosArea');

	console.log(infoAr);

	if (header.classList == '') {
		header.style.backgroundColor = 'hsl(209, 23%, 22%)';
		header.style.boxShadow = 'rgba(19, 19, 19, 0.2) 0px 2px 8px 0px';
		title.style.color = 'white';
		button.style.color = 'white';
		body.style.backgroundColor = 'hsl(207, 26%, 17%)';
		btnBack.style.backgroundColor = 'hsl(209, 23%, 22%)';
		btnBack.style.boxShadow = 'rgba(19, 19, 19, 0.2) 0px 2px 8px 0px';
		btnBack.style.color = 'white';
		infoAr.classList = 'infosArea iAreaWhite';

		header.classList = 'blackTheme';
	} else {
		header.style.backgroundColor = 'white';
		header.style.boxShadow = 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px';
		title.style.color = 'hsl(200, 15%, 8%)';
		button.style.color = 'hsl(200, 15%, 8%)';
		body.style.backgroundColor = 'hsl(0, 0%, 98%)';
		btnBack.style.backgroundColor = 'hsl(0, 0%, 98%)';
		btnBack.style.boxShadow = 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px';
		btnBack.style.color = 'black';
		infoAr.classList = 'infosArea iAreaBlack';

		header.classList = '';
	}
}

