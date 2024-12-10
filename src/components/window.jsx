import CreateForm from "./createForm";
import CheckForm from "./checkForm";
import LSForms from "./LSForms";
export default function WindowForm(props) {
  /* Mode - 3 type:
        1- createECP 
        2- checkECP 
        3- log in 
        4- sing up
    */
  const { mode, exit } = props;

  function getNeedsWindow(mode) {
    switch (mode) {
      case 1: {
        return <CreateForm />;
      }
      case 2: {
        return <CheckForm />;
      }
      case 3: {
        return <LSForms lsMode={true}/>;
      }
      case 4: {
        return <LSForms lsMode={false}/>;
      }
      default:
        return <></>;
    }
  }

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
      {getNeedsWindow(mode)}
    </div>
  );
}
