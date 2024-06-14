import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import User from './User';

import './Users.css';

const Users = () => {
  // Hardcoded user data
  const users = [
    { _id: '1', name: 'Andrew Karanja Njiyo', reputation: 1499 },
    { _id: '1', name: 'Richard Mbugua Mwathi', reputation: 1499 },
    { _id: '1', name: 'Tabitha Njambi Gichuru', reputation: 1499 },
    { _id: '1', name: 'Bethlydia Neema Mutuba', reputation: 1499 },
  ];

  // Sort users by reputation, descending
  const sortedUsers = [...users].sort((a, b) => b.reputation - a.reputation);

  return (
    <div className='home-container-1'>
      <LeftSidebar />
      <div className="home-container-2" style={{ marginTop: '30px' }}>
        <h1 style={{ fontWeight: "400" }}>Users</h1>
        <div className='user-list-container'>
          <table className='leaderboard-table'>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Reputation</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => (
                <User user={user} rank={index + 1} key={user._id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
