const input = document.querySelector('#fruit');
const suggestionsList = document.querySelector('#suggestions');

const fruits = [
	'Apple 🍎', 'Apricot 🍑', 'Avocado 🥑', 'Banana 🍌', 'Bilberry 🫐', 'Blackberry 🫒', 'Blackcurrant 🍇', 'Blueberry 🫐',
	'Boysenberry 🍇', 'Currant 🍇', 'Cherry 🍒', 'Coconut 🥥', 'Cranberry 🪴', 'Cucumber 🥒', 'Custard apple 🍏', 'Damson 🍑',
	'Date 🫀', 'Dragonfruit 🐉', 'Durian 🥭', 'Elderberry 🫐', 'Feijoa 🍈', 'Fig 🪴', 'Gooseberry 🫐', 'Grape 🍇', 'Raisin 🍇',
	'Grapefruit 🍊', 'Guava 🍈', 'Honeyberry 🍇', 'Huckleberry 🫐', 'Jabuticaba 🫐', 'Jackfruit 🍈', 'Jambul 🫐', 'Juniper berry 🪞',
	'Kiwifruit 🥝', 'Kumquat 🍊', 'Lemon 🍋', 'Lime 🍋', 'Loquat 🍑', 'Longan 🪴', 'Lychee 🍈', 'Mango 🥭', 'Mangosteen 🍇',
	'Marionberry 🫐', 'Melon 🍈', 'Cantaloupe 🍈', 'Honeydew 🍈', 'Watermelon 🍉', 'Miracle fruit 🍓', 'Mulberry 🫐', 'Nectarine 🍑',
	'Nance 🍒', 'Olive 🫒', 'Orange 🍊', 'Clementine 🍊', 'Mandarine 🍊', 'Tangerine 🍊', 'Papaya 🥭', 'Passionfruit 🍇', 'Peach 🍑',
	'Pear 🍐', 'Persimmon 🍅', 'Plantain 🍌', 'Plum 🍑', 'Pineapple 🍍', 'Pomegranate 🥭', 'Pomelo 🍈', 'Quince 🍐', 'Raspberry 🍇',
	'Salmonberry 🐟', 'Rambutan 🍡', 'Redcurrant 🍒', 'Salak 🫐', 'Satsuma 🍊', 'Soursop 🍈', 'Star fruit 🌟', 'Strawberry 🍓',
	'Tamarillo 🍅', 'Tamarind 🍋', 'Yuzu 🍋'
  ];

  function search(str) {
	const results = [];
  
	if (str.length === 0) {
	  suggestions.innerHTML = '';
	  return results;
	}
  
	const regex = new RegExp(str, 'i');
  
	fruits.forEach(fruit => {
	  if (regex.test(fruit)) {
		results.push(fruit);
	  }
	});
  
	return results;
  }

function searchHandler(event) {
  const userInput = event.target.value.trim();
  const suggestions = search(userInput);
  showSuggestions(suggestions);
}

function showSuggestions(suggestions) {
  suggestionsList.innerHTML = '';

  if (suggestions.length === 0) {
    suggestionsList.style.display = 'none';
    return;
  }

  suggestionsList.style.display = 'block';

  suggestions.forEach(suggestion => {
    const li = document.createElement('li');
    li.textContent = suggestion;
    suggestionsList.appendChild(li);
  });
}

function useSuggestion(event) {
  if (event.target.tagName === 'LI') {
    input.value = event.target.textContent;
    suggestionsList.style.display = 'none';
  }
}

input.addEventListener('keyup', searchHandler);
suggestionsList.addEventListener('click', useSuggestion);
