import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReturnVoid } from '../../tools/type-utils';
import { search, showMore } from '../../redux/app/root/actions';
import { createSlot } from '../../redux/app/actions';
import Layout from '../Layout';
import StatePanel from '../StatePanel';
import ProgressBar from '../ProgressBar';
import { shortDate } from '../../tools/dateFormatter';
import { SateType } from '../../redux/reducer';
import { RootStateType } from '../../redux/app/root/reducer';

type Props = {
  root: RootStateType,
  storageFetching: true,
  onSearch: ReturnVoid<typeof search>;
  onShowMore: ReturnVoid<typeof showMore>;
  onCreateSlot: ReturnVoid<typeof createSlot>;
};

const Root = ({
  root,
  storageFetching,
  onSearch,
  onShowMore,
  onCreateSlot,
}: Props) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const handleClear = () => {
    onSearch('');
  };

  const handleCreate = () => {
    onCreateSlot();
  };

  const { searchQuery, maxItem, slots: rootSlots } = root;
  const displaySlots = rootSlots.slice(0, maxItem);
  const hasMore = rootSlots.length > displaySlots.length;
  const slots = displaySlots.map((slot) => (
    <Link
      key={slot.id}
      to={`/slot/${slot.id}`}
      className="list-group-item list-group-item-action flex-column align-items-start"
    >
      <div className="d-flex w-100 justify-content-between">
        {slot.content
          ? <h5 className="mb-1">{slot.summary}</h5>
          : <div>{slot.summary}</div>}
        <small>{shortDate.format(slot.creation)}</small>
      </div>
      {slot.content && (
        <pre className="mb-1">
          {slot.content.encrypted
            ? <em className="text-warning">information is encrypted</em>
            : slot.content.value}

        </pre>
      )}
    </Link>
  ));

  return (
    <Layout>
      <div className="row">
        <div className="col">
          <div className="btn-toolbar justify-content-between" role="toolbar">
            <div className="btn-group my-2" role="group" />
            <div className="btn-group my-2" role="group">
              <button type="button" className="btn btn-outline-success" onClick={handleCreate}>
                new
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-2">
          <StatePanel />
        </div>
        <div className="col-md-10">
          <div className="row">
            <div className="col">
              <div className="input-group my-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="search..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
                {searchQuery && (
                  <span className="input-group-btn">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleClear}
                    >
                      &times;
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <ProgressBar progress={storageFetching && !slots.length && !searchQuery} />
              <div className="list-group">
                {!slots.length && searchQuery && <p className="p-2">slot not found</p>}
                {slots}
              </div>
              {hasMore
                && (
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-outline-info my-2"
                      onClick={onShowMore}
                    >
                      more...
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: SateType) => ({
  root: state.app.root,
  storageFetching: state.services.backup.storageFetching,
});

const mapDispatchToProps = ({
  onSearch: search,
  onCreateSlot: createSlot,
  onShowMore: showMore,
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
