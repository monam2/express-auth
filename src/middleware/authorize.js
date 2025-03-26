export const authorize = (policy, resource) => (req, res, next) => {
  const user = req.user;
  if (policy(user, resource)) {
    return next();
  } else {
    return res.status(402).json({ status: 402, message: "Access denied" });
  }
};
