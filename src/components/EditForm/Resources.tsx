import React from 'react';
import { connect } from 'react-redux';
import { ReturnVoid } from '../../tools/type-utils';
import { setUrl, setDesc, remove } from '../../redux/app/editingForm/resource/actions';
import { SateType } from '../../redux/reducer';
import { ResourceStateType } from '../../redux/app/editingForm/resource/reducer';

type Props = {
  resourceForm: ResourceStateType,
  onSetUrl: ReturnVoid<typeof setUrl>;
  onSetDesc: ReturnVoid<typeof setDesc>;
  onRemove: ReturnVoid<typeof remove>;
};

const Resources = ({
  resourceForm,
  onSetUrl,
  onSetDesc,
  onRemove,
}: Props) => {
  const { values } = resourceForm;
  const handleSetUrl = (key: number, url: string) => {
    onSetUrl({ key, url });
  };

  const handleSetDesc = (key: number, description: string) => {
    onSetDesc({ key, description });
  };

  const last = values.length - 1;
  const resources = values.map((res, i) => (
    <div key={res.key} className="form-inline">
      <input
        type="text"
        name="url"
        className="form-control mb-2 mr-sm-2 mb-sm-0"
        placeholder="https://..."
        value={res.url}
        onChange={(event) => handleSetUrl(res.key, event.target.value)}
      />
      <input
        type="text"
        name="description"
        className="form-control mb-2 mr-sm-2 mb-sm-0"
        placeholder="description..."
        value={res.description}
        onChange={(event) => handleSetDesc(res.key, event.target.value)}
      />
      {i !== last && (
        <button
          type="button"
          className="btn btn-link mb-4 mb-sm-0"
          onClick={() => onRemove(res.key)}
        >
          remove
        </button>
      )}
    </div>
  ));
  return (
    <div>
      <p className="lead text-primary">urls</p>
      {resources}
    </div>
  );
};

const mapStateToProps = (state: SateType) => ({
  resourceForm: state.app.editingForm.resource,
});

const mapDispatchToProps = ({
  onSetUrl: setUrl,
  onSetDesc: setDesc,
  onRemove: remove,
});

export default connect(mapStateToProps, mapDispatchToProps)(Resources);
