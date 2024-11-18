export default function handler(req, res) {
    const acceptEncoding = req.headers['accept-encoding'];
    res.status(200).json({ acceptEncoding });
  }