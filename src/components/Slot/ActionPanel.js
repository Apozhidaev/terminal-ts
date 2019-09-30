import React from 'react';
import { connect } from 'react-redux';
import { editSlot } from '../../redux/app/actions';
import { back } from '../../redux/services/history/actions';
import { updateSlot, removeSlot } from '../../redux/model/actions';


const Slot = ({
  id,
  archive,
  onBack,
  onUpdate,
  onRemove,
  onEditSlot,
}) => {
  const handleEdit = () => {
    onEditSlot(id);
  };

  const handleToArchive = () => {
    onUpdate({ id, fields: { archive: true } });
  };

  const handleFromArchive = () => {
    onUpdate({ id, fields: { archive: false } });
  };

  const handleRemove = () => {
    if (window.confirm('are you sure?')) {
      onRemove({ id });
      onBack();
    }
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
            {archive
              ? (
                <button type="button" className="btn btn-outline-secondary" onClick={handleFromArchive}>
                  from archive
                </button>
              )
              : (
                <button type="button" className="btn btn-outline-secondary" onClick={handleToArchive}>
                  to archive
                </button>
              )}
            <button type="button" className="btn btn-outline-danger" onClick={handleRemove}>
              remove
            </button>
            <button type="button" className="btn btn-outline-primary" onClick={handleEdit}>
              edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = ({
  onBack: back,
  onUpdate: updateSlot.begin,
  onRemove: removeSlot.begin,
  onEditSlot: editSlot,
});

export default connect(mapStateToProps, mapDispatchToProps)(Slot);
