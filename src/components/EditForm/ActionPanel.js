import React from 'react';
import { connect } from 'react-redux';
import { back } from '../../redux/services/history/actions';
import { saveChnages } from '../../redux/app/editingForm/actions';


const ActionPanel = ({ onBack, onSave, editingForm: { summary } }) => {
  const handleSave = () => {
    onSave();
    onBack();
  };
  return (
    <div className="row">
      <div className="col">
        <div className="btn-toolbar justify-content-between" role="toolbar">
          <div className="btn-group my-2" role="group">
            <button type="button" className="btn btn-secondary" onClick={onBack}>
              &larr;
            </button>
          </div>
          <div className="btn-group my-2" role="group">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onBack}
            >
              cancel
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleSave}
              disabled={!summary}
            >
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  editingForm: state.app.editingForm,
});

const mapDispatchToProps = ({
  onBack: back,
  onSave: saveChnages,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionPanel);
