using JpT.Logic;

namespace JpT.Model
{
    public class LessonModel : BaseModel
    {
        private string _type;
        private string _lessonName;
        private bool _isSelected;
        private string _lastLearning;

        public LevelEnum Level { get; set; }

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

        public string LessonName
        {
            get { return _lessonName; }
            set
            {
                if (_lessonName == value) return;
                _lessonName = value;
                OnPropertyChanged("LessonName");
            }
        }

        public bool IsSelected
        {
            get { return _isSelected; }
            set
            {
                if (_isSelected == value) return;
                _isSelected = value;
                OnPropertyChanged("IsSelected");
            }
        }

        public string LastLearning
        {
            get { return _lastLearning; }
            set
            {
                if (_lastLearning == value) return;
                _lastLearning = value;
                OnPropertyChanged("LastLearning");
            }
        }
    }
}
