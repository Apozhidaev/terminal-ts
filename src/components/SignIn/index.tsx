import './styles.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReturnVoid } from '../../tools/type-utils';
import { signIn } from '../../redux/app/actions';
import ProgressBar from '../ProgressBar';
import { StateType } from '../../redux/reducer';

type Props = {
  profileFetching: boolean,
  onSignIn: ReturnVoid<typeof signIn.begin>;
  errors: string[];
};

const SignIn = ({ profileFetching, onSignIn, errors = [] }: Props) => {
  const [userName, setUserName] = useState('local');
  const [password, setPassword] = useState('password');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSignIn({
      name: userName,
      password,
    });
  };

  const errorViews = errors.map((err) => (
    <div key={err} className="alert alert-dismissible alert-danger">
      {err}
    </div>
  ));
  return (
    <div>
      <h2 className="mx-3 my-2">
        <Link className="logo-header text-primary" to="/">The Terminal</Link>
      </h2>
      <div className="container mt-4 mt-lg-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="sign-in_user" className="col-sm-3 col-md-2 col-form-label">user name</label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="sign-in_user"
                placeholder="user name"
                value={userName}
                disabled
                onChange={(event) => setUserName(event.target.value.trim())}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="sign-in_password" className="col-sm-3 col-md-2 col-form-label">
              password
            </label>
            <div className="col-sm-8">
              <input
                type="password"
                className="form-control"
                id="sign-in_password"
                placeholder="password"
                value={password}
                disabled
                onChange={(event) => setPassword(event.target.value.trim())}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-3 offset-md-2 col-sm-8">
              <div className="row">
                <div className="col-4">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!userName || !password}
                  >
                    sign in
                  </button>
                </div>
                <div className="col-5">
                  <ProgressBar className="my-3" progress={profileFetching} />
                </div>
              </div>
            </div>
          </div>
        </form>
        {errorViews}
      </div>
    </div>
  );
};

const mapStateToProps = (state: StateType) => ({
  profileFetching: state.services.backup.profileFetching,
});

const mapDispatchToProps = ({
  onSignIn: signIn.begin,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
