import React from 'react';
import { useEffect, useState } from 'react';

import { fetchSubreddit } from '../actions';
import withStore from '../utils/withStore';

function SearchResults({ subreddits, fetchSubreddit }) {
  const [selectedSubreddit, setSelectedSubreddit] = useState('nothing');
  const [subredditList, setSubredditList] = useState(['nothing']);

  const fetchedSubreddits = Object.keys(subreddits.subreddits);

  const hasntFetchedYet = subredditList[0] === 'nothing' && fetchedSubreddits.length !== 0;
  const hasNewSubreddit = subredditList[0] !== 'nothing' && fetchedSubreddits.length !== subredditList.length;

  if (hasntFetchedYet || hasNewSubreddit) {
    setSubredditList([...fetchedSubreddits]);
  }

  useEffect(() => {
    const mostRecentSearch = subredditList[subredditList.length - 1];
    setSelectedSubreddit(mostRecentSearch);
  }, [subredditList]);

  const getSelectOptions = () => subredditList.map((sub) => (
    <option
      value={ sub }
      key={ sub }
    >
      { sub !== 'nothing' ? sub : 'Sem pesquisas ainda ):' }
    </option>
  ));

  const getListElement = () => {
    if (subreddits.isLoading) return <p>Carregando...</p>

    if (subredditList[0] === 'nothing' || selectedSubreddit === 'nothing') {
      return <p>Você ainda não pesquisou nada... que tal o todayilearned?</p>;
    }

    const baseUrl = 'https://reddit.com';

    if (subreddits.subreddits[selectedSubreddit].error) {
      return <p>Opa... parece que algo deu errado tentando buscar pelo subreddit { selectedSubreddit }</p>
    }

    return (
      <>
        <h1><a target="_blank" rel="noreferrer" href={`${baseUrl}/r/${selectedSubreddit}`}>r/{ selectedSubreddit }</a></h1>
        {/* <p>Atualizado por último: { subreddits.subreddits[selectedSubreddit]?.lastUpdated?.toLocaleTimeString() }</p> */}
        <ol>
          { subreddits.subreddits[selectedSubreddit].posts.map(({ data }) => {
            const { id, title, author, permalink } = data;
            return (
              <li key={ id }>
                <a target="_blank" rel="noreferrer" href={`${baseUrl}/${permalink}`}>{ title }</a> by <a target="_blank" rel="noreferrer" href={`${baseUrl}/u/${author}`}>u/{ author }</a>
              </li>
            )
          }) }
        </ol>
      </>
    )
  }

  return(
    <section>
      <h1>Resultados</h1>
      <select
        value={ selectedSubreddit }
        onChange={ ({ target }) => setSelectedSubreddit(target.value) }
      >
        {getSelectOptions()}
      </select>

      { selectedSubreddit !== 'nothing' &&
        <button
          onClick={ () =>  fetchSubreddit(selectedSubreddit)}
        >
          Atualizar
        </button>
      }

      { getListElement() }
    </section>
  );
}

export default withStore(SearchResults, ['subreddits'], [fetchSubreddit]);
