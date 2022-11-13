export const getAuth = client_id => {
	const REDİRECT_URL = encodeURIComponent('http://localhost:3000/login');
	console.log(REDİRECT_URL);
	const CLIENT_ID = encodeURIComponent(client_id);

	const scopes =
		'ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read user-read-email';
	const SCOPE_URL_PARAM = encodeURIComponent(scopes);
	const URL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&scope=${SCOPE_URL_PARAM}&redirect_uri=${REDİRECT_URL}&show_dialog=false`;

	(function () {
		window.location = URL;
	})();
};

export const accessToken = hash => {
	const hashParams = hash.substring(1).split('&');
	const reducedHashParams = hashParams.reduce((acc, currentVal) => {
		const [key, value] = currentVal.split('=');
		acc[key] = value;
		return acc;
	}, {});
	return reducedHashParams.access_token;
};

// Client_Credential Auth flow
/* export const getAuth = async (encodedID) => {

 const authParameters = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + encodedID,
    },
    body: 'grant_type=client_credentials',
  };
  return await fetch('https://accounts.spotify.com/api/token', authParameters)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data.access_token;
    })
    .catch((err) => console.log(err));
	*/
