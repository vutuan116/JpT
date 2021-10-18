using JpT.Logic;
using System.Collections.Generic;

namespace JpT.Entity
{
    public class ConfigEntity
    {
        public List<LessonHistoryEntity> LessonHistoryList { get; set; }
        public LevelEnum LevelSelected { get; set; }
    }

    public class LessonHistoryEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastLearn { get; set; }

        public override bool Equals(object obj)
        {
            if (obj == null) return false;
            if (this == obj) return true;

            try
            {
                bool result = this.Name.Equals(((LessonHistoryEntity)obj).Name);
                return result;
            }
            catch
            {
                return false;
            }
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public override string ToString()
        {
            return base.ToString();
        }
    }
}
