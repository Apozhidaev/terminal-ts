import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { ReturnVoid } from '../../tools/type-utils';
import { signOut } from '../../redux/app/actions';
import { upload } from '../../redux/model/actions';
import { back, goRoot } from '../../redux/services/history/actions';
import Layout from '../Layout';
import { SateType } from '../../redux/reducer';
import { ModelStateType } from '../../redux/model/reducer';

type Props = {
  model: ModelStateType,
  onBack: ReturnVoid<typeof back>;
  onSignOut: ReturnVoid<typeof signOut>;
  onGoRoot: ReturnVoid<typeof goRoot>;
  onUpload: ReturnVoid<typeof upload.begin>;
};

const Settings = ({
  model,
  onBack,
  onSignOut,
  onGoRoot,
  onUpload,
}: Props) => {
  const handleDownload = () => {
    const json = JSON.stringify(model.source);
    const blob = new Blob([json], { type: 'application/json' });

    const a = document.createElement('a');
    a.download = `backup-${moment().format('YYYY-MM-DD')}.json`;
    a.href = URL.createObjectURL(blob);
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleUpload = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files) return; // todo show alert
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (!reader.result) return; // todo show alert
      let source;
      try {
        source = JSON.parse(reader.result as string);
      } catch ({ message }) {
        window.alert(message);
      }
      if (source && window.confirm('are you sure?')) {
        onUpload({ source });
        onGoRoot();
      }
    };
    reader.readAsText(file);
  };

  return (
    <Layout>
      <div className="row">
        <div className="col">
          <div className="btn-toolbar justify-content-between" role="toolbar">
            <div className="btn-group my-2" role="group">
              <button type="button" className="btn btn-secondary" onClick={onBack}>
                &larr;
              </button>
            </div>
            <div className="btn-group my-2" role="group">
              <button type="button" className="btn btn-warning" onClick={onSignOut}>
                sign out
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <div className="card">
            <div className="card-header">
              export
            </div>
            <div className="card-body">
              <button type="button" className="ml-2 btn btn-outline-success" onClick={handleDownload}>
                download
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <div className="card">
            <div className="card-header">
              import
            </div>
            <div className="card-body">
              <input type="file" onChange={handleUpload} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: SateType) => ({
  model: state.model,
});

const mapDispatchToProps = ({
  onBack: back,
  onSignOut: signOut,
  onGoRoot: goRoot,
  onUpload: upload.begin,
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
