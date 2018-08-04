const getUserInfo = (authorName, authorType) => fetch(`https://api.github.com/${authorType}s/${authorName}`).then(res => res.json());

export default getUserInfo;
