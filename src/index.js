import countryMarkupTpl from './templates/country.hbs';
import countriesMarkupTpl from './templates/countries.hbs';
import { alert, info, success, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import { defaults } from '@pnotify/core';
import { createElement } from 'parse5/lib/tree-adapters/default';
import debounce from 'lodash.debounce';

defaults.delay = 1500;

const refs = {
	form: document.querySelector('#form'),
	input: document.querySelector('#search'),
	result: document.querySelector('.result')
}

refs.form.addEventListener('input', onInputSearch);

function onInputSearch(e) {
	const form = e.currentTarget;
	const searchQuery = form.elements.countryName.value;
	fetchCountriesByName(searchQuery)
		.then(renderCountryMarkup)
		.catch(error => {
			console.log('dfgdg');
			return alert({
				text: 'Неверный запрос!'
			})
		})
}
	
	
	

	function fetchCountriesByName(name) {
		return fetch(`https://restcountries.eu/rest/v2/name/${name}`)
			.then(response => response.json());
	}
	
	function renderCountryMarkup(country) {
		if (country.length === 1) {
				const markup = countryMarkupTpl(country[0]);
			refs.result.innerHTML = markup;
			success({
				text: 'Найдена одна страна!'
			});
				return;
			}
			if (country.length <= 10) {
			const markup = countriesMarkupTpl(country);
				refs.result.innerHTML = markup;
				info({
				text: 'Найдено несколько стран!'
			});
				return;	
		}
		if (country.length > 10) {
			error({
				text: 'Очень много совпадений. Пожалуйста, введите более точный запрос!'
			});
			return;
		}
	}