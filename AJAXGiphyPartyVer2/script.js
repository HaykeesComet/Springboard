$(document).ready(function() {
    const $gifArea = $("#gif-area");
    const $searchForm = $("#searchform");
    const $removeButton = $("#removeButton");
    const $searchButton = $("#searchButton");
    const $searchInput = $("#search");
    const $suggestionsContainer = $("<div>", { id: "suggestions-container" });

    $searchButton.on("click", function(event) {
        event.preventDefault();
        const searchTerm = $searchInput.val();
        searchGiphy(searchTerm);
        $searchInput.val(""); // Clear the input field
    });

    $searchForm.append($suggestionsContainer);

    $removeButton.on("click", function() {
        $gifArea.empty();
    });

    function fetchApiData(searchTerm, callback) {
        const apiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
        const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}`;

        axios
            .get(apiUrl)
            .then(function(response) {
                const data = response.data;
                const apiData = data.data.map(gif => ({
                    title: gif.title,
                    url: gif.images.original.url
                }));
                callback(apiData);
            })
            .catch(function(error) {
                console.log("An error has been encountered while fetching data from Giphy!", error);
            });
    }

    function searchGiphy(searchTerm) {
        const apiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
        let apiUrl;

        if (searchTerm) {
            apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}`;
        }
        else {
            apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;
        }

        axios
            .get(apiUrl)
            .then(function(response) {
                const data = response.data;
                const gifs = searchTerm ? data.data : [data.data];
                if (gifs.length > 0) {
                    $gifArea.empty(); // Clear previous GIFs
                    gifs.forEach(function(gif) {
                        const gifUrl = gif.images.original.url;
                        appendGif(gifUrl);
                    });
                }
            })
            .catch(function(error) {
                console.log("An error has been encountered while searching Giphy!", error);
            });
    }

    function appendGif(url) {
        const $col = $("<div>", { class: "col" });
        const $gifContainer = $("<div>", { class: "gif-container" });
        const $gif = $("<img>", { src: url });
        const $copyButton = $("<div>", { class: "copy-button" });
        const $clipboardIcon = $("<i>", { class: "fas fa-copy fa-2x", style: "color: #188f00;" });

        $copyButton.append($clipboardIcon);

        $copyButton.on("click", function() {
            const tempInput = $("<input>");
            $("body").append(tempInput);
            tempInput.val(url).select();
            document.execCommand("copy");
            tempInput.remove();
            alert("GIF link copied to clipboard!");
        });

        $gifContainer.append($gif);
        $gifContainer.append($copyButton);
        $col.append($gifContainer);
        $gifArea.append($col);
    }
});