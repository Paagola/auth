import { Router } from 'express';
import { login } from '../auth/auth.service.js';

const router = Router();

// GET / → muestra el formulario de login
router.get('/', (_req, res) => {
  res.render('login', { error: null });
});

// POST /login → recibe el formulario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).render('login', { error: 'Rellena email y contraseña' });
  }

  try {
    const { user } = await login(email, password);
    res.render('perfil', { user });
  } catch (error: any) {
    res.status(401).render('login', { error: error.message });
  }
});

export default router;
