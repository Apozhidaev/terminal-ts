import React from "react";
import { connect } from "react-redux";
import { ReturnVoid } from "../../../tools/type-utils";
import { setArchive } from "../../../redux/app/actions";
import { StateType } from "../../../redux/reducer";

type Props = {
  value: boolean;
  onChange: ReturnVoid<typeof setArchive>;
};

const Archive = ({ value, onChange }: Props) => {
  const handleInputChange = (event: React.MouseEvent) => {
    event.preventDefault();
    onChange(!value);
  };

  return (
    <a
      href="/"
      className="nav-item nav-link archive-link"
      onClick={handleInputChange}
    >
      {value ? <span className="text-warning">CORE</span> : <span>ARCHIVE</span>}
    </a>
  );
};

const mapStateToProps = (state: StateType) => ({
  value: state.app.archive,
});

const mapDispatchToProps = ({
  onChange: setArchive,
});

export default connect(mapStateToProps, mapDispatchToProps)(Archive);
