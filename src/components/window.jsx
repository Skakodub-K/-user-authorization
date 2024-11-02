import CreateForm from "./createForm";
import CheckForm from "./checkForm";
export default function WindowForm(props) {
  /* Mode - 3 type:
        1- create = true,
        2- check = false,
    */
  const { mode, exit } = props;
  return (
    <div className="window">
      <div
        className="count-particles exit-buttton"
        onClick={() => {
          exit(false);
        }}
      >
        X
      </div>
      {mode ? <CreateForm /> : <CheckForm />}
    </div>
  );
}
