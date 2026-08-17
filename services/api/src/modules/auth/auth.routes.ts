import { Router } from 'express';
import { AuthService } from './auth.service.js';
import { loginSchema, registerSchema } from './auth.validator.js';
import { validateBody } from '../../middleware/validate.js';

const router = Router();
const authService = new AuthService();

router.post('/register', validateBody(registerSchema), async (req, res) => {
  try {
    const result = await authService.register({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      role: req.body.role,
    });

    res.status(201).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Registration failed';
    res.status(400).json({ error: message });
  }
});

router.post('/login', validateBody(loginSchema), async (req, res) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    res.status(200).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed';
    res.status(401).json({ error: message });
  }
});

router.post('/refresh', (req, res) => {
  try {
    const result = authService.refresh(req.body.refreshToken);
    res.status(200).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Token refresh failed';
    res.status(401).json({ error: message });
  }
});

export default router;
