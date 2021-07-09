import { cleanup } from "@testing-library/react";

import renderWithStore from '../renderWithStore';

import App from '../App';

describe('testing clicks', () => {
  beforeEach(cleanup);
  test('the page should has a button and a text 0', () => {
    const { queryByText } = renderWithStore(<App />);
    const buttonAdicionar = queryByText('Clique aqui');

    expect(buttonAdicionar).toBeInTheDocument();
    expect(queryByText('0')).toBeInTheDocument();
  });

  test('a click in a button should increment the value of clicks', () => {
    const { queryByText, store } = renderWithStore(<App />, { initialState: { clickReducer: { counter: 5 }}});

    console.log(store.getState());

    expect(queryByText('0')).toBeInTheDocument();
  });
});
