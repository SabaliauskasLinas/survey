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
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

export function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}