using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamNiners.Helpers
{
    public class EnumParser
    {

        enum Platforms
        {
            NES,
            SNES,
            Nintendo_Sixty_Four,
            Sega_Genisis,
            Nintendo_Gamecube,
            Nintendo_Wii,
            Nintendo_Wii_U,
            Nintendo_Switch,
            Playstation,
            Playstation_2,
            Playstation_3,
            Playstation_4,
            Xbox,
            Xbox_360,
            Xbox_One
        }

        enum Categories
        {
            Action,
            Puzzle,
            RPG,
            Adventure,
            Sci_Fi,
            Combat,
            RTS,
            Simulation,
            FPS,
            Sports,
            Role_Playing
        }

        public static string GetEnumValue(int index, string enumType)
        {
            string val = "";

            if (enumType == "Category")
            {
                val = Enum.GetName(typeof(Categories), index);
            } else if (enumType == "Platform")
            {
                val = Enum.GetName(typeof(Platforms), index);
            }

            val = NormalizeOutput(val);

            return val;
        }

        public static string NormalizeOutput(string val)
        {
            if (val != "Sci_Fi" || val != "Role_Playing")
            {
                val = val.Replace('_', ' ');
            } else
            {
                val = val.Replace('_', '-');
            }

            if (val == "Nintendo_Sixty_Four")
            {
                val = "Nintendo 64";
            }

            return val;
        }
    }
}
