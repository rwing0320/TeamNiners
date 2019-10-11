using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using TeamNiners.Interfaces;

namespace TeamNiners.Services
{
    public class SecurityService : ISecurityService
    {

        /// <summary>
        /// Converts to password to a character array, then for each char it will
        /// pick a random value from the string and add it to the salt
        /// </summary>
        /// <returns>The randomized salt to be used for password security</returns>
        public string GenerateSalt(string password)
        {
            Random alphaNumeric = new Random();
            int randomCharacter = 0;
            string possibleValues = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%;&?";
            char[] charList = password.ToCharArray();
            string randomizedSalt = string.Empty;

            foreach (char s in charList)
            {
                randomCharacter = alphaNumeric.Next(0, possibleValues.Length - 1);
                randomizedSalt += possibleValues[randomCharacter];
            }

            return randomizedSalt;
        }

        /// <summary>
        /// Used in the Authenticate call upon login,
        /// Will hash the concatenated value of the user inputted password + the salt stored in the database
        /// </summary>
        /// <returns>String of the Hashed Password</returns>
        public string HashingCheckLogin(string password, string salt)
        {
            string HashedPassword = string.Empty;

            using (SHA256 hash = SHA256.Create())
            {
                byte[] hashedPassBytes = hash.ComputeHash(Encoding.UTF8.GetBytes(password + salt));

                HashedPassword = Convert.ToBase64String(hashedPassBytes);

                return HashedPassword;
            }
        }

        }
}
