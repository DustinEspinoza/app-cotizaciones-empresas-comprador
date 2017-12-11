import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserPost } from './user-post';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
    private usrLogin: UserPost = new UserPost();
    private messageSource: BehaviorSubject<UserPost> = new BehaviorSubject(this.usrLogin);
    public currentMessage: Observable<UserPost> = this.messageSource.asObservable();
    constructor() { }

    changeMessage(message: UserPost) {
        console.log('Vengo del servicio: ');
        console.log(message);
        this.messageSource.next(message);
        console.log(this.usrLogin);
    }
}