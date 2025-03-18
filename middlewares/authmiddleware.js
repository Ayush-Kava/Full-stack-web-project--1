const authMiddleware = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("/auth/login"); // Redirect if not logged in
    }
    next(); // Continue if logged in
  };
  
module.exports = {authMiddleware};
  