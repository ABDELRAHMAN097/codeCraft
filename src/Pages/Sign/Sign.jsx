import { LuUser2 } from "react-icons/lu";
import { RiMailSendFill } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { PiLightbulbFilamentFill } from "react-icons/pi";
import headphone from "../../assets/images/Vector (5).png";
import star from "../../assets/images/Group.png";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiSun } from "react-icons/ci";
import translations from "../../language/language";
import { languageState } from "../../recoil/languageState";
import { useRecoilState } from "recoil";
import back from "../../assets/images/back.png";
import { useEffect, useState } from "react";
import LanguageSwitcher from "../../LanguageSwitcher/LanguageSwitcher";
import Cupe from "../../Components/Cupe/Cupe";
import light from "../../assets/images/light.jpeg";
import dark from "../../assets/images/dark.jpeg";
import Rectangle from "../../assets/images/Rectangle.png";
import dd from "../../assets/images/dd.png";
import "./sign.css";

const Sign = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  // localStorag
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);
  // toggleDarkMode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };
  // toggle Lunguage
  const [language, setLanguage] = useRecoilState(languageState);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    }
  }, [setLanguage]);
  const dir = language === "ar" ? "rtl" : "ltr";
  // form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    serviceType: "", // لتخزين نوع الخدمة
  });
  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, email, phone, serviceType } = formData;
    setIsAnimating(true);
    // تحويل البيانات إلى تنسيق application/x-www-form-urlencoded
    const formPayload = new URLSearchParams({
      name: firstName,
      email: email,
      phone: phone,
      service: serviceType,
    }).toString();

    try {
      const response = await fetch("https://codecraft1.com/data_saver.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // التأكد من الـ header الصحيح
        },
        body: formPayload, // إرسال البيانات هنا
      });

      if (response.ok) {
        const result = await response.json(); // التعامل مع النتيجة
        console.log("Form submitted successfully:", result);
        setFormData({
          firstName: "",
          email: "",
          phone: "",
          serviceType: "",
        });
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 20000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url(${darkMode ? dark : light})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container">
        <img className="Rectangle" src={Rectangle} alt="" />
        <div className="nav">
          <div
            style={{
              color: darkMode ? "#FFFFFF" : "#300A0B",
              fontSize: "30px",
            }}
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <MdOutlineDarkMode className="coloricon" />
            ) : (
              <CiSun className="coloricon" />
            )}
          </div>

          <LanguageSwitcher darkMode={darkMode} />
        </div>

        <div dir={dir} className="kratos">
          <img className="back" src={back} alt="" />

          <div className="animate1 animate"></div>
          <div className="animate2 animate"></div>
          <div className="animate3 animate"></div>

          <div className="Cupe">
            <Cupe className="" />
          </div>
          <div className="Cupe2">
            <Cupe className="" />
          </div>

          <div className="container2">
            <div className="info">
              <h1
                style={{
                  background: "linear-gradient(90deg, #683233, #C4AFAF)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                CODECRART
              </h1>
              <p
                style={{
                  color: darkMode ? "#FFFFFF" : "#300A0B",
                }}
              >
                {translations[language].paragraph}
              </p>

              <div className="text-i">
                <p>
                  <span>
                    <img src={headphone} alt="headphone" />
                  </span>
                  <span
                    style={{
                      color: darkMode ? "#FFFFFF" : "#300A0B",
                    }}
                    className="margin"
                  >
                    {translations[language].sup}
                  </span>
                </p>

                <p>
                  <span>
                    <img src={star} alt="star" />
                  </span>
                  <span
                    style={{
                      color: darkMode ? "#FFFFFF" : "#300A0B",
                    }}
                    className="margin"
                  >
                    {translations[language].hight}
                  </span>
                </p>
                <p>
                  <span>
                    <PiLightbulbFilamentFill
                      style={{
                        color: darkMode ? "#FFFFFF" : "#300A0B",
                      }}
                      className="lamp"
                    />
                  </span>
                  <span
                    style={{
                      color: darkMode ? "#FFFFFF" : "#300A0B",
                    }}
                    className="margin"
                  >
                    {translations[language].Innovative}
                  </span>
                </p>
              </div>
            </div>

            <div className="form-container">
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label
                    style={{
                      color: darkMode ? "#FFFFFF" : "#300A0B",
                    }}
                  >
                    {translations[language].name}
                  </label>
                  <div className="input-container">
                    <LuUser2 className="form-icons" />

                    <input
                      type="text"
                      className="custom-input"
                      style={{ color: darkMode ? "#FFFFFF" : "#300A0B" }}
                      name="firstName"
                      placeholder={translations[language].name}
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label style={{ color: darkMode ? "#FFFFFF" : "#300A0B" }}>
                    {translations[language].email}
                  </label>
                  <div className="input-container">
                    <RiMailSendFill className="form-icons" />

                    <input
                      className="custom-input"
                      style={{ color: darkMode ? "#FFFFFF" : "#300A0B" }}
                      type="email"
                      name="email"
                      placeholder={translations[language].email}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label
                    style={{
                      color: darkMode ? "#FFFFFF" : "#300A0B",
                    }}
                  >
                    {translations[language].phone}
                  </label>
                  <div className="input-container">
                    <FaPhoneAlt className="form-icons" />
                    <input
                      style={{ color: darkMode ? "#FFFFFF" : "#300A0B" }}
                      dir={dir}
                      type="tel"
                      name="phone"
                      className="custom-input"
                      placeholder={translations[language].phone}
                      minLength="9"
                      maxLength="15"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label
                    style={{
                      color: darkMode ? "#FFFFFF" : "#300A0B",
                    }}
                  >
                    {translations[language].typee}
                  </label>

                  <div className="radio-group">
                    <label style={{ color: darkMode ? "#FFFFFF" : "#300A0B" }}>
                      
                      <input
                        style={{ color: darkMode ? "#FFFFFF" : "#300A0B" }}
                        className="radion"
                        type="radio"
                        name="serviceType"
                        value="Website"
                        onChange={handleChange}
                        checked={formData.serviceType === "Website"}
                        required
                      />

                      {translations[language].web}
                    </label>

                    <label
                      style={{
                        color: darkMode ? "#FFFFFF" : "#300A0B",
                      }}
                    >
                      <input
                        className="radion"
                        type="radio"
                        name="serviceType"
                        value="Application"
                        onChange={handleChange}
                        checked={formData.serviceType === "Application"}
                        required
                      />
                      {translations[language].app}
                    </label>

                    <div
                      className={`animation-shape ${
                        isAnimating ? "animation-visible" : "animation-hidden"
                      }`}
                    >
                      <div className="animation-shape-inner">
                        <div className="sk-folding-cube">
                          <div className="sk-cube1 sk-cube"></div>
                          <div className="sk-cube2 sk-cube"></div>
                          <div className="sk-cube4 sk-cube"></div>
                          <div className="sk-cube3 sk-cube"></div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <button
                  style={{ color: darkMode ? "#FFFFFF" : "#300A0B" }}
                  type="submit"
                  className="submit-btn"
                >
                  {translations[language].send}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="slog">
          <h2
            style={{
              background: "linear-gradient(90deg, #4B1E1F, #C4AFAF)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {translations[language].slog1}
          </h2>
          <p
            style={{
              background: "linear-gradient(90deg, #4B1E1F, #C4AFAF)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {translations[language].slog2}
          </p>
          <img className="dd" src={dd} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Sign;
