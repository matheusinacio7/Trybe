const insertOne = (userData: any) => Promise.resolve();
const getByUsername = (username: string) => Promise.resolve({ username, email: 'epa@epa.com', admin: false });
const getByEmail = (email: string) => Promise.resolve({ username: 'joao', email: 'epa@epa.com', admin: false });

export default {
  insertOne,
  getByUsername,
  getByEmail,
};
