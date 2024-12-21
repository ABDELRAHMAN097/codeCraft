import { useRecoilState } from 'recoil';
import { languageState } from '../recoil/languageState';
import { MdOutlineArrowDropDown } from 'react-icons/md';

const LanguageSwitcher = ({ darkMode }) => {
  const [language, setLanguage] = useRecoilState(languageState);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };
  

  return (
    <div>
      <button
        onClick={toggleLanguage}
        className="toggleLanguage"
        style={{
          color: darkMode ? "#FFFFFF" : "#300A0B",  
        }}
      >
        {language === 'en' ? 'EN' : 'AR'}
        <MdOutlineArrowDropDown
          style={{
            color: darkMode ? "#FFFFFF" : "#300A0B",  
            fontSize: "30px",
          }}
        />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
