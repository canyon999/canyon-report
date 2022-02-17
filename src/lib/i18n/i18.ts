import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/resources'
console.log(resources,'resources')
i18n
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    //选择默认语言，选择内容为上述配置中的key，即en/zh
    fallbackLng: "zh_CN",
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: resources
  });



export default i18n;
