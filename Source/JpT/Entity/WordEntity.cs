using JpT.Model;
using System;

namespace JpT.Entity
{
    public class WordEntity
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Level { get; set; }
        public string Lesson { get; set; }
        public string Kanji { get; set; }
        public string Hiragana { get; set; }
        public string CnVi { get; set; }
        public string Mean { get; set; }
        public string IsHard { get; set; }
        public string Lock { get; set; }
        public string LastLearn { get; set; }

        public bool IsEmpty()
        {
            return string.IsNullOrEmpty(Lesson + Kanji + Hiragana + Mean);
        }

        public override bool Equals(object obj)
        {
            if (obj == null) return false;
            if (this == obj) return true;

            try
            {
                bool result = this.Id == ((WordEntity)obj).Id;
                return result;
            }
            catch
            {
                return false;
            }
        }

        public WordEntity Clone()
        {
            return (WordEntity)this.MemberwiseClone();
        }

        public WordModel ConvertToWordModel()
        {
            DateTime lastLearn = DateTime.MinValue;
            DateTime.TryParse(this.LastLearn, out lastLearn);
            return new WordModel()
            {
                Id = this.Id,
                Type = this.Type,
                Level = this.Level,
                Lesson = this.Lesson,
                Kanji = this.Kanji,
                Hiragana = this.Hiragana,
                CnVi = this.CnVi,
                Mean = this.Mean,
                IsHard = !string.IsNullOrEmpty(this.IsHard),
                IsLock = !string.IsNullOrEmpty(this.Lock),
                LastLearn = lastLearn,
                IsRepeat = false
            };
        }
    }
}
