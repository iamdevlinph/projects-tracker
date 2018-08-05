// const isDev = process.env.NODE_ENV === 'development';
// const apiUrl = !isDev ? 'http://localhost:3001/authorInfo' : 'http://projects-tracker-api.us.openode.io/authorInfo';
const postBody = body => JSON.stringify({
  ...body,
});

const nodeGetUserInfo = (authorName, authorType) => fetch('http://projects-tracker-api.us.openode.io/authorInfo', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  body: postBody({ authorName, authorType }),
}).then(res => res.json());

export default nodeGetUserInfo;
