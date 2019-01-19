require('dotenv').config();
const axios = require('axios');

async function auth() {
  return axios.post(
    `http://localhost:${process.env.PORT}/word-cards-api/auth/signin`,
    { email: 'test@admin.ru', password: '123' },
  )
    .then(res => res.data.type)
    .catch(err => err.response.data.type);
}

describe('word-card-api', () => {
  test('get', async () => {
    const isAuth = await auth();
    expect(isAuth).toBe('ok');

    const getData = async () => axios.get(`http://localhost:${process.env.PORT}/word-cards-api/rubric`)
      .then(res => res)
      .catch(err => err.response);

    const res = await getData();
    expect(res.data.type).toBe('ok');
  });
});

test('add/remove', async () => {
  const isAuth = await auth();
  expect(isAuth).toBe('ok');

  const rubricName = `TEST ${Math.random()}`;
  const setData = async () => axios.post(
    `http://localhost:${process.env.PORT}/word-cards-api/rubric`,
    { names: [rubricName] },
  )
    .then(res => res)
    .catch(err => err.response);

  const resPost = await setData();
  expect(resPost.data).toBe('ok');

  const rubricId = resPost.data.data.id;
  if (resPost.data.type === 'ok') {
    const rmData = async () => axios.delete(
      `http://localhost:${process.env.PORT}/word-cards-api/rubric`,
      { id: rubricId },
    )
      .then(res => res)
      .catch(err => err.response);

    const resDelete = await rmData();
    expect(resDelete.data.type).toBe('ok');
  }
});
