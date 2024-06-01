// frontend/src/componenets/LoginFormModal/LoginFormModal.jsx
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import './LoginForm.css';

const LoginFormModal = () => {
  const dispatch = useDispatch();

  const handleDemoLogin = (e) => {
    e.preventDefault();
    dispatch(login({ credential: 'demo', password: 'demo' }));
  };

  return (
    <div className="login-form-modal">
      <h1>Log In</h1>
      <form>
        {/* Your existing form fields and submit button */}
        <button type="button" className="demo-user-button" onClick={handleDemoLogin}>
          Log In as Demo User
        </button>
      </form>
    </div>
  );
};

export default LoginFormModal;
