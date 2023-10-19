import React from 'react';

const Notification = ({notification}) => {

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      padding: '16px',
      marginBottom: '16px',
      borderRadius: '8px'
    }}>
      <img src={notification.icon} alt="Notification Icon" style={{ width: '32px', marginRight: '16px' }} />
      <div>
        <h3 style={{ margin: '0', fontSize: '1.2rem',fontWeight: '500' }}>{notification.title}</h3>
        <p style={{ margin: '0', fontSize: '1rem' }}>{notification.message}</p>
      </div>
    </div>
  );
};

export default Notification;