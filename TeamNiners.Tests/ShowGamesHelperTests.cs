using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;
using TeamNiners.Helpers;


namespace TeamNiners.Tests
{
    class ShowGamesHelperTests
    {

        [SetUp]
        public void Setup()
        {

        }

        [Test]
        public void Check_GetGamesList_ReturnGamesListForBusinessID1()
        {

            //Arrange
            int id = 1;

            UserTempStorage.id = id;

            //Act


           // List<ShowGameItem> value = ShowGameItem.GetGamesList();

            //Assert

           //Assert.AreEqual(value.Count, 0);
        }

        [Test]
        public void Check_GetGamesList_ReturnEmptyListForBusinessID3()
        {

            //Arrange
            int id = 3;

            UserTempStorage.id = id;

            //Act


            //List<ShowGameItem> value = ShowGameItem.GetGamesList();

            //Assert

            //Assert.AreEqual(0,value.Count);
        }

    }
}
