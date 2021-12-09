using UpdateKanji.Entity;
using UpdateKanji.Logic;
using UpdateKanji.Model;
using UpdateKanji.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace UpdateKanji.DAO
{
    public class WordDAO
    {
        private ExcelUtils _excel = new ExcelUtils(Constant.FILE_DATA);
        private List<WordEntity> _wordOriginal = new List<WordEntity>();

        private List<WordEntity> _wordKJUpdateOriginal = new List<WordEntity>();

        public WordDAO()
        {
            InitData();
            InitListKJUpdate();
        }

        public List<WordEntity> GetAllWordEntity()
        {
            List<WordEntity> clone = new List<WordEntity>();
            _wordOriginal.ForEach(x =>
            {
                clone.Add(x.Clone());
            });
            return clone;
        }

        public List<WordEntity> GetKanjiUpdateWordEntity()
        {
            List<WordEntity> clone = new List<WordEntity>();
            _wordKJUpdateOriginal.ForEach(x =>
            {
                clone.Add(x.Clone());
            });
            return clone;
        }

        public void SaveKanjiUpdate(List<WordEntity> listKJUpdate)
        {
            _excel.ws_GetBySheetIndex(2);
            int countRows = _excel.ws_GetCountRow() +2;

            for (int i = 0; i < listKJUpdate.Count; i++)
            {
                _excel.cell_WriteByIndex(i + countRows, 1, listKJUpdate[i].Kanji);
                _excel.cell_WriteByIndex(i + countRows, 2, listKJUpdate[i].Hiragana);
                _excel.cell_WriteByIndex(i + countRows, 3, listKJUpdate[i].CnVi);
                _excel.cell_WriteByIndex(i + countRows, 4, listKJUpdate[i].Mean);
            }
            _excel.Workbook_Save(Constant.FILE_DATA);

            Notification.ShowWarning("Done!");
        }

        public bool InitListKJUpdate()
        {
            try
            {
                string listKotobaStr = string.Empty;
                _excel.ws_GetBySheetIndex(2);
                int countRows = _excel.ws_GetCountRow();
                for (int i = 2; i <= countRows; i++)
                {
                    WordEntity entity = new WordEntity();
                    entity.Kanji = _excel.cell_GetValueByCell(i, 1);
                    if (entity.IsEmpty())
                    {
                        continue;
                    }
                    _wordKJUpdateOriginal.Add(entity);
                }

                return true;
            }
            catch(Exception e)
            {
                Notification.ShowWarning("File Data không đúng định dạng!");
                return false;
            }
        }

        public bool InitData()
        {
            try
            {
                string listKotobaStr = string.Empty;
                _excel.ws_GetBySheetIndex(0);
                int countRows = _excel.ws_GetCountRow();
                for (int i = 2; i <= countRows; i++)
                {
                    WordEntity entity = new WordEntity();
                    entity.Id = i;
                    entity.Type = _excel.cell_GetValueByCell(i, Constant.DATA_COL_TYPE);
                    entity.Level = _excel.cell_GetValueByCell(i, Constant.DATA_COL_LEVEL);
                    entity.Lesson = _excel.cell_GetValueByCell(i, Constant.DATA_COL_LESSON);
                    entity.Kanji = _excel.cell_GetValueByCell(i, Constant.DATA_COL_KANJI);
                    entity.Hiragana = _excel.cell_GetValueByCell(i, Constant.DATA_COL_HIRAGANA);
                    entity.CnVi = _excel.cell_GetValueByCell(i, Constant.DATA_COL_CNVI);
                    entity.Mean = _excel.cell_GetValueByCell(i, Constant.DATA_COL_MEANING);
                    entity.IsHard = _excel.cell_GetValueByCell(i, Constant.DATA_COL_IS_HARD);
                    entity.Lock = _excel.cell_GetValueByCell(i, Constant.DATA_COL_LOCK);
                    entity.LastLearn = _excel.cell_GetValueByCell(i, Constant.DATA_COL_LAST_LEARN);
                    if (entity.IsEmpty())
                    {
                        continue;
                    }
                    _wordOriginal.Add(entity);
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

    }
}
