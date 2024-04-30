const setDrink = (section) => {
	//console.log(section);
  section.addEventListener('click', function (e) {
    // e.preventDefault();
    const id = e.target.parentElement.dataset.id;
    // JSON.stringify JSON.parse NOT NEEDED
    localStorage.setItem('drink', id);
  });
};

export default setDrink;
