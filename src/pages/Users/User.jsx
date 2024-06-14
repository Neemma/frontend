import { Link } from 'react-router-dom';
import './Users.css';

const User = ({ user, rank }) => {
  return (
    <tr className='user-row'>
      <td>{rank}</td>
      <td>
        <Link to={`/Users/${user._id}`} className='user-profile-link'>
          {user.name}
        </Link>
      </td>
      <td>{user.reputation}</td>
    </tr>
  );
}

export default User;
