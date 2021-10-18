using JpT.Logic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace JpT.Utilities
{
    public class CommonUtils
    {
        public static T MappingData<T>(object objectSource)
        {
            PropertyInfo[] PropsObjectNew = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            PropertyInfo[] PropsObjectOld = objectSource.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance);
            T item = (T)Activator.CreateInstance(typeof(T));
            foreach (PropertyInfo prop in PropsObjectNew)
            {
                string propName = prop.Name;
                PropertyInfo propMatching = null;
                foreach (PropertyInfo propOld in PropsObjectOld)
                {
                    if (propOld.Name.Equals(prop.Name))
                    {
                        propMatching = propOld;
                        break;
                    }
                }
                object value;
                if (propMatching != null)
                {
                    if (prop.PropertyType.Name == "DateTime")
                    {
                        string tempValue = propMatching.GetValue(objectSource, null).ToString();
                        DateTime temp = DateTime.MinValue;
                        DateTime.TryParse(tempValue, out temp);
                        if (temp != DateTime.MinValue)
                        {
                            prop.SetValue(item, temp, null);
                        }
                    }
                    else if (prop.PropertyType.Name == "Boolean")
                    {
                        string tempValue = propMatching.GetValue(objectSource, null).ToString();
                        value = string.IsNullOrEmpty(tempValue) || tempValue.ToUpper().Equals("FALSE") ? false : true;
                        prop.SetValue(item, value, null);
                    }
                    else
                    {
                        value = propMatching.GetValue(objectSource, null);
                        prop.SetValue(item, Convert.ChangeType(value, prop.PropertyType), null);
                    }
                }
            }
            return item;
        }

        public static T ConvertObject<T>(T objectNew, Object objectOld)
        {
            PropertyInfo[] PropsObjectNew = objectNew.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance);
            PropertyInfo[] PropsObjectOld = objectOld.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance);
            T item = (T)Activator.CreateInstance(objectNew.GetType());
            foreach (PropertyInfo prop in PropsObjectNew)
            {
                string propName = prop.Name;
                PropertyInfo propMatching = null;
                foreach (PropertyInfo propOld in PropsObjectOld)
                {
                    if (propOld.Name.Equals(prop.Name))
                    {
                        propMatching = propOld;
                        break;
                    }
                }
                if (propMatching != null)
                {
                    object value = propMatching.GetValue(objectOld, null);
                    prop.SetValue(item, Convert.ChangeType(value, prop.PropertyType), null);
                }
            }
            return item;
        }
    
        public static LevelEnum ConvertLevelEnum(string levelStr)
        {
            LevelEnum result = LevelEnum.N5;
            switch (levelStr)
            {
                case "4":
                    result = LevelEnum.N1;
                    break;
                case "N1":
                    result = LevelEnum.N1;
                    break;

                case "3":
                    result = LevelEnum.N2;
                    break;
                case "N2":
                    result = LevelEnum.N2;
                    break;

                case "2":
                    result = LevelEnum.N3;
                    break;
                case "N3":
                    result = LevelEnum.N3;
                    break;

                case "1":
                    result = LevelEnum.N4;
                    break;
                case "N4":
                    result = LevelEnum.N4;
                    break;
            }
            return result;
        }
    }
}
