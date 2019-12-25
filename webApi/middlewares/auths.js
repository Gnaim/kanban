// libs directory stands for libraries. All the logic goes there.
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

expiresIn = '24h';

exports.validateToken = (req, res, next) => {
  const authorizationHeaader = req.headers.authorization;
  if (authorizationHeaader) {
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
    const options = {
      expiresIn: '24h',
    };
    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      result = jwt.verify(token, process.env.JWT_SECRET, options);
      // Let's pass back the decoded token to the request object
      req.decoded = result;
      // We call next to pass execution to the subsequent middleware
      next();
    } catch (err) {
      // Throw an error just in case anything goes wrong with verification
      res.status(401).send({message:'Authentication occured on token value',
                            error: 608});
    }
  } else {
    result = {
      message: 'Authentication error. Token required.',
      error: 608,
    };
    res.status(401).send(result);
  }
};

exports.createJWToken = (payLoad, expiresIn) => {
  if (typeof details !== 'object') {
    details = {};
  }

  const token = jwt.sign({
    data: payLoad,
  }, process.env.JWT_SECRET, {
    expiresIn,
    algorithm: 'HS256',
  });

  return token;
};
