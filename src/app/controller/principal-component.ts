import { Component } from '@angular/core';
import { UserPost } from '../model/user-post';
import { PersistenceService, StorageType } from 'angular-persistence';
import { Router } from '@angular/router';

@Component({
    selector: 'principal',
    templateUrl: '../view/principal.component.html'
})

export class PrincipalComponent {
    isLogged: boolean;
    constructor(private persistence: PersistenceService, private router: Router) { }
    ngOnInit() {
        this.isLogged = this.persistence.get('isLogged', StorageType.SESSION);
        if (!this.isLogged || this.isLogged == null || this.isLogged == undefined) {
            this.router.navigate(['/login']);
        }
    }
}