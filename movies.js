// tracking which element is being selected
let currId = 0;

// creatings a list of all movies for sorting
let movieList = [];

$(function() {
    // removing the parent when the delete button is clicked
    $("#new-movie-form").on("submit", function(e) {
        e.preventDefault();
        let title = $("#title").val();
        let rating = $("#rating").val();

        let movieData = {title, rating, currId};
        const appendToHTML = createMovieDataHtml(movieData);

        currId++
        movieList.push(movieData);

        $("#movie-table-body").append(appendToHTML);
        $("#new-movie-form").trigger('reset');
    });

    // removing the movie from the array when the delete btn is clicked
    $("tbody").on("click", ".btn.btn-danger", function(e) {
        let removeIdx = movieList.findIndex(movie => movie.currentID === +$(e.target).data("deleteId"));

        // removing from the array
        movieList.splice(removeIdx, 1);

        // remove from DOM
        $(e.target).closest("tr").remove();
    });

    // when arrouw is clicked
    $(".fas").on("click", function(e){
        // figuring out the direction
        let direction = $(e.target).hasClass("fa-sort-down") ? "down" : "up";
        let sortKey = $(e.target).attr("id");
        let sortedMovies = sortBy(movieList, sortKey, direction);

        // empty the table
        $("#movie-table-body").empty();

        // loop ove the obj of sortedMovies and add new row
        for (let movie of sortedMovies){
            const appendToHTML = createMovieDataHtml(movie);
            $("#movie-table-body").append(appendToHTML);
        }

        // toggel arrow 
        $(e.target).toggleClass("fa-sort-down");
        $(e.target).toggleClass("fa-sort-up");
    });
});

// accepts an array of objs and a key then sorts by the key
function sortBy(array, sortKey, direction){
    return array.sort(function(a,b) {
        if (sortKey === "rating"){
            a[sortKey] = +a[sortKey];
            b[sortKey] = +b[sortKey];
        }
        if (a[sortKey] > b[sortKey]){
            return direction === "up" ? 1 : -1;
        }
        else if (b[sortKey] > a[sortKey]){
            return direction === "down" ? -1 : 1;
        }
        return 0;
    });
}

// createMovieDataHtml accepts an obj with the title and rating and return a string
function createMovieDataHtml(data){
    return `
    <tr>
      <td>${data.title}</td>
      <td>${data.rating}</td>
      <td>
        <button class="btn btn-danger" data-delete-id=${data.currentId}>
          Delete
        </button>
      </td>
    <tr>
  `;
}