import React from 'react';
import { connect } from 'react-redux';
import decryptedContent from '../wrappers/decryptedContent';
import { setPassword, setEncrypted, setValue } from '../../redux/app/editingForm/content/actions';

const Content = ({
  contentForm,
  onSetPassword,
  onSetEncrypted,
  onSetValue,
}) => {
  const { value, encrypted, password } = contentForm;
  return (
    <>
      <div className="form-group">
        <label htmlFor="edit-content-id" className="lead text-primary">
          content
        </label>
        <textarea
          className="form-control"
          id="edit-content-id"
          name="value"
          rows="10"
          placeholder="content..."
          value={value}
          onChange={(event) => onSetValue(event.target.value)}
        />
      </div>
      <div className="form-inline">
        <div className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
          <input
            type="checkbox"
            className="custom-control-input"
            id="edit-form_content_encrypted-checkbox"
            checked={encrypted}
            onChange={() => onSetEncrypted(!encrypted)}
          />
          <label className="custom-control-label" htmlFor="edit-form_content_encrypted-checkbox">
            encrypted
          </label>
        </div>
        <input
          type="password"
          name="password"
          className="form-control mb-2 mr-sm-2 mb-sm-0"
          placeholder="new password..."
          value={password}
          onChange={(event) => onSetPassword(event.target.value)}
          disabled={!contentForm.encrypted}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  contentForm: state.app.editingForm.content,
});

const mapDispatchToProps = ({
  onSetValue: setValue,
  onSetPassword: setPassword,
  onSetEncrypted: setEncrypted,
});

export default decryptedContent(connect(mapStateToProps, mapDispatchToProps)(Content));
