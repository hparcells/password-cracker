hsimp({
  outputTime: function (time, input) {
      if(time === false) {
        document.getElementById('password-strength').innerText = 'Start typing a password.';
      }else {
        document.getElementById('password-strength').innerHTML = `
          <a href='https://howsecureismypassword.net/' target='_blank' rel='noreferrer noopener'>https://howsecureismypassword.net/</a> thinks your password can be cracked in ${time}
        `;
      }
  }
}, document.getElementById('password'));
