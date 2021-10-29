using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace KanjiSearch
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }
        private void Button_Run_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                List<WordModel> listWord = new List<WordModel>();
                ExcelUtils _excel = new ExcelUtils(txt.Text);
                _excel.ws_GetBySheetIndex(0);
                int countRows = _excel.ws_GetCountRow();
                for (int i = 2; i <= countRows; i++)
                {
                    listWord.Add(new WordModel());
                    listWord.Last().Kanji = _excel.cell_GetValueByCell(i, 2);

                    using (WebClient wc = new WebClient())
                    {
                        wc.Headers[HttpRequestHeader.ContentType] = "application/x-www-form-urlencoded";
                        string url = "https://" + "mazii.net/search/word?dict=javi&query=" + listWord.Last().Kanji + "&hl=vi-VN";
                        string html = wc.DownloadString(url);

                        string regexHira = "(phonetic-word japanese-char cl-content)?.*>(.*)<";
                        listWord.Last().Hiragana = Regex.Match(html, regexHira).Groups[2].Value;

                        string regexx
                        listWord
                    }
                }
            }
            catch
            {
                MessageBox.Show("Path không hợp lệ");
            }
        }

    }

    public class WordModel
    {
        public string Kanji { set; get; }
        public string Hiragana { set; get; }
        public string CnVi { set; get; }
        public string Mean { set; get; }
    }
}
