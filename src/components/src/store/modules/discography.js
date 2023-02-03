const discographyModule = {
	namespaced: true,
	state: {
		isCompExist: true,
		favTracksIDInListView: [],
		currentSectionAlbumsID: [],
		discoRenderType: 'listView',
		selectedType: 'all',
		currentDiskoSection: '',
	},
	mutations: {
		favTracksID(state, payload) {
			state.favTracksIDInListView.push(payload);
		},
		clearTracksID(state) {
			state.favTracksIDInListView = [];
		},
		currentSectionAlbumsID(state, payload) {
			state.currentSectionAlbumsID = payload;
		},
		isCompExist(state, payload) {
			state.isCompExist = payload;
		},
		discoRenderType(state, payload) {
			state.discoRenderType = payload;
		},
		selectedType(state, payload) {
			state.selectedType = payload;
		},
		currentDiskoSection(state, payload) {
			state.currentDiskoSection = payload;
		},
		clearCurrentDiskoSection(state) {
			state.currentDiskoSection = '';
		},
	},
	actions: {
		favTracksID({ commit }, payload) {
			commit('favTracksID', payload);
		},
		clearTracksID({ commit }) {
			commit('clearTracksID');
		},
		currentSectionAlbumsID({ commit }, payload) {
			commit('currentSectionAlbumsID', payload);
		},
		discoRenderType({ commit }, payload) {
			commit('discoRenderType', payload);
		},
		selectedType({ commit }, payload) {
			commit('selectedType', payload);
		},
		currentDiskoSection({ commit }, payload) {
			commit('currentDiskoSection', payload);
		},
		clearCurrentDiskoSection({ commit }) {
			commit('clearCurrentDiskoSection');
		},
		async isCompExist({ commit }, payload) {
			commit('isCompExist', await payload);
		},
	},
	getters: {
		getfavTracksID(state) {
			return state.favTracksIDInListView;
		},
		getCurrentSectionAlbumsID(state) {
			return state.currentSectionAlbumsID;
		},
		isCompExist(state) {
			return state.isCompExist;
		},
		getDiscoRenderType(state) {
			return state.discoRenderType;
		},
		getSelectedType(state) {
			return state.selectedType;
		},
		getCurrentDiskoSection(state) {
			return state.currentDiskoSection;
		},
	},
};

export default discographyModule;
