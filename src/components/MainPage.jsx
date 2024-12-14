import { Link } from "react-router-dom";
export default function MainPage() {
  return (
    <div className="App">
      <center>
        <h1>Какую задачу решаем? </h1>
      </center>
      <div className="main_container">
        <Link className="count-particles main_button" to="/first_task">
          Создать ЭЦП
        </Link>
        <Link className="count-particles main_button" to="/second_task">
          Аутентификация
        </Link>
      </div>
    </div>
  );
}
