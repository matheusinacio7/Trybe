const { expect } = require('@jest/globals');
const { getRepos } = require('./exercicio-4');

const url = 'https://api.github.com/orgs/tryber/repos';

describe('getRepos - A lista retornada', () => {
  let repos;

  beforeAll(async () => {
    repos = await getRepos(url);
  });

  it(`contém o repositório "sd-01-week4-5-project-todo-list"`, () => {
    expect(repos).toContain('sd-01-week4-5-project-todo-list');
  });

  it(`contém o repositório "sd-01-week4-5-project-meme-generator"`, () => {
    expect(repos).toContain('sd-01-week4-5-project-meme-generator');
  });
});
