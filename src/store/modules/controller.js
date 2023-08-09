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
    countryCode: "",
    currentlyPlayingTrack: null,
    playbackState: null,
    currentTrackAlbumImage: null,
    headerBtn: false,
    device_id: null,
    myDevice: null,
    volumePercent: null,
    repeatMode: false,
    shuffle: false,
    startInterval: "",
    startReverseInterval: "",
    playerProgress: 0,
    currentProgressMS: null,
    lastProgressMS: 0,
    currentDurationMS: null,
    lastReverseProgressMS: 0,
    currentTrackID: null,
    currentContextType: null,
    isArtistContext: null,
    currentTrackIsFav: "",
    userQueue: [],
    allQueueList: [],
    queueFavTrackIDs: [],
    queueTrackList: [],
    recentlyPlayedTracks: null,
    lastListenCards: null,
    modalInfoType: null,
    isPlayingHeaderBtn: null,
    isClickHeaderBtn: null,
  },
  mutations: {
    countryCode(state, payload) {
      state.countryCode = payload;
    },
    myDevice(state, payload) {
      state.myDevice = payload;
    },

    volumePercent(state, payload) {
      state.volumePercent = payload;
    },

    toggleRepeatMode(state, payload) {
      state.repeatMode = payload;
    },
    toggleShuffle(state, payload) {
      state.shuffle = payload;
    },
    queueFavTrackIDs(state, payload) {
      state.queueFavTrackIDs.push(payload);
    },
    clearQueueTracksID(state) {
      state.queueFavTrackIDs = [];
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
    lastReverseProgressMS(state, payload) {
      state.lastReverseProgressMS = payload;
    },
    clearLastReverseProgressMS(state) {
      state.lastReverseProgressMS = 0;
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
    allQueueList(state, payload) {
      state.allQueueList = payload;
    },
    queueTrackList(state, payload) {
      state.queueTrackList.push(payload);
    },
    clearQueueTrackList(state) {
      state.queueTrackList = [];
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
    async countryCode({ commit }, code) {
      commit("countryCode", await code);
    },
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
      return await axios
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
                commit(
                  "toggleShuffle",
                  getters.getPlaybackState?.shuffle_state
                );
                commit(
                  "toggleRepeatMode",
                  getters.getPlaybackState?.repeat_state
                );
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
                  "lastReverseProgressMS",
                  getters.getPlaybackState?.item.duration_ms -
                    getters.getPlaybackState?.progress_ms
                );
                commit(
                  "playerPercent",
                  +(
                    (getters.getCurrentProgress / getters.getCurrentDuration) *
                    100
                  ).toFixed(2)
                );

                commit("currentContextType", data?.context?.type);
                commit("currentTrackID", data.item.id);
                dispatch("isFavTrack");
                commit("currentTrackAlbumImage", data.item.album.images[0].url);
                if (getters.getPlaybackState.is_playing) {
                  dispatch("clearIntervalFunc");
                  commit("lastProgressMS", getters.getCurrentProgress);
                  commit(
                    "lastReverseProgressMS",
                    getters.getLastReverseProgressMS
                  );

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
            Authorization: "Bearer " + getters.getToken,
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
    async putVolumePercent({ commit, getters }, volPercent) {
      fetch(
        `https://api.spotify.com/v1/me/player/volume?volume_percent=${volPercent}`,
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
          volPercent ? commit("volumePercent", volPercent) : "";
        })
        .catch((err) => console.log(err));
    },
    async toggleRepeatMode({ commit, getters, dispatch }, repeat_state) {
      fetch(
        `https://api.spotify.com/v1/me/player/repeat?state=` + repeat_state,
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
          if (data.status == 204) {
            dispatch("fetchPlaybackState").then(() =>
              commit("toggleRepeatMode", repeat_state)
            );
          }
        })
        .catch((err) => console.log(err));
    },
    async toggleShuffle({ commit, getters, dispatch }, boolean) {
      fetch(`https://api.spotify.com/v1/me/player/shuffle?state=` + boolean, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + getters.getToken,
        },
      })
        .then((data) => {
          if (data.status === 204) {
            commit("toggleShuffle", boolean);
            dispatch("fetchPlaybackState");
          }
        })
        .catch((err) => console.log(err));
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
          dispatch("fetchCurrentlyPlayingTrack");
          if (data.status === 204) {
            console.log("Playback started");
            dispatch("fetchCurrentlyPlayingTrack");
            commit("lastProgressMS", getters.getCurrentProgress);
            commit("lastReverseProgressMS", getters.getLastReverseProgressMS);
            dispatch("clearIntervalFunc");
            dispatch("setIntervalFunc");
          }
        })
        .catch((err) => console.log(err));
    },
    async pauseCurrentTrack({ getters, dispatch }) {
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
          dispatch("fetchCurrentlyPlayingTrack");
          if (data.status === 204) {
            console.log("Playback paused");
            dispatch("fetchCurrentlyPlayingTrack");
            dispatch("clearIntervalFunc");
          }
        })
        .catch((err) => console.log(err));
    },
    async playSelectedTrack({ getters, dispatch, commit }, uri) {
      await axios
        .put(
          `https://api.spotify.com/v1/me/player/play?device_id=${getters.deviceID}`,
          {
            uris: [uri.uri],
            position_ms:
              uri.id === getters.getPlaybackState?.item?.id
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
            dispatch("fetchCurrentlyPlayingTrack");
            dispatch("fetchCurrentlyPlayingTrack");
            commit("lastProgressMS", getters.getCurrentProgress);
            commit("lastReverseProgressMS", getters.getLastReverseProgressMS);
            dispatch("clearIntervalFunc");
            dispatch("setIntervalFunc");
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
            dispatch("fetchCurrentlyPlayingTrack");
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
                getters.getCurrentlyPlayingTrack?.context?.type &&
              (await contextUri.uri) ===
                getters.getCurrentlyPlayingTrack?.context?.uri &&
              (await contextUri.id) ===
                getters.getCurrentlyPlayingTrack?.item.id
                ? getters.getCurrentlyPlayingTrack?.progress_ms
                : (await contextUri.id) ===
                    getters.getCurrentlyPlayingTrack?.item.id &&
                  (await contextUri.type) ===
                    getters.getCurrentlyPlayingTrack?.context?.type
                ? getters.getCurrentlyPlayingTrack?.progress_ms
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
            dispatch("fetchCurrentlyPlayingTrack");
            dispatch("fetchCurrentlyPlayingTrack");
            dispatch("userQueue");
            dispatch("userQueue");
            console.log(getters.currentTrackID);
            console.log(
              "context type=>",
              getters.getPlaybackState?.context?.type
            );
            commit("lastProgressMS", getters.getCurrentProgress);
            commit("lastReverseProgressMS", getters.getLastReverseProgressMS);
            commit("isArtistContext", false);
            dispatch("clearIntervalFunc");
            dispatch("setIntervalFunc");
          }
        })
        .catch((err) => console.log(err));
    },
    songTimeProgress({ commit, getters, state }) {
      commit("lastProgressMS", state.lastProgressMS + 1000);
      commit("currentProgressMS", getters.getLastProgressMS);
      commit(
        "playerPercent",
        +(
          (getters.getLastProgressMS / getters.getCurrentDuration) *
          100
        ).toFixed(2)
      );
    },
    songReverseTimeProgress({ commit, getters, state }) {
      commit("lastReverseProgressMS", state.lastReverseProgressMS - 1000);
    },
    setIntervalFunc({ dispatch }) {
      this.startInterval = setInterval(() => {
        dispatch("songTimeProgress");
      }, 1000);
      dispatch("setReverseIntervalFunc");
    },
    setReverseIntervalFunc({ dispatch }) {
      this.startReverseInterval = setInterval(() => {
        dispatch("songReverseTimeProgress");
      }, 1000);
    },
    clearIntervalFunc() {
      clearInterval(this.startInterval);
      clearInterval(this.startReverseInterval);
    },
    async seekToPosition({ getters, dispatch }, progress_ms) {
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
            dispatch("fetchCurrentlyPlayingTrack");
            dispatch("fetchCurrentlyPlayingTrack");
          }
        })
        .catch((err) => console.log(err));
    },

    async skipToNextTrack({ getters, dispatch, commit, state }) {
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
            dispatch("fetchCurrentlyPlayingTrack");
            dispatch("fetchCurrentlyPlayingTrack");
            dispatch("clearIntervalFunc");
            commit("clearLastProgressMS");
            dispatch("setIntervalFunc");
            console.log("skipped to Next Track!");
            state.queueTrackList.length ? state.queueTrackList.shift() : "";
            dispatch("userQueue");
            dispatch("userQueue").then(() => {
              state.queueTrackList.length
                ? state.allQueueList.splice(0, state.queueTrackList.length)
                : "";
            });
          }
        })
        .catch((err) => console.log(err));
    },
    async skipToPrevTrack({ getters, dispatch, commit }) {
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
            dispatch("userQueue");
            dispatch("fetchCurrentlyPlayingTrack");
            dispatch("fetchCurrentlyPlayingTrack");
            dispatch("clearIntervalFunc");
            commit("clearLastProgressMS");
            dispatch("setIntervalFunc");
          }
        })
        .catch((err) => console.log(err));
    },

    queueFavTrackIDs({ commit }, payload) {
      commit("queueFavTrackIDs", payload);
    },
    async userQueue({ getters, commit, state }) {
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
          commit("allQueueList", data.queue);
        })
        .catch((err) => console.log(err));
    },
    async addItemToQueue({ getters, dispatch, state, commit }, uri) {
      fetch(
        `https://api.spotify.com/v1/me/player/queue?uri=${uri}&device_id=${getters.deviceID}`,
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
          if (data.status !== 204) {
            dispatch("modalInfoType", {
              type: "error",
            });
          }
          if (data.status === 204) {
            dispatch("modalInfoType", {
              type: "queue",
              status: true,
            });
            dispatch("userQueue").then(() => {
              let queueListLength = state.queueTrackList.length;
              commit("queueTrackList", state.userQueue.queue[queueListLength]);
              state.queueTrackList.length
                ? state.allQueueList.splice(0, state.queueTrackList.length)
                : "";
            });
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
    getCountryCode(state) {
      return state.countryCode;
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
    getLastReverseProgressMS(state) {
      return state.lastReverseProgressMS;
    },

    getPlayerProgress(state) {
      return state.playerProgress;
    },
    getVolumePercent(state) {
      return state.volumePercent;
    },
    isShuffle(state) {
      return state.shuffle;
    },
    getRepeatMode(state) {
      return state.repeatMode;
    },
    getQueueFavTrackIDs(state) {
      return state.queueFavTrackIDs;
    },
    getCurrentlyPlayingTrack(state) {
      return state.currentlyPlayingTrack;
    },
    getPlaybackState(state) {
      return state.playbackState;
    },
    getUserQueue(state) {
      return state.userQueue;
    },
    getQueueTrackList(state) {
      return state.queueTrackList;
    },
    getAllQueueList(state) {
      return state.allQueueList;
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
