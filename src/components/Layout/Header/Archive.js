import React from 'react';
import { connect } from 'react-redux';
import { setArchive } from '../../../redux/app/actions';


const Archive = ({ value, onChange }) => {
  const handleInputChange = (event) => {
    event.preventDefault();
    onChange(!value);
  };

  return (
    <a
      href="/"
      style={{ cursor: 'pointer' }}
      className="nav-item nav-link"
      onClick={handleInputChange}
    >
      {value ? <span className="text-warning">CORE</span> : <span>ARCHIVE</span>}
    </a>
  );
};

const mapStateToProps = (state) => ({
  value: state.app.archive,
});

const mapDispatchToProps = ({
  onChange: setArchive,
});

export default connect(mapStateToProps, mapDispatchToProps)(Archive);
