const jwt = require('jsonwebtoken');

function parseJwt(token) {
  const tokenSplit = token.split(' ');
  if (tokenSplit.length == 2) {
    token = tokenSplit[1];
  }
  const parsedToken = jwt.verify(
    token,
    'yMPUxOKfFA8mvq5jGOHS78oeajNpPibDKeEw2G5BWWg='
  );
  return parsedToken;
}

function encodeJwt(values) {
  const token = jwt.sign(
    values,
    `yMPUxOKfFA8mvq5jGOHS78oeajNpPibDKeEw2G5BWWg=`,
    {
      expiresIn: '1d'
    }
  );

  return token;
}

module.exports = {
  parseJwt,
  encodeJwt
};
