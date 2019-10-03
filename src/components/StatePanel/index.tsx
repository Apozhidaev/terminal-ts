import React from "react";
import { connect } from "react-redux";
import { StateType } from "../../redux/reducer";

type Props = {
  syncStatus: number;
  archive: boolean;
  slotCount: number;
};

const StatePanel = ({ syncStatus, archive, slotCount }: Props) => {
  const getBadge = () => {
    switch (syncStatus) {
      case 1:
        return <span className="badge badge-primary">sync...</span>;
      case 2:
        return <span className="badge badge-danger">sync...</span>;
      default:
        return <span className="badge badge-success">synced</span>;
    }
  };

  return (
    <div>
      {getBadge()}
      &nbsp;
      {archive && <span className="badge badge-warning d-md-none">archive</span>}
      &nbsp;
      <span className="badge badge-info">{slotCount}</span>
    </div>
  );
};

const mapStateToProps = (state: StateType) => ({
  syncStatus: state.services.backup.syncStatus,
  archive: state.app.archive,
  slotCount: state.app.slotCount,
});

export default connect(mapStateToProps)(StatePanel);
