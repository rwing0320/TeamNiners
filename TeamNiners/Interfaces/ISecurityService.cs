namespace TeamNiners.Services
{
    internal interface ISecurityService
    {
        string HashingCheckLogin(string password, string salt);
    }
}