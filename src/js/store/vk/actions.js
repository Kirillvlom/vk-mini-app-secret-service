import {
    SET_COLOR_SCHEME,
    SET_ACCESS_TOKEN,
    SET_USER_ID,
    SET_ACTIVE_TAB,
    SET_SCROLL_POSITION,
    SET_SCROLL_POSITION_BY_ID
} from './actionTypes';
import user from '@vkontakte/icons/dist/24/user';

export const setColorScheme = (scheme) => (
    {
        type: SET_COLOR_SCHEME,
        payload: scheme
    }
);

export const setAccessToken = (accessToken) => (
    {
        type: SET_ACCESS_TOKEN,
        payload: accessToken
    }
);

export const setCurrentUserId = (userId) => ( 
    {
        type: SET_USER_ID,
        payload: userId
    }
)

console.log('setCurrentUserId', setCurrentUserId)

export const setActiveTab = (component, tab) => (
    {
        type: SET_ACTIVE_TAB,
        payload: {
            component,
            tab
        }
    }
);

export const setScrollPosition = (component, x = 0, y = 0) => (
    {
        type: SET_SCROLL_POSITION,
        payload: {
            component,
            x,
            y
        }
    }
);

export const setScrollPositionByID = (component) => (
    {
        type: SET_SCROLL_POSITION_BY_ID,
        payload: {
            component
        }
    }
);