// import { promisify } from 'util';

// import authConfig from '../../config/auth';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Empty token' });
    }

    // const [, token] = authHeader.split(' ');

    try {
        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
