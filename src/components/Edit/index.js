import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { startEditing } from '../../redux/app/editingForm/actions';
import EditForm from '../EditForm';
import Layout from '../Layout';


const Edit = ({
  match,
  model,
  initParams,
  onStartEditing,
}) => {
  const id = Number(match.params.id);
  const slot = model.slots[id];
  const invalidating = (slot && (initParams.id !== id
    || initParams.parentId !== undefined
    || initParams.create !== undefined));

  useEffect(() => {
    if (invalidating) {
      onStartEditing({ id, slot });
    }
  });

  return (
    <Layout>
      {slot
        ? <EditForm />
        : 'Page not found'}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  model: state.model,
  initParams: state.app.editingForm.initParams,
});

const mapDispatchToProps = ({
  onStartEditing: startEditing,
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
