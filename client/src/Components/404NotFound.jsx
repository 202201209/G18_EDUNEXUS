import React from 'react';

const NotFound = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      color: '#333',
    },
    heading: {
      fontSize: '72px',
      margin: '0',
    },
    message: {
      fontSize: '24px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.message}>Page Not Found</p>
    </div>
  );
};

export default NotFound;
