import React from 'react';
import { connect } from 'react-redux';
import { ReturnVoid } from '../../tools/type-utils';
import { search, link, unlink } from '../../redux/app/editingForm/parent/actions';
import { SateType } from '../../redux/reducer';
import { ParentStateType } from '../../redux/app/editingForm/parent/reducer';

type Props = {
  parentForm: ParentStateType,
  onSearch: ReturnVoid<typeof search>;
  onLink: ReturnVoid<typeof link.begin>;
  onUnlink: ReturnVoid<typeof unlink.begin>;
};

const Parents = ({
  parentForm,
  onSearch,
  onLink,
  onUnlink,
}: Props) => {
  const { searchQuery, values, candidates } = parentForm;

  const handleLink = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    onLink(id);
  };

  const hendleUnlink = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    onUnlink(id);
  };

  const searchedParents = candidates.map((slot) => (
    <li key={slot.id} className="list-group-item justify-content-between">
      {slot.summary}
      {' '}
      <a href="/" onClick={(e) => handleLink(slot.id, e)}>link</a>
    </li>
  ));
  const parents = values.map((slot) => (
    <li key={slot.id} className="list-group-item justify-content-between bg-faded">
      {slot.summary}
      {' '}
      <a href="/" onClick={(e) => hendleUnlink(slot.id, e)}>unlink</a>
    </li>
  ));
  return (
    <>
      <p className="lead text-primary">parents</p>
      <div className="row">
        <div className="col">
          <ul className="list-group">
            {parents}
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="input-group my-4">
            <input
              type="text"
              className="form-control"
              placeholder="search..."
              value={searchQuery}
              onChange={(event) => onSearch(event.target.value)}
            />
            {searchQuery && (
              <span className="input-group-btn">
                <button type="button" className="btn btn-secondary" onClick={() => onSearch('')}>
                  &times;
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ul className="list-group">
            {!searchedParents.length
              && searchQuery
              && <li className="list-group-item">parent not found</li>}
            {searchedParents}
          </ul>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: SateType) => ({
  parentForm: state.app.editingForm.parent,
});

const mapDispatchToProps = ({
  onSearch: search,
  onLink: link.begin,
  onUnlink: unlink.begin,
});

export default connect(mapStateToProps, mapDispatchToProps)(Parents);
