import jwt from 'jsonwebtoken';


function verifyToken(req, res) {
    const token = req.session.token || null;
    if (token == null) return 'Access Denied';
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded.userId 
    } 
    catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default verifyToken;

