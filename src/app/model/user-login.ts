export class userLogin{
    public CompanyID: Number;
    public UserName: String;
    public Password: String;
    constructor(CompanyID: Number, UserName: String, Password: String) {
        this.CompanyID = CompanyID;
        this.UserName = UserName;
        this.Password = Password;
    }
}