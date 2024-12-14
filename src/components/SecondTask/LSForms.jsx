import { useState } from "react";
import { createOpenKey, encryptText } from "./clientCalc.js";

export default function LSForms(props) {
  // Что выбрал юзер: зарегистрироваться или залогиниться
  const { lsMode } = props;

  const [notFoundName, setNotFoundName] = useState(false);
  const [notFoundPswd, setNotFoundPswd] = useState(false);
  const [isSuccessfully, setIsSuccessfully] = useState(false);
  const [isResp, setIsResp] = useState(false);

  function getIsValues(name, password) {
    if (name === "") {
      setNotFoundName(true);
      if (password === "") {
        setNotFoundPswd(true);
      }
    } else {
      setNotFoundPswd(true);
    }
  }
  
  function getResultIcon(state) {
    if (state) {
      return (
        <div className={`form_status ${isSuccessfully && "successfully"}`}>
          <img className="form_status-icon" src="/done.png" alt="done"></img>
          <p className="form_status-text" style={{ color: "#4cc949" }}>
            {lsMode ? "Регистрация прошла успешно" : "Успешный вход"}
          </p>
        </div>
      );
    } else {
      return (
        <div className={`form_status ${isSuccessfully && "successfully"}`}>
          <img className="form_status-icon" src="/errors.png" alt="err"></img>
          <p className="form_status-text" style={{ color: "#ed5451" }}>
            {lsMode ? "Ошибка регистрации" : "Ошибка входа"}
          </p>
        </div>
      );
    }
  }

  // Обработчик нажатия кнопки "Зарегистрироваться"
  async function signUP() {
    const username = document.getElementById("usname_s").value;
    const password = document.getElementById("pswd_s").value;
    if (username !== "" && password !== "") {
      setNotFoundName(false);
      setNotFoundPswd(false);

      const openKey = createOpenKey(password);

      // Отправляем открытый ключ и логин на сервер с использованием fetch API
      const formData = new FormData();
      formData.append("openKey", JSON.stringify(openKey));
      formData.append("username", username);

      const response = await fetch("http://localhost:5000/authRegistry", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setIsResp(true);
        setIsSuccessfully(true);
        document.getElementById("usname_s").value = "";
        document.getElementById("pswd_s").value = "";
      } else {
        setIsResp(true);
        console.error("Ошибка регистрации!");
      }
    } else {
      getIsValues(username, password);
    }
  }

  // Обработчик нажатия кнопки "Войти"
  async function handlerPresslogIn() {
    const username = document.getElementById("usname_l").value;
    const password = document.getElementById("pswd_l").value;
    if (username !== "" && password !== "") {
      setNotFoundName(false);
      setNotFoundPswd(false);

      // Отправляем логин на сервер с использованием fetch API и ждем шифр-текст
      requestCipherForLogIn();
      
    } else {
      getIsValues(username, password);
    }
  }

  // Просим у сервера шифр-текст
  async function requestCipherForLogIn() {
    const formData = new FormData();
    formData.append("username", username);
    const response = await fetch("http://localhost:5000/authLoginRequest", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      await sendResponeForLogIn(response.body.ciphr)
    } else {
      setIsResp(true);
      console.error("Ошибка входа!");
    }
  }

  async function sendResponeForLogIn(ciphr) {
    // Расшифровываем шифр
    const NotCiphr = "";
    
    const formData = new FormData();
    formData.append("username", username);
    formData.append("NotCiphr", NotCiphr);

    const response = await fetch("http://localhost:5000/authLoginRequest", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      await sendResponeForLogIn(response.body.ciphr)
    } else {
      setIsResp(true);
      console.error("Ошибка входа!");
    }


    if (response.ok) {
      setIsResp(true);
      setIsSuccessfully(true);
      document.getElementById("usname_s").value = "";
      document.getElementById("pswd_s").value = "";
    } else {
      setIsResp(true);
      console.error("Ошибка входа!");
    }
  }

    return (
      <>
        <center>
          <h1 className="ls-header">
            {lsMode ? "Зарегистрируйтесь" : "Войдите"}
          </h1>
          <div className="ls-container">
          <input
            id={`usname_${lsMode ? "s" : "l"}`}
            className={notFoundName ? "not-name" : ""}
            placeholder={notFoundName ? "Введите имя" : "username"}
          />
          <input
            id={`pswd_${lsMode ? "s" : "l"}`}
            className={notFoundName ? "not-pswd" : ""}
            placeholder={notFoundPswd ? "Введите пароль" : "password"}
          />
          {!isSuccessfully ? (
            <button
              className="count-particles ls-buttton"
              onClick={lsMode ? signUP : handlerPresslogIn}
            >
              {lsMode ? "sign up" : "log in"}
            </button>
          ) : (
            <></>
          )}
        </div>
        {isResp && getResultIcon(isSuccessfully)}
      </center>
    </>
  );
}
