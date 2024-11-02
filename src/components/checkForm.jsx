import DragAndDrop from "./DragAndDrop";

export default function CheckForm() {
  return (
    <div className="check-form_container">
      <center>
        <h1 className="app-header">Проверить ЭЦП</h1>
      </center>
      <DragAndDrop />
      <center>
        <div id="pad" className="check-pad">
          <center>
            <b>Открытый ключ</b>
          </center>
          <textarea className="textarea"></textarea>
        </div>
        <button className="count-particles check-button" onClick={(e) => {}}>
          Проверить
        </button>
      </center>
    </div>
  );
}
