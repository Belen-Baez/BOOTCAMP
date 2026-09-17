const login = (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@salita.com' && password === '1234') {
    return res.status(200).json({
      ok: true,
      token: 'token_falso_123'
    });
  }

  return res.status(401).json({
    ok: false,
    message: 'Credenciales inválidas'
  });
};

module.exports = {
  login
};