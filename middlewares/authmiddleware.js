const authMiddleware = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("/auth/login"); // Redirect if not logged in
    }
    next(); // Continue if logged in
  };

// this is middleware
module.exports = {authMiddleware};
  
