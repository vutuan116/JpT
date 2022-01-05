using JpT.DAO;
using JpT.Entity;
using JpT.Model;
using JpT.Utilities;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace JpT.Logic
{
    public class ViewFlashcardLogic
    {
        WordDAO dAO = new WordDAO();

        public List<LessonModel> GetListLesson(LevelEnum level)
        {
            return dAO.GetListLesson(level);
        }

        public List<WordModel> GetListWordByLesson(List<LessonModel> listLesson, StartModeEnum typeGetWord, bool isRepeat)
        {
            List<WordModel> result = new List<WordModel>();
            List<WordEntity> listEntity = new List<WordEntity>();

            if (typeGetWord == StartModeEnum.Remind)
            {
                listEntity = dAO.GetWordRemind();
                foreach (WordEntity entity in listEntity)
                {
                    result.Add(ConvertWordEntityToWordModel(entity, isRepeat));
                }
                return result;
            }

            listLesson.ForEach(x =>
            {
                listEntity.AddRange(dAO.GetDataByLesson(x));
            });

            foreach (WordEntity entity in listEntity)
            {
                WordModel model = ConvertWordEntityToWordModel(entity, isRepeat);

                if (typeGetWord == StartModeEnum.ViewListWord)
                {
                    result.Add(model);
                }
                else if (typeGetWord == StartModeEnum.OnlyHard && model.IsHard)
                {
                    result.Add(model);
                }
                else if (typeGetWord == StartModeEnum.LearnNormal && !model.IsLock)
                {
                    result.Add(model);
                }
            }
            return result;
        }

        private WordModel ConvertWordEntityToWordModel(WordEntity entity, bool isRepeat = true)
        {
            WordModel model = CommonUtils.MappingData<WordModel>(entity);
            model.CnVi = string.IsNullOrEmpty(model.CnVi) ? model.CnVi : model.CnVi.ToUpper();
            model.IsHard = !string.IsNullOrEmpty(entity.IsHard);
            model.IsLock = !string.IsNullOrEmpty(entity.Lock);
            model.IsRepeat = isRepeat;

            return model;
        }

        public List<WordModel> RandomWordInList(List<WordModel> listWord)
        {
            List<WordModel> result = new List<WordModel>();
            Random random = new Random();
            while (listWord.Count > 0)
            {
                int randomInt = random.Next(0, listWord.Count - 1);
                result.Add(listWord[randomInt]);
                listWord.RemoveAt(randomInt);
            }

            return result;
        }

        public void UpdateWordHardAndLock(ObservableCollection<WordModel> listWord)
        {
            List<WordEntity> dataEntity = new List<WordEntity>();
            foreach (WordModel model in listWord)
            {
                WordEntity entity = new WordEntity() { Id = model.Id, IsHard = model.IsHard ? "X" : string.Empty, Lock = model.IsLock ? "X" : string.Empty };
                dataEntity.Add(entity);
            }
            dAO.UpdateWordHardAndLock(dataEntity);
        }

        public void UpdateWordLastLearn(ObservableCollection<WordModel> listWord)
        {
            List<WordEntity> dataEntity = new List<WordEntity>();
            foreach (WordModel model in listWord)
            {
                WordEntity entity = new WordEntity() { Id = model.Id, LastLearn = model.LastLearn.ToString(Constant.DATETIME_FORMAT) };
                dataEntity.Add(entity);
            }
            dAO.UpdateWordLastLearn(dataEntity);
        }

        public void UpdateLessonLastLearn(List<LessonModel> listLesson)
        {
            List<LessonHistoryEntity> listLessonEntity = new List<LessonHistoryEntity>();

            foreach (LessonModel lesson in listLesson)
            {
                listLessonEntity.Add(new LessonHistoryEntity() { LastLearn = lesson.LastLearning, Name = lesson.LessonName });
            }

            dAO.UpdateLessonHistory(listLessonEntity);
        }

        public LevelEnum GetLevelConfig()
        {
            return dAO.GetLevelConfig();
        }

        public void SaveLevelConfig(LevelEnum level)
        {
            dAO.SaveLevelConfig(level);
        }
    }
}
