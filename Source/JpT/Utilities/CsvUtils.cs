using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualBasic.FileIO;

namespace JpT.Utilities
{
    public class CsvUtils
    {
        public List<T> ReadCsv<T>(string filePath, int lineStart = 0)
        {
            Stream stream = null;
            T obj = (T)Activator.CreateInstance(typeof(T));
            List<T> resultList = new List<T>();

            try
            {
                using (TextFieldParser parser = FileSystem.OpenTextFieldParser(filePath))
                {
                    int lineCurrent = 0;
                    // Process the file's lines.
                    while (!parser.EndOfData)
                    {
                        string line = parser.ReadLine();
                        if (lineCurrent >= lineStart)
                        {
                            resultList.Add(ConvertLineToObject<T>(line));
                        }
                        lineCurrent++;
                    }
                }
            }
            finally
            {
                if (stream != null)
                {
                    // Dispose stream
                    stream.Dispose();
                }
            }
            return resultList;
        }

        public void WriteCsv<T>(List<T> objList, string filePath, string seperator = null)
        {
            StreamWriter writer = null;
            try
            {
                using (writer = GetStreamWriter(filePath))
                {
                    foreach (var obj in objList)
                    {
                        string line = ConvertObjectToLine(obj, seperator);
                        writer.WriteLine(line);
                    }
                }
            }
            finally
            {
                if (writer != null)
                {
                    // Dispose stream
                    writer.Dispose();
                }
            }
        }

        private StreamWriter GetStreamWriter(string filePath)
        {
            StreamWriter stream = null;
            Encoding encoding = Encoding.UTF8;
            FileStream fs = null;
            if (File.Exists(filePath))
            {
                fs = new FileStream(filePath, FileMode.Append);
                stream = new StreamWriter(fs, encoding);
            }

            else
            {
                if (!Directory.Exists(Path.GetDirectoryName(filePath)))
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(filePath));
                }
                fs = new FileStream(filePath, FileMode.CreateNew);
                stream = new StreamWriter(fs, encoding);
            }

            return stream;
        }

        private T ConvertLineToObject<T>(string line)
        {
            T obj = (T)Activator.CreateInstance(typeof(T));

            PropertyInfo[] props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            string[] lines = line.Split(',');
            if (lines.Length == 0) return obj;
            int index = 0;
            foreach (PropertyInfo prop in props)
            {
                string value = null;
                if (index < lines.Length)
                {
                    value = lines[index];
                    prop.SetValue(obj, Convert.ChangeType(value, prop.PropertyType), null);
                }
                index++;
            }

            return obj;
        }

        private string ConvertObjectToLine<T>(T obj, string seperator)
        {
            List<string> rows = new List<string>();
            PropertyInfo[] props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            if (String.IsNullOrEmpty(seperator))
                seperator = String.Empty;
            foreach (PropertyInfo prop in props)
            {
                var item = prop.GetValue(obj, null);
                if (item == null)
                    rows.Add(seperator + String.Empty + seperator);
                else
                    rows.Add(seperator + prop.GetValue(obj, null).ToString() + seperator);
            }

            string line = String.Join(",", rows.ToArray());

            return line;
        }
    }
}