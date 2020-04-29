/**
 * movie data
 */
export function fetchMovie(dispatch) {
  const FETCH_DATA = `FETCH_DATA`;
  const FETCH_RESULTS = `FETCH_RESULTS`;
  const baseUrl = `https://api.themoviedb.org/3/discover/movie`;
  const sort = `popularity.desc`;
  const language = `en-US`;
  const adult = true;
  const video = false;
  const api = `0bb2c886e26651f3b9d5a1a810a0bea6`;
  const url = `${baseUrl}?api_key=${api}&language=${language}&sort_by=${sort}&include_adult=${adult}&include_video=${video}&page=1`;

  fetch(url)
    .then((response) => {
      if (response.error) {
        throw response.error;
      }
      return response.json();
    })
    .then((data) => {
      dispatch({ type: FETCH_DATA, payload: data });
    });
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return dispatch({ type: FETCH_RESULTS, payload: data.results });
    });
}
