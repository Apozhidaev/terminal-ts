import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ReturnVoid } from "../../tools/type-utils";
import { startEditing } from "../../redux/app/editingForm/actions";
import EditForm from "../EditForm";
import Layout from "../Layout";
import { StateType } from "../../redux/reducer";
import { InitParamType } from "../../redux/app/editingForm/reducer";
import { ModelStateType } from "../../redux/model/reducer";

type Props = {
  match: { params: { id: string } };
  model: ModelStateType;
  initParams: InitParamType;
  onStartEditing: ReturnVoid<typeof startEditing>;
};

const Edit = ({
  match,
  model,
  initParams,
  onStartEditing,
}: Props) => {
  const id = Number(match.params.id);
  const slot = model.slots ? model.slots[id] : undefined;
  const invalidating = initParams.create === true || initParams.id !== id;

  useEffect(() => {
    if (slot && invalidating) {
      onStartEditing({ id, slot });
    }
  });

  return (
    <Layout>
      {slot
        ? <EditForm />
        : "Page not found"}
    </Layout>
  );
};

const mapStateToProps = (state: StateType) => ({
  model: state.model,
  initParams: state.app.editingForm.initParams,
});

const mapDispatchToProps = ({
  onStartEditing: startEditing,
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
