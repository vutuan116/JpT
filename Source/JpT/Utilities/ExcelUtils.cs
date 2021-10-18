using JpT.Resource;
using OfficeOpenXml;
using System.IO;
using System.Linq;

namespace JpT.Utilities
{
    public class ExcelUtils
    {
        private ExcelWorksheet worksheet;
        private ExcelPackage package;

        public ExcelUtils(string path)
        {
            LoadFileExcel(path);
        }

        public void LoadFileExcel(string path)
        {
            FileInfo fileInfo = new FileInfo(path);
            package = new ExcelPackage(fileInfo);
        }

        public void ws_GetBySheetIndex(int sheetIndex)
        {
            worksheet = package.Workbook.Worksheets.ElementAt(sheetIndex);
        }

        public string cell_GetValueByCell(int row, int column)
        {
            return worksheet.Cells[row, column].Text;
        }

        public int ws_GetCountRow()
        {
            return worksheet.Dimension.Rows;
        }

        public int ws_GetCountColumn()
        {
            return worksheet.Dimension.Columns;
        }

        public void cell_WriteByIndex(int row, int column, object value)
        {
            worksheet.SetValue(row, column, value);
        }

        public void Workbook_Save(string path)
        {
            if (!Directory.Exists(Path.GetDirectoryName(path)))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(path));
            }

            if (package.Workbook.Worksheets.Count > 0)
                package.Workbook.Worksheets[1].Select();
            try
            {
                package.SaveAs(new FileInfo(path));
            }
            catch
            {
                try
                {
                    Notification.ShowWarning(Messages.MSG_CLOSE_FILE_DATA);
                    package.SaveAs(new FileInfo(path));
                }catch{}
            }
            
        }
    }
}
