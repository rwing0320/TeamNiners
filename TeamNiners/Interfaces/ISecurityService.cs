namespace TeamNiners.Interfaces
{
    public interface ISecurityService
    {
        string GenerateSalt(string password);
        string HashingCheckLogin(string password, string salt);

    }
}