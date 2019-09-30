/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { decrypt } from '../../redux/app/decryptedContent/actions';


export default function decryptedContent(Child) {
  const DecryptedContent = ({
    slot,
    decryptedContents,
    onDecrypt,
    ...passThroughProps
  }) => {
    const [password, setPassword] = useState('');
    const { id, content } = slot || {};

    const handleDecrypt = () => {
      onDecrypt({ id, password });
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleDecrypt();
      }
    };

    const dcptContent = decryptedContents[id];

    if (content && content.encrypted) {
      if (dcptContent && dcptContent.value) {
        return (
          <Child
            {...passThroughProps}
            encrypted
            value={dcptContent.value}
          />
        );
      }
      return (
        <div className="row my-3">
          <div className="col" style={{ maxWidth: 300 }}>
            <div className="input-group">
              <input
                type="password"
                className="form-control"
                placeholder="password..."
                onChange={(event) => setPassword(event.target.value.trim())}
                onKeyPress={handleKeyPress}
              />
              <span className="input-group-btn">
                <button type="button" className="btn btn-outline-warning" onClick={handleDecrypt}>
                  decrypt
                </button>
              </span>
            </div>
            {dcptContent && dcptContent.error && (
              <div className="form-group has-danger">
                <div className="form-control-feedback">{dcptContent.error.message}</div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <Child
        {...passThroughProps}
        encrypted={false}
        value={content && content.value}
      />
    );
  };

  const mapStateToProps = (state) => ({
    decryptedContents: state.app.decryptedContent,
  });

  const mapDispatchToProps = ({
    onDecrypt: decrypt.begin,
  });

  return connect(mapStateToProps, mapDispatchToProps)(DecryptedContent);
}
