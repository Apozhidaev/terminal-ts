import React from 'react';
import { connect } from 'react-redux';
import { ReturnVoid } from '../../tools/type-utils';
import ActionPanel from './ActionPanel';
import Content from './Content';
import Resources from './Resources';
import Parents from './Parents';
import StatePanel from '../StatePanel';
import { setSummary, setRoot } from '../../redux/app/editingForm/actions';
import { SateType } from '../../redux/reducer';
import { ModelStateType } from '../../redux/model/reducer';
import { EditingFormSateType } from '../../redux/app/editingForm/reducer';

type Props = {
  model: ModelStateType,
  editingForm: EditingFormSateType,
  onSetSummary: ReturnVoid<typeof setSummary>;
  onSetRoot: ReturnVoid<typeof setRoot>;
};

const EditForm = ({
  model,
  onSetSummary,
  onSetRoot,
  editingForm: {
    summary,
    root,
    initParams: { id },
  },
}: Props) => {
  const slot = model.slots && id ? model.slots[id] : undefined;
  return (
    <>
      <ActionPanel />
      <div className="row mb-3">
        <div className="col-md-2">
          <StatePanel />
        </div>
        <div className="col-md-10">
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label
                  htmlFor="edit-form_summary-id"
                  className="lead text-primary"
                >
                  summary
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="edit-form_summary-id"
                  name="summary"
                  placeholder="summary..."
                  value={summary}
                  onChange={(event) => onSetSummary(event.target.value)}
                />
              </div>
              <Content slot={slot} />
            </div>
            <div className="card-body">
              <div className="custom-control custom-checkbox mr-sm-2">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="edit-form_root-checkbox"
                  checked={root}
                  onChange={() => onSetRoot(!root)}
                />
                <label
                  className="custom-control-label"
                  htmlFor="edit-form_root-checkbox"
                >
                  pin to root
                </label>
              </div>
            </div>
            <div className="card-body">
              <Resources />
            </div>
            <div className="card-body">
              <Parents />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: SateType) => ({
  editingForm: state.app.editingForm,
  model: state.model,
});

const mapDispatchToProps = ({
  onSetSummary: setSummary,
  onSetRoot: setRoot,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
