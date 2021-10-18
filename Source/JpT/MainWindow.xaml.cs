using JpT.DAO;
using JpT.Logic;
using JpT.Model;
using JpT.Utilities;
using System.Windows;
using System.Windows.Controls;

namespace JpT
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
