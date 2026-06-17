/*
export const getAuth = (client_id) => {
  const REDİRECT_URL = encodeURIComponent(
    `https://spotify-clone-vue3.vercel.app/login`
  );
  console.log(REDİRECT_URL);
  const CLIENT_ID = encodeURIComponent(client_id);

  const scopes =
    "ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read user-read-email";
  const SCOPE_URL_PARAM = encodeURIComponent(scopes);
  const URL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&scope=${SCOPE_URL_PARAM}&redirect_uri=${REDİRECT_URL}&show_dialog=false`;

  (function () {
    window.location = URL;
  })();
};

export const accessToken = (hash) => {
  const hashParams = hash.substring(1).split("&");
  const reducedHashParams = hashParams.reduce((acc, currentVal) => {
    const [key, value] = currentVal.split("=");
    acc[key] = value;
    return acc;
  }, {});
  return reducedHashParams.access_token;
};

*/

const REDIRECT_URI = "https://spotify-clone-vue3.vercel.app/login";

const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let text = "";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

const generateCodeChallenge = async (verifier) => {
  const data = new TextEncoder().encode(verifier);

  const digest = await crypto.subtle.digest("SHA-256", data);

  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
};

export const getAuth = async (clientId) => {
  const scopes =
    "ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read user-read-email";

  const codeVerifier = generateRandomString(128);

  localStorage.setItem("code_verifier", codeVerifier);

  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const authUrl = new URL("https://accounts.spotify.com/authorize");

  authUrl.search = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: scopes,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  }).toString();

  window.location.href = authUrl.toString();
};

/* ✅ NEW: URL'den code alma */
export const getCodeFromUrl = () => {
  const params = new URLSearchParams(window.location.search);

  return params.get("code");
};

/* ✅ NEW: access token alma */
export const getToken = async (code, clientId) => {
  const codeVerifier = localStorage.getItem("code_verifier");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    }),
  });

  return await response.json();
};
