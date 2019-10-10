module.exports = {
  session: async function(req, res) {
    res.status(200).json(req.session.token);
  },

  createSession: async function(req, res) {
    if (!req.body.token.accessToken) {
      res.status(500).json({ message: 'An errord occurred in createSession.' });
    }

    req.session.token = req.body.token;
    res.status(200).json(req.session.token);
  },

  destroySession: async function(req, res) {
    req.session.destroy();
    res.status(200).end();
  }
};
