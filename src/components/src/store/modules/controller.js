import axios from "axios";

const controllerModule = {
  namespaced: true,
  state: {
    months: [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    currentlyPlayingTrack: null,
    playbackState: null,
    currentTrackAlbumImage: null,
    headerBtn: false,
    device_id: null,
    myDevice: null,
    volumePercent: null,
    playerProgress: 0,
    startInterval: "",
    currentProgressMS: null,
    lastProgressMS: 0,
    currentDurationMS: null,
    currentTrackID: null,
    currentContextType: null,
    isArtistContext: null,
    currentTrackIsFav: "",
    userQueue: [],
    recentlyPlayedTracks: null,
    lastListenCards: null,
    modalInfoType: null,
    isPlayingHeaderBtn: null,
    isClickHeaderBtn: null,
  },
  mutations: {
    myDevice(state, payload) {
      state.myDevice = payload;
    },
    volumePercent(state, payload) {
      state.volumePercent = payload;
    },
    playerPercent(state, payload) {
      state.playerProgress = payload;
    },
    currentProgressMS(state, payload) {
      state.currentProgressMS = payload;
    },
    lastProgressMS(state, payload) {
      state.lastProgressMS = payload;
    },
    clearLastProgressMS(state) {
      state.lastProgressMS = 0;
    },

    currentDurationMS(state, payload) {
      state.currentDurationMS = payload;
    },

    deviceID(state, id) {
      state.device_id = id;
    },
    currentTrackID(state, id) {
      state.currentTrackID = id;
    },
    currentContextType(state, type) {
      state.currentContextType = type;
    },
    isArtistContext(state, val) {
      state.isArtistContext = val;
    },
    currentlyPlayingTrack(state, payload) {
      state.currentlyPlayingTrack = payload;
    },
    playbackState(state, payload) {
      state.playbackState = payload;
    },
    currentTrackAlbumImage(state, payload) {
      state.currentTrackAlbumImage = payload;
    },
    currentTrackIsFav(state, payload) {
      state.currentTrackIsFav = payload;
    },
    userQueue(state, payload) {
      state.userQueue = payload;
    },
    recentlyPlayedTracks(state, payload) {
      state.recentlyPlayedTracks = payload;
    },
    lastListenCards(state, payload) {
      state.lastListenCards = payload;
    },

    isPlayingHeaderBtn(state, payload) {
      state.isPlayingHeaderBtn = payload;
    },
    isClickHeaderBtn(state, payload) {
      state.isClickHeaderBtn = payload;
    },

    modalInfoType(state, type) {
      state.modalInfoType = type;
    },
    showHeaderBtn(state) {
      state.headerBtn = true;
    },
    closeHeaderBtn(state) {
      state.headerBtn = false;
    },
  },
  actions: {
    async fetchDevice({ getters, commit, dispatch }) {
      await axios
        .get(`https://api.spotify.com/v1/me/player/devices`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + getters.getToken,
          },
        })
        .then(({ data }) => {
          console.log("DEVİCE!!!! ", data);
          commit("myDevice", data.devices);
          commit("deviceID", data.devices[0].id);
          dispatch("transferDevice");
          dispatch("volumePercent");
        })
        .catch((err) => console.log(err));
    },
    async transferDevice({ getters }) {
      await fetch(`https://api.spotify.com/v1/me/player`, {
        method: "PUT",
        body: JSON.stringify(
          { device_ids: [await getters.deviceID] },
          { play: true }
        ),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + getters.getToken,
        },
      })
        .then((data) => {
          console.log(data);
          if (data.status === 204) {
            console.log("Playback transfered");
          }
        })
        .catch((err) => console.log(err));
    },
    async fetchCurrentlyPlayingTrack({ commit, dispatch, getters, state }) {
      await axios
        .get(
          `https://api.spotify.com/v1/me/player/currently-playing?device_id=${getters.deviceID}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + getters.getToken,
            },
          }
        )
        .then(({ data }) => {
          console.log(data);
          if (data) {
            commit("currentlyPlayingTrack", data);
            dispatch("fetchPlaybackState")
              .then(() => {
                dispatch("clearIntervalFunc");
                commit(
                  "currentProgressMS",
                  getters.getPlaybackState?.progress_ms
                );
                commit(
                  "currentDurationMS",
                  getters.getPlaybackState?.item.duration_ms
                );
                commit(
                  "playerPercent",
                  Math.round(
                    (getters.getCurrentProgress / getters.getCurrentDuration) *
                      100
                  )
                );

                commit("currentContextType", data?.context?.type);
                commit("currentTrackID", data.item.id);
                dispatch("isFavTrack");
                commit("currentTrackAlbumImage", data.item.album.images[0].url);
                if (getters.getPlaybackState.is_playing) {
                  dispatch("clearIntervalFunc");
                  commit("lastProgressMS", getters.getCurrentProgress);
                  state.startInterval === "" ? dispatch("setIntervalFunc") : "";
                }
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    },

    async fetchPlaybackState({ dispatch, getters }) {
      await axios
        .get("https://api.spotify.com/v1/me/player", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await getters.getToken),
          },
        })
        .then(({ data }) => {
          console.log(data);
          data ? dispatch("playbackState", data) : "";
        })
        .catch((err) => console.log(err));
    },
    async playbackState({ commit }, playback_State) {
      commit("playbackState", await playback_State);
    },
    async isFavTrack({ dispatch, getters }) {
      await axios
        .get(
          `https://api.spotify.com/v1/me/tracks/contains?ids=` +
            getters.currentTrackID,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + getters.getToken,
            },
          }
        )
        .then(({ data }) => {
          console.log(data);
          dispatch("currentTrackIsFav", ...data);
        })
        .catch((err) => console.log(err));
    },
    async currentTrackIsFav({ commit }, payload) {
      commit("currentTrackIsFav", await payload);
    },
    async volumePercent({ commit, state }) {
      commit("volumePercent", await state.myDevice[0].volume_percent);
    },
    async playCurrentTrack({ getters, dispatch, commit }) {
      if (!getters.getPlaybackState?.item?.uri) return;
      await fetch(`https://api.spotify.com/v1/me/player/play`, {
        method: "PUT",
        context_uri: JSON.stringify(getters.getPlaybackState?.item?.uri),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + getters.getToken,
        },
      })
        .then((data) => {
          console.log(data);
          if (data.status === 204) {
            console.log("Playback started");
            dispatch("fetchCurrentlyPlayingTrack");
            commit("lastProgressMS", getters.getCurrentProgress);
            dispatch("clearIntervalFunc");
            dispatch("setIntervalFunc");
          }
        })
        .catch((err) => console.log(err));
    },
    async playSelectedTrack({ getters, dispatch }, uri) {
      await axios
        .put(
          `https://api.spotify.com/v1/me/player/play?device_id=${getters.deviceID}`,
          {
            uris: [uri.uri],
            position_ms:
              uri.id === getters.getPlaybackState?.item.id
                ? getters.getPlaybackState.progress_ms
                : 0,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + getters.getToken,
            },
          }
        )
        .then((data) => {
          if (data.status === 204) {
            console.log(getters.currentTrackID);
            commit("lastProgressMS", getters.getCurrentProgress);
            dispatch("clearIntervalFunc");
            dispatch("setIntervalFunc");
          }
        })
        .catch((err) => console.log(err));
    },
    async pauseCurrentTrack({ getters, dispatch, commit }) {
      fetch(`https://api.spotify.com/v1/me/player/pause`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + getters.getToken,
        },
      })
        .then((data) => {
          console.log(data);
          if (data.status === 204) {
            console.log("Playback paused");
            dispatch("fetchCurrentlyPlayingTrack");
            dispatch("clearIntervalFunc");
          }
        })
        .catch((err) => console.log(err));
    },
    async playArtitsTopTracks({ getters, commit, dispatch }, uris) {
      await axios
        .put(
          `https://api.spotify.com/v1/me/player/play?device_id=${getters.deviceID}`,
          {
            uris: [uris.uri[uris.index], ...uris.uri.slice(uris.index + 1)],
            position_ms:
              uris.type === "artist" &&
              uris.artistID === getters.getPlaybackState?.item.artists[0].id &&
              !getters.getPlaybackState?.context
                ? getters.getPlaybackState.progress_ms
                : ((await uris.artistID) ===
                    getters.getPlaybackState?.item.id && (await uris.type)) ===
                  "artist"
                ? getters.getPlaybackState.progress_ms
                : 0,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + getters.getToken,
            },
          }
        )
        .then((data) => {
          if (data.status === 204) {
            dispatch("fetchCurrentlyPlayingTrack")
              .then(() => {
                console.log(getters.currentTrackID);
                commit("lastProgressMS", getters.getPlaybackState?.progress_ms);
                console.log(getters.getLastProgressMS);
                dispatch("clearIntervalFunc");
                dispatch("setIntervalFunc");
                uris.type === "artist"
                  ? commit("isArtistContext", true)
                  : commit("isArtistContext", false);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    },
    async playSelectedContext(
      { getters, commit, dispatch, state },
      contextUri
    ) {
      await axios
        .put(
          `https://api.spotify.com/v1/me/player/play?device_id=${getters.deviceID}`,
          {
            context_uri: await contextUri.uri,
            offset: { position: await contextUri.index },
            position_ms:
              (await contextUri.type) ===
                getters.getPlaybackState?.context?.type &&
              (await contextUri.uri) ===
                getters.getPlaybackState?.context?.uri &&
              (await contextUri.id) === getters.getPlaybackState?.item.id
                ? getters.getPlaybackState?.progress_ms
                : (await contextUri.id) === getters.getPlaybackState?.item.id &&
                  (await contextUri.type) ===
                    getters.getPlaybackState?.context?.type
                ? getters.getPlaybackState?.progress_ms
                : 0,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + getters.getToken,
            },
          }
        )
        .then((data) => {
          console.log(data);
          if (data.status === 204) {
            console.log("context started");
            dispatch("fetchCurrentlyPlayingTrack")
              .then(() => {
                console.log(getters.currentTrackID);
                console.log(
                  "context type=>",
                  getters.getPlaybackState?.context?.type
                );
                commit("lastProgressMS", getters.getCurrentProgress);
                console.log(getters.getLastProgressMS);
                commit("isArtistContext", false);
                dispatch("clearIntervalFunc");
                dispatch("setIntervalFunc");
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    },
    songTimeProgress({ commit, getters, state }) {
      commit("lastProgressMS", state.lastProgressMS + 1000);
      commit("currentProgressMS", getters.getLastProgressMS);
      commit(
        "playerPercent",
        Math.round(
          (getters.getLastProgressMS / getters.getCurrentDuration) * 100
        )
      );
    },
    setIntervalFunc({ dispatch }) {
      this.startInterval = setInterval(() => {
        dispatch("songTimeProgress");
      }, 1000);
    },
    clearIntervalFunc() {
      clearInterval(this.startInterval);
    },
    async seekToPositionSelectedTrack({ getters, state }) {
      await fetch(
        `https://api.spotify.com/v1/me/player/seek?position_ms=${progress_ms}&device_id=${getters.deviceID}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + getters.getToken,
          },
        }
      )
        .then((data) => {
          if (data.status === 204) {
            console.log("Selected Track Seek To Position");
          }
        })
        .catch((err) => console.log(err));
    },

    async skipToNextTrack({ getters, dispatch, commit }) {
      await fetch(
        `https://api.spotify.com/v1/me/player/next?device_id=${getters.deviceID}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + getters.getToken,
          },
        }
      )
        .then((data) => {
          console.log(data);
          if (data.status === 204) {
            console.log("skipped to Next Track!");
            dispatch("fetchCurrentlyPlayingTrack");
            dispatch("clearIntervalFunc");
            commit("clearLastProgressMS");
            dispatch("setIntervalFunc");
          }
        })
        .catch((err) => console.log(err));
    },
    async skipToPrevTrack({ getters, dispatch }) {
      fetch(
        `https://api.spotify.com/v1/me/player/previous?device_id=${getters.deviceID}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + getters.getToken,
          },
        }
      )
        .then((data) => {
          console.log(data);
          if (data.status === 204) {
            console.log("skipped to Previous Track!");
            dispatch("fetchCurrentlyPlayingTrack");
            dispatch("clearIntervalFunc");
            commit("clearLastProgressMS");
            dispatch("setIntervalFunc");
          }
        })
        .catch((err) => console.log(err));
    },

    async userQueue({ getters, commit }) {
      await axios
        .get(`https://api.spotify.com/v1/me/player/queue`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + getters.getToken,
          },
        })
        .then(({ data }) => {
          console.log(data, "!!!USER QUEUE!!!!");
          commit("userQueue", data);
        })
        .catch((err) => console.log(err));
    },
    async addItemToQueue({ getters, dispatch }, uri) {
      fetch(
        `https://api.spotify.com/v1/me/player/queue?uri=${uri}&device_id=${getters.deviceID}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await getters.getToken),
          },
        }
      )
        .then((data) => {
          console.log(data);
          if (data.status === 204) {
            console.log("!!!!!!!!item added to Queue!!!!!!!!!!!!");
            dispatch("modalInfoType", {
              type: "queue",
              status: true,
            });
            dispatch("userQueue");
          }
        })
        .catch((err) => console.log(err));
    },

    async fetchRecentlyPlayedTracks({ getters, commit }) {
      await axios
        .get(`https://api.spotify.com/v1/me/player/recently-played?limit=50`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + getters.getToken,
          },
        })
        .then(({ data }) => {
          console.log(data, "RECENTLY PLAYED TRACKS");
          commit("recentlyPlayedTracks", data);
        })
        .catch((err) => console.log(err));
    },

    modalInfoType({ commit }, type) {
      commit("modalInfoType", type);
    },
    lastListenCards({ commit }, payload) {
      commit("lastListenCards", payload);
    },

    isPlayingHeaderBtn({ commit }, isPlaying) {
      commit("isPlayingHeaderBtn", isPlaying);
    },
    isClickHeaderBtn({ commit, dispatch }, playResume) {
      commit("isClickHeaderBtn", playResume);
    },

    showHeaderBtn({ commit }) {
      commit("showHeaderBtn");
    },
    closeHeaderBtn({ commit }) {
      commit("closeHeaderBtn");
    },
  },
  getters: {
    getToken(state, getters, rootState, rootGetters) {
      return rootGetters.accessToken;
    },
    deviceID(state) {
      return state.device_id;
    },
    getRecentlyPlayedTracks(state) {
      return state.recentlyPlayedTracks;
    },
    getLastListenCards(state) {
      return state.lastListenCards;
    },
    isHeaderBtnActive(state) {
      return state.headerBtn;
    },
    currentTrackID(state) {
      return state.currentTrackID;
    },
    currentContextType(state) {
      return state.currentContextType;
    },
    isArtistContext(state) {
      return state.isArtistContext;
    },

    getCurrentDuration(state) {
      return state.currentDurationMS;
    },
    getCurrentProgress(state) {
      return state.currentProgressMS;
    },
    getLastProgressMS(state) {
      return state.lastProgressMS;
    },

    getPlayerProgress(state) {
      return state.playerProgress;
    },
    getVolumePercent(state) {
      return state.volumePercent;
    },
    getCurrentlyPlayingTrack(state) {
      return state.currentlyPlayingTrack;
    },
    getPlaybackState(state) {
      return state.playbackState;
    },
    getCurrentTrackAlbumImage(state) {
      return state.currentTrackAlbumImage;
    },
    getCurrentTrackIsFav(state) {
      return state.currentTrackIsFav;
    },
    isPlayingHeaderBtn(state) {
      return state.isPlayingHeaderBtn;
    },
    isClickHeaderBtn(state) {
      return state.isClickHeaderBtn;
    },
    getModalInfoType(state) {
      return state.modalInfoType;
    },
    getHeaderBtn(state) {
      return state.headerBtn;
    },
    getMonths(state) {
      return state.months;
    },
  },
};

export default controllerModule;