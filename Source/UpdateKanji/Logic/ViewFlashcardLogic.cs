using UpdateKanji.DAO;
using UpdateKanji.Entity;
using UpdateKanji.Model;
using UpdateKanji.Utilities;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace UpdateKanji.Logic
{
    public class ViewFlashcardLogic
    {
        WordDAO dAO = new WordDAO();

        public void UpdateKanji()
        {
            List<WordEntity> listWord = dAO.GetAllWordEntity();
            List<WordEntity> listKJWord = dAO.GetKanjiUpdateWordEntity();
            List<WordEntity> result = new List<WordEntity>();

            List<List<WordEntity>> tempAll = new List<List<WordEntity>>();

            foreach (WordEntity entity in listKJWord)
            {
                List<WordEntity> temp = listWord.FindAll(x => x.Kanji.Contains(entity.Kanji));
                temp = temp == null ? new List<WordEntity>() : temp;
                temp.Insert(0, entity);
                tempAll.Add(temp);
            }

            tempAll.Sort((x, y) => (x.Count() - y.Count()));

            int MAX_COUNT = 5;

            foreach (List<WordEntity> temp in tempAll)
            {
                List<WordEntity> temp2 = temp.FindAll(x => x.isNotSelected);
                temp2 = temp2 == null ? new List<WordEntity>() : temp2.Take(MAX_COUNT).ToList();

                if (temp2.Count() < MAX_COUNT)
                {
                    List<WordEntity> temp3 = temp.FindAll(x => !x.isNotSelected);
                    temp2.AddRange(temp3.Take(MAX_COUNT - temp2.Count()));
                }
                temp2.ForEach(x =>
                {
                    if (!string.IsNullOrEmpty(x.Hiragana) && !string.IsNullOrEmpty(x.Mean))
                    {
                        x.isNotSelected = false;
                    }
                });
                result.AddRange(temp2);
            }
            dAO.SaveKanjiUpdate(result);
        }
    }
}
