// constants
export const MAIN_MENU = 'MAIN_MENU';
export const SELECTED_SUB_MENU = 'SELECTED_SUB_MENU';
export const SELECTED_MAIN_MENU = 'SELECTED_MAIN_MENU';
export const SUB_MENU = 'SUB_MENU';

export const initialGlobalState = {
    mainMenu: [],
    subMenu: [],
    selectedMainMenu: {},
    selectedSubMenu: {},
}

export default function reducer(state, action) {
    switch (action.type) {
        case MAIN_MENU:
            return { ...state, mainMenu: action.payload };
            case SUB_MENU:
                return { ...state, subMenu: action.payload };

        case SELECTED_MAIN_MENU:
            const findMenu = state.mainMenu.find(menu => menu.englishUrl.toLowerCase() === action.payload.toLowerCase());
            return { ...state, selectedMainMenu: findMenu || {} };

        case SELECTED_SUB_MENU:
            const SUBMenu = state.subMenu.find(menu => menu.englishUrl.toLowerCase() === action.payload.toLowerCase());
            return { ...state, selectedSubMenu: SUBMenu || {}};

        default:
            return state;
    }
}