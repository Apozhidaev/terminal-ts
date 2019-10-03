import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ReturnVoid } from "../../tools/type-utils";
import { createSlot } from "../../redux/app/actions";
import ActionPanel from "./ActionPanel";
import Content from "./Content";
import StatePanel from "../StatePanel";
import Layout from "../Layout";
import { longDate } from "../../tools/dateFormatter";
import { StateType } from "../../redux/reducer";
import { ModelStateType } from "../../redux/model/reducer";

type Props = {
  match: { params: { id: string } };
  archive: boolean;
  model: ModelStateType;
  onCreateSlot: ReturnVoid<typeof createSlot>;
};

const Slot = ({
  match,
  archive,
  model,
  onCreateSlot,
}: Props) => {
  const id = Number(match.params.id);
  const slot = model.slots ? model.slots[id] : undefined;

  if (!slot) {
    return (
      <Layout>Page not found</Layout>
    );
  }

  const {
    parents: { [id]: parents = [] },
    children: { [id]: children = [] },
  } = model;

  const handleCreate = () => {
    onCreateSlot(id);
  };

  const parentList = parents
    .filter((x) => !!x.archive === archive)
    .map((parent) => (
      <li key={parent.id} className="nav-item">
        <Link className="nav-link" to={`/slot/${parent.id}`}>
          {parent.summary}
        </Link>
      </li>
    ));

  const childList = children
    .filter((x) => !!x.archive === archive)
    .map((child) => (
      <Link
        key={child.id}
        className="list-group-item list-group-item-action"
        to={`/slot/${child.id}`}
      >
        {child.summary}
      </Link>
    ));

  const resources = slot.resources
    && slot.resources
      .map((res) => (
        <li key={res.url}>
          <a href={res.url} target="_blank" rel="noopener noreferrer">
            {res.description || res.url}
          </a>
        </li>
      ));
  return (
    <Layout>
      <>
        <ActionPanel id={id} archive={slot.archive} />
        <div className="row mb-3">
          <div className="col-md-2">
            <StatePanel />
            <ul className="nav flex-column mt-1">
              {parentList}
            </ul>
          </div>
          <div className="col-md-10">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-10">
                    <h4 className="card-title">{slot.summary}</h4>
                  </div>
                  <div className="col-2">
                    <div className="float-right text-muted">{longDate.format(slot.creation)}</div>
                  </div>
                </div>
                <Content slot={slot} />
                <ul className="list-unstyled">
                  {resources}
                </ul>
              </div>
              <div className="card-body pt-0">
                <div className="btn-toolbar justify-content-between" role="toolbar">
                  <div className="btn-group" role="group" />
                  <div className="btn-group" role="group">
                    <button type="button" className="btn btn-outline-success" onClick={handleCreate}>
                      new
                    </button>
                  </div>
                </div>
              </div>
              <div className="list-group list-group-flush">
                {childList}
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

const mapStateToProps = (state: StateType) => ({
  archive: state.app.archive,
  model: state.model,
});

const mapDispatchToProps = ({
  onCreateSlot: createSlot,
});

export default connect(mapStateToProps, mapDispatchToProps)(Slot);
