import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secretkey'; // Store this in .env

export const signToken = (payload: object) => {
  console.log("Payload details:", JSON.stringify(payload, null, 2)); // Logs payload in a readable format
  return jwt.sign(payload, SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET) as { username: string,  balance:string,number:string };
  } catch {
    return null;
  }
};
