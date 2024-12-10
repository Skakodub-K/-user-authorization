import { useState } from "react";

export default function LSForms(props) {
  const { lsMode } = props;
  const [notFoundName, setNotFoundName] = useState(false);
  const [notFoundPswd, setNotFoundPswd] = useState(false);

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

  async function signUP() {
    const usname = document.getElementById("usname_s").value;
    const password = document.getElementById("pswd_s").value;
    if (usname !== "" && password !== "") {
      alert(`signUP -> name:${usname} | password: ${password}`);
      setNotFoundName(false);
      setNotFoundPswd(false);
    } else {
      getIsValues(usname, password);
    }
  }

  async function logIn() {
    const usname = document.getElementById("usname_l").value;
    const password = document.getElementById("pswd_l").value;
    if (usname !== "" && password !== "") {
      alert(`logIn -> name:${usname} | password: ${password}`);
      setNotFoundName(false);
      setNotFoundPswd(false);
    } else {
      getIsValues(usname, password);
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

          <button
            className="count-particles ls-buttton"
            onClick={lsMode ? signUP : logIn}
          >
            {lsMode ? "sign up" : "log in"}
          </button>
        </div>
      </center>
    </>
  );
}
