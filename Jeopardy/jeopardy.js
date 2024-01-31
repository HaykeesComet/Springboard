// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];

const NUM_CATEGORIES = 14;
const NUM_QUESTIONS_PER_CAT = 5;

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */
async function getCategoryIds() {
  const response = await axios.get('https://rithm-jeopardy.herokuapp.com/api/categories', { params: { count: NUM_CATEGORIES } });
  return response.data.map(category => category.id);
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */
async function getCategory(catId) {
  const response = await axios.get(`https://rithm-jeopardy.herokuapp.com/api/category?id=${catId}`);
  const clues = response.data.clues.map(clue => ({ question: clue.question, answer: clue.answer, showing: null }));
  return { title: response.data.title, clues };
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initially, just show a "?" where the question/answer would go.)
 */
async function fillTable() {
  const $thead = $('#jeopardy thead');
  const $tbody = $('#jeopardy tbody');

  $thead.empty();
  $tbody.empty();

  const maxColumns = 6; // Set the maximum number of columns
  const $trHead = $('<tr>');
  for (let i = 0; i < Math.min(categories.length, maxColumns); i++) {
    $trHead.append(`<td>${categories[i].title}</td>`);
  }
  $thead.append($trHead);

  for (let i = 0; i < NUM_QUESTIONS_PER_CAT; i++) {
    const $trBody = $('<tr>');
    for (let j = 0; j < Math.min(categories.length, maxColumns); j++) {
      const $td = $(`<td class="clue" data-row="${i}" data-col="${j}">❔</td>`);
      $trBody.append($td);
    }
    $tbody.append($trBody);
  }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */
function handleClick(evt) {
  const $clickedCell = $(evt.target);
  const row = $clickedCell.data('row');
  const col = $clickedCell.data('col');
  const clue = categories[col].clues[row];

  if (clue.showing === null) {
    $clickedCell.text(clue.question);
    clue.showing = 'question';
  } else if (clue.showing === 'question') {
    $clickedCell.text(clue.answer).addClass("important");
    clue.showing = 'answer';
  }
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */
function showLoadingView() {
  $('#jeopardy').hide();
  $('#loading').show();
  $('#start').prop('disabled', true);
}

/** Remove the loading spinner and update the button used to fetch data. */
function hideLoadingView() {
  $('#loading').hide();
  $('#jeopardy').show();
  $('#start').prop('disabled', false);
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

/** Shuffle an array in place using Fisher-Yates algorithm. */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  /** Shuffle the categories array in place. */
  function shuffleCategories() {
    shuffleArray(categories);
  }

/** Start game with shuffled categories:
 *
 * - shuffle categories
 * - fill the HTML table
 */
async function setupAndStartShuffled() {
    showLoadingView();
  
    const categoryIds = await getCategoryIds();
  
    categories = [];
    for (const catId of categoryIds) {
      const category = await getCategory(catId);
      categories.push(category);
    }
  
    shuffleCategories();
    fillTable();
    hideLoadingView();
  }

/** On click of start / restart button, set up game with shuffled categories. */
$('#start').on('click', setupAndStartShuffled);

/** On page load, add event handler for clicking clues */
$(document).on('click', '.clue', handleClick);
