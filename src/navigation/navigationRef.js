import { NavigationActions } from 'react-navigation';

let navigator;

export function setNavigator(nav) {
    navigator = nav;
};

export function navigate(routeName, params) {
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    );
};
