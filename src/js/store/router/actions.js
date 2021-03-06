import {SET_PAGE, SET_STORY, GO_BACK, OPEN_POPOUT, CLOSE_POPOUT, OPEN_MODAL, CLOSE_MODAL, SET_USER_ID} from './actionTypes';

export const setStory = (story, initial_panel) => (
    {
        type: SET_STORY,
        payload: {
            story: story,
            initial_panel: initial_panel,
        }
    }
);

export const setPage = (view, panel) => (
    {
        type: SET_PAGE,
        payload: {
            view: view,
            panel: panel
        }
    }
);

export const goBack = (from = 'iOS') => (
    {
        type: GO_BACK,
        payload: {
            from: from
        }
    }
);

export const openPopout = (popout) => (
    {
        type: OPEN_POPOUT,
        payload: {
            popout: popout
        }
    }
);

export const closePopout = () => (
    {
        type: CLOSE_POPOUT
    }
);

export const openModal = (id, note) => (
    {
        type: OPEN_MODAL,
        payload: {
            id,
            note
        }
    }
);

export const setCurrentUserId = (id) => (
    {
        type: SET_USER_ID,
        payload: {
            id
        }
    }
);


export const closeModal = () => (
    {
        type: CLOSE_MODAL
    }
);