const baseUrl = 'https://www.reddit.com/r';

const requestPosts = () => ({ type: 'REQUEST_POSTS' });
const updateSubreddit = (payload) => ({ type: 'UPDATE_SUBREDDIT', payload });

const fetchSubreddit = (r) => {
  return (dispatch) => {
    dispatch(requestPosts());

    return fetch(`${baseUrl}/${encodeURI(r)}.json`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Oops... something went wrong');
      })
      .then(({ data }) => dispatch(updateSubreddit({r, posts:data.children})))
      .catch((error) => dispatch(updateSubreddit({ r,  error })))
  };
}

export default fetchSubreddit;
