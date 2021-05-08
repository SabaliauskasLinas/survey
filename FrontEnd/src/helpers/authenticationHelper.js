import { BehaviorSubject } from 'rxjs';
import { postData } from './requestHelper';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationHelper = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

export function login(email, password) {
    return postData('Users/Authenticate', { email, password })
        .then(user => {
            updateUser(user);
            return user;
        });
}

export function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

export function updateUser(user) {
    let stringifiedUser = JSON.stringify(user);
    localStorage.setItem('currentUser', stringifiedUser);
    currentUserSubject.next(JSON.parse(stringifiedUser));
}