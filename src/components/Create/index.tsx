import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ReturnVoid } from '../../tools/type-utils';
import { startCreating } from '../../redux/app/editingForm/actions';
import EditForm from '../EditForm';
import Layout from '../Layout';
import { StateType } from '../../redux/reducer';
import { InitParamType } from '../../redux/app/editingForm/reducer';

type Props = {
  match: { params: { id: string } };
  initParams: InitParamType;
  onStartCreating: ReturnVoid<typeof startCreating>;
};

const Create = ({
  match,
  initParams,
  onStartCreating,
}: Props) => {
  const parentId = Number(match.params.id) || -1;
  const invalidating = (initParams.create !== true || initParams.parentId !== parentId);

  useEffect(() => {
    if (invalidating) {
      onStartCreating({ parentId });
    }
  });

  return (
    <Layout>
      <EditForm />
    </Layout>
  );
};

const mapStateToProps = (state: StateType) => ({
  initParams: state.app.editingForm.initParams,
});

const mapDispatchToProps = ({
  onStartCreating: startCreating,
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
