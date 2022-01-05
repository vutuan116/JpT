using JpT.Logic;
using System.Collections.ObjectModel;

namespace JpT.Model
{
    public class ViewFlashcardModel : BaseModel
    {
        // Menu
        private StartModeEnum _startMode = StartModeEnum.LearnNormal;
        private SubStartModeEnum _subStartMode = SubStartModeEnum.Sequentially;
        private ObservableCollection<LessonModel> _listVocabularyLesson = new ObservableCollection<LessonModel>();
        private ObservableCollection<LessonModel> _listKanjiLesson = new ObservableCollection<LessonModel>();
        private ObservableCollection<WordModel> _currentListWord = new ObservableCollection<WordModel>();
        private WordModel _currentWord = new WordModel();
        private bool _isCheckRepeat;

        public bool IsCheckRepeat
        {
            get
            {
                return _isCheckRepeat;
            }
            set
            {
                if (_isCheckRepeat == value) return;
                _isCheckRepeat = value;
                OnPropertyChanged("IsCheckRepeat");
            }
        }

        public LevelEnum Level { get; set; }

        public StartModeEnum StartMode
        {
            get
            {
                return _startMode;
            }
            set
            {
                if (_startMode == value) return;
                _startMode = value;
                OnPropertyChanged("StartMode");
            }
        }

        public WordModel CurrentWord
        {
            get
            {
                return _currentWord;
            }
            set
            {
                if (_currentWord == value) return;
                _currentWord = value;
                OnPropertyChanged("CurrentWord");
            }
        }

        public SubStartModeEnum SubStartMode
        {
            get
            {
                return _subStartMode;
            }
            set
            {
                if (_subStartMode == value) return;
                _subStartMode = value;
                OnPropertyChanged("SubStartMode");
            }
        }

        public ObservableCollection<LessonModel> ListVocabularyLesson
        {
            get { return _listVocabularyLesson; }
            set
            {
                if (_listVocabularyLesson == value) return;
                _listVocabularyLesson = value;
                OnPropertyChanged("ListVocabularyLesson");
            }
        }

        public ObservableCollection<LessonModel> ListKanjiLesson
        {
            get { return _listKanjiLesson; }
            set
            {
                if (_listKanjiLesson == value) return;
                _listKanjiLesson = value;
                OnPropertyChanged("ListKanjiLesson");
            }
        }

        public ObservableCollection<WordModel> CurrentListWord
        {
            get { return _currentListWord; }
            set
            {
                if (_currentListWord == value) return;
                _currentListWord = value;
                OnPropertyChanged("CurrentListWord");
            }
        }
    }
}
