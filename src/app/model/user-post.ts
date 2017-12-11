import { CompanyPost } from './company-post';
import { Role } from './role';

export class UserPost{
    public userID: number;
    public username: string;
    public email: string;
    public phone_number: string;
    public active: boolean;
    public createdDate: string;
    public company: CompanyPost;
    public role: Role;
    public password: null;
}
