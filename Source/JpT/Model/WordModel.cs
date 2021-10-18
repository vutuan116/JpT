using System;

namespace JpT.Model
{
    public class WordModel : BaseModel
    {
        private int _id = 0;
        private string _type = string.Empty;
        private string _level = string.Empty;
        private string _lesson = string.Empty;
        private string _kanji = string.Empty;
        private string _hiragana = string.Empty;
        private string _cnVi = string.Empty;
        private string _mean = string.Empty;
        private bool _isHard = false;
        private bool _islock = false;
        private DateTime _lastLearn;
        private bool _isRepeat = false;
        /*===============================================================*/
        public bool IsDisplayed { get; set; }
        /*===============================================================*/
        public int Id
        {
            get { return _id; }
            set
            {
                if (_id == value) return;
                _id = value;
                OnPropertyChanged("Id");
            }
        }

        public string Type
        {
            get { return _type; }
            set
            {
                if (_type == value) return;
                _type = value;
                OnPropertyChanged("Type");
            }
        }

        public string Level
        {
            get { return _level; }
            set
            {
                if (_level == value) return;
                _level = value;
                OnPropertyChanged("Level");
            }
        }
        public string Lesson
        {
            get { return _lesson; }
            set
            {
                if (_lesson == value) return;
                _lesson = value;
                OnPropertyChanged("Lesson");
            }
        }
        public string Kanji
        {
            get { return _kanji; }
            set
            {
                if (_kanji == value) return;
                _kanji = value;
                OnPropertyChanged("Kanji");
            }
        }
        public string Hiragana
        {
            get { return _hiragana; }
            set
            {
                if (_hiragana == value) return;
                _hiragana = value;
                OnPropertyChanged("Hiragana");
            }
        }
        public string CnVi
        {
            get { return _cnVi; }
            set
            {
                if (_cnVi == value) return;
                _cnVi = value;
                OnPropertyChanged("CnVi");
            }
        }
        public string Mean
        {
            get { return _mean; }
            set
            {
                if (_mean == value) return;
                _mean = value;
                OnPropertyChanged("Mean");
            }
        }
        public bool IsHard
        {
            get { return _isHard; }
            set
            {
                if (_isHard == value) return;
                _isHard = value;
                OnPropertyChanged("IsHard");
            }
        }

        public bool IsLock
        {
            get { return _islock; }
            set
            {
                if (_islock == value) return;
                _islock = value;
                OnPropertyChanged("IsLock");
            }
        }

        public bool IsRepeat
        {
            get { return _isRepeat; }
            set
            {
                if (_isRepeat == value) return;
                _isRepeat = value;
                OnPropertyChanged("IsRepeat");
            }
        }

        public DateTime LastLearn
        {
            get { return _lastLearn; }
            set
            {
                if (_lastLearn == value) return;
                _lastLearn = value;
                OnPropertyChanged("LastLearn");
            }
        }

        public WordModel Clone()
        {
            return (WordModel)this.MemberwiseClone();
        }

        public bool Equals(WordModel other)
        {
            if (other == null) return false;
            if (this == other) return true;
            return this.Id == other.Id;
        }
    }
}
