using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JpT.Logic
{
    public class Constant
    {
        // Common
        public static readonly string FILE_DATA = Path.Combine(System.AppDomain.CurrentDomain.BaseDirectory, "Data", "Data.xlsx");
        public static readonly string DATETIME_FORMAT = "yyyy-MM-dd";
        public static readonly int MAX_COUNT_WORD_REMIND = 50;

        // Data
        public static readonly int DATA_COL_TYPE = 2;
        public static readonly int DATA_COL_LEVEL = 3;
        public static readonly int DATA_COL_LESSON = 4;
        public static readonly int DATA_COL_KANJI = 5;
        public static readonly int DATA_COL_HIRAGANA = 6;
        public static readonly int DATA_COL_CNVI = 7;
        public static readonly int DATA_COL_MEANING = 8;
        public static readonly int DATA_COL_IS_HARD = 9;
        public static readonly int DATA_COL_LOCK = 10;
        public static readonly int DATA_COL_LAST_LEARN = 11;

        public static readonly int CONFIG_COL_NAME = 2;
        public static readonly int CONFIG_COL_LAST_LEARN = 3;
        public static readonly int CONFIG_COL_LEVEL = 4;
    }

    #region Enum
    public enum StartModeEnum : int
    {
        ViewListWord = 0,
        LearnNormal = 1,
        OnlyHard = 2,
        Remind = 3
    }

    public enum SubStartModeEnum : int
    {
        Sequentially = 0,
        Random = 1
    }
    public enum LevelEnum : int
    {
        N5 = 0,
        N4 = 1,
        N3 = 2,
        N2 = 3,
        N1 = 4
    }
    #endregion
}
