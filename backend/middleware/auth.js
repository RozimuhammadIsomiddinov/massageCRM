require("dotenv").config();
const jwt = require("jsonwebtoken");
const { selectByID_admin } = require("../controllers/admin/model");
const { selectByIDOperator } = require("../controllers/operators/model");
const {
  selectByID: selectByIDSuper,
} = require("../controllers/super_admin/model");

const auth = (requiredRole) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "please send a token" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user;
      switch (decoded.role) {
        case "admin":
          user = await selectByID_admin(decoded.id);
          break;
        case "operator":
          user = await selectByIDOperator(decoded.id);
          break;
        case "super_admin":
          user = await selectByIDSuper(decoded.id);
          break;
        default:
          return res.status(401).json({ error: "wrong user type" });
      }

      if (user.length == 0) {
        return res.status(401).json({ error: "user not found" });
      }
      if (requiredRole && user[0].role !== requiredRole) {
        return res.status(403).json({
          error: `you must be at ${requiredRole}-role `,
          yourRole: user.role,
        });
      }

      req.user = user;

      next();
    } catch (e) {
      res.status(401).json({
        error: "Invalid token",
        details: e.message,
      });
    }
  };
};

module.exports = auth;
