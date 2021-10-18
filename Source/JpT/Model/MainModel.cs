namespace JpT.Model
{
    public class MainModel:BaseModel
    {
        private string _kotobaNewLastLearning;
        public string KotobaNewLastLearning
        {
            get { return _kotobaNewLastLearning; }
            set
            {
                if (_kotobaNewLastLearning == value) return;
                _kotobaNewLastLearning = value;
                OnPropertyChanged("KotobaNewLastLearning");
            }
        }

        private string _kotobaAgainLastLearning;
        public string KotobaAgainLastLearning
        {
            get { return _kotobaAgainLastLearning; }
            set
            {
                if (_kotobaAgainLastLearning == value) return;
                _kotobaAgainLastLearning = value;
                OnPropertyChanged("KotobaAgainLastLearning");
            }
        }

        private string _kanjiNewLastLearning;
        public string KanjiNewLastLearning
        {
            get { return _kanjiNewLastLearning; }
            set
            {
                if (_kanjiNewLastLearning == value) return;
                _kanjiNewLastLearning = value;
                OnPropertyChanged("KanjiNewLastLearning");
            }
        }

        private string _kanjiAgainLastLearning;
        public string KanjiAgainLastLearning
        {
            get { return _kanjiAgainLastLearning; }
            set
            {
                if (_kanjiAgainLastLearning == value) return;
                _kanjiAgainLastLearning = value;
                OnPropertyChanged("KanjiAgainLastLearning");
            }
        }
    }
}
