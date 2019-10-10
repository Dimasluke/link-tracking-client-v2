const initialConfig = {
  header: 'Login',

  // eslint-disable-next-line no-useless-escape
  expression: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/),

  login: function(inputs) {
    localStorage.setItem('accessToken', inputs.accessToken);
    localStorage.setItem('accessTokenExpiresAt', inputs.accessTokenExpiresAt);
    localStorage.setItem('refreshToken', inputs.refreshToken);
    localStorage.setItem('refreshTokenExpiresAt', inputs.refreshTokenExpiresAt);
    localStorage.setItem('client', inputs.client.id);
    localStorage.setItem('username', inputs.user.username);
    window.location.href = `${inputs.baseUrl}/`;
  },

  styles: {
    input: {
      height: '40px',
      padding: '15px',
      border: '1px solid #ccc',
      borderRadius: '3px',
      marginTop: '10px',
      marginBottom: '10px',
      marginRight: '15px',
      boxSizing: 'border-box',
      color: '#2C3E50',
      fontSize: '13px'
    },

    button: {
      width: '100px',
      background: '#27AE60',
      fontWeight: 'bold',
      color: 'white',
      border: '0 none',
      borderRadius: '1px',
      cursor: 'point',
      padding: '10px 5px',
      margin: '20px auto'
    },

    header: {
      margin: '10px auto',
      textAlign: 'center'
    },

    message: {
      fontWeight: 'normal',
      fontSize: '13px',
      color: '#666',
      marginTop: '20px',
      marginBottom: '15px',
      textAlign: 'center'
    },

    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      margin: '10px auto',
      width: '400px',
      height: '500px'
    }
  }
};

export default initialConfig;
