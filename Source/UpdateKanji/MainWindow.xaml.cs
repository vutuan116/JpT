﻿using UpdateKanji.DAO;
using UpdateKanji.Logic;
using UpdateKanji.Model;
using UpdateKanji.Utilities;
using System.Windows;
using System.Windows.Controls;

namespace UpdateKanji
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            ShowFlashcard();
        }

        private void ShowFlashcard()
        {
            GridChildren.Children.Clear();
            GridChildren.Children.Add(new View_Flashcard(this));
        }

        private void OnClosing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            //if (Notification.ShowConfirm("Bạn muốn thoát chương trình?") == System.Windows.Forms.DialogResult.Yes)
            //{
            //    Application.Current.Shutdown();
            //}
            //else
            //{
            //    e.Cancel = true;
            //}
        }
    }
}
