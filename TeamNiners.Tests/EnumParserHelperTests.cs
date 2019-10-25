using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;
using TeamNiners.Helpers;

namespace TeamNiners.Tests
{
    class EnumParserHelperTests
    {
        [SetUp]
        public void Setup()
        {

        }

        [Test]
        public void Check_GetEnumValue_ReturnPlatformNES()
        {

            //Arrange
            int index = 0;
            string enumType = "Platform";

            //Act

            string value = EnumParser.GetEnumValue(index, enumType);

            //Assert

            Assert.AreEqual("NES", value);
        }

        [Test]
        public void Check_GetEnumValue_ReturnEmpltyPlatform()
        {

            //Arrange
            int index = 15;
            string enumType = "Platform";

            //Act

            string value = EnumParser.GetEnumValue(index, enumType);

            //Assert

            Assert.AreEqual("", value);
        }


        [Test]
        public void Check_GetEnumValue_ReturnCategoryAction()
        {

            //Arrange
            int index = 0;
            string enumType = "Category";

            //Act

            string value = EnumParser.GetEnumValue(index, enumType);

            //Assert

            Assert.AreEqual("Action", value);
        }

        [Test]
        public void Check_GetEnumValue_ReturnEmpltyCategories()
        {

            //Arrange
            int index = 12;
            string enumType = "Category";

            //Act

            string value = EnumParser.GetEnumValue(index, enumType);

            //Assert

            Assert.AreEqual("", value);
        }

    }
}
