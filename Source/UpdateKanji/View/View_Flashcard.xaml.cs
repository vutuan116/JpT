using UpdateKanji.Logic;
using UpdateKanji.Model;
using UpdateKanji.Utilities;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;

namespace UpdateKanji
{
    /// <summary>
    /// Interação lógica para SubWindowKanji.xam
    /// </summary>
    public partial class View_Flashcard : UserControl
    {
        private ViewFlashcardLogic _logic = new ViewFlashcardLogic();

        public View_Flashcard(MainWindow mainWindow)
        {
            InitializeComponent();
        }

        private void btnStartUpdate_Click(object sender, RoutedEventArgs e)
        {
            _logic.UpdateKanji();
        }
    }
}
