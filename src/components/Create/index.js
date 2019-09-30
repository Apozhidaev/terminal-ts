import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { startCreating } from '../../redux/app/editingForm/actions';
import EditForm from '../EditForm';
import Layout from '../Layout';


const Create = ({
  match,
  initParams,
  onStartCreating,
}) => {
  const parentId = Number(match.params.id) || undefined;
  const invalidating = (initParams.id !== undefined
    || initParams.parentId !== parentId
    || initParams.create !== true);

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

const mapStateToProps = (state) => ({
  initParams: state.app.editingForm.initParams,
});

const mapDispatchToProps = ({
  onStartCreating: startCreating,
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
