import { body } from 'express-validator';
export const loginValidator = [
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
];
