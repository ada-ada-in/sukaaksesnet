import ResponseHandler from "../utils/response";

export const roleCheck = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return new ResponseHandler(res).error403("Access denied");
    }
    next();
  };
};
