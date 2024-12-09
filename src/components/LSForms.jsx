export default function LSForms(props) {
  const { lsMode } = props;
  async function signUP() {
    alert("signUP");
  }
  async function logIn() {
    alert("logIn");
  }
  return (
    <div>
      <h1>{lsMode ? "Зарегистрируйтесь" : "Войдите"}</h1>
      <input placeholder="nick name" />
      <input placeholder="password" />
      
      <button onClick={lsMode ? signUP : logIn}>
        {lsMode ? "sign up" : "log in"}
      </button>
    </div>
  );
}
