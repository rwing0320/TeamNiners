using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NUnit;
using NUnit.Framework;
using TeamNiners.Selenium;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

namespace TeamNiners.Selenium
{
    public class AuotmatedLogin
    {
        IWebDriver driver;

        [Test]
        public void FillGameData()
        {
            string username = "example@example.com";
            string password = "sillyfahad123";

            driver = new ChromeDriver(System.Environment.CurrentDirectory);
            driver.Url = "http://localhost:64874";
            driver.Manage().Window.Maximize();


            IWebElement link = driver.FindElement(By.Id("BusinessLogin"));
      
            link.Click();

            IWebElement emailAddress_Login = driver.FindElement(By.Id("employeeEmail"));
            emailAddress_Login.Click();
            emailAddress_Login.SendKeys(username);

            IWebElement password_Login = driver.FindElement(By.Id("employeepassword"));
            password_Login.Click();
            password_Login.SendKeys(password);

            IWebElement loginButton = driver.FindElement(By.XPath("//*[@id='root']/div/div/div/div/div/form/button"));
            loginButton.Click();

        }
    }
}
