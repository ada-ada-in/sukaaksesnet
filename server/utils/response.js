import { logger } from "../configs/logger.js";
import { deleteCookie } from "./auth.js";

class ResponseHandler {
  constructor(res) {
    this.res = res;
  }

  cookieSuccess200(data) {
    this.res.status(200).cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
  }

  cookieClear() {
    this.res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      path: '/',
    });
  }

  success200(data) {
    this.res.status(200).json({
      status: {
        code: 200,
        message: "success get data",
      },
      data,
    });
  }

  successReset(message, link) {
    this.res.status(200).json({
      status: {
        code: 200,
        message: `${message}`,
      },
      resetLink: link
    });
  }

  successLogin(data, token, refreshToken) {
    this.res.status(200).json({
      status: {
        code: 200,
        message: "Login successful",
      },
      data,
      token,
      refreshToken
    });
  }

  successDelete(message) {
    this.res.status(200).json({
      status: {
        code: 200,
        message: `${message}`,
      },
    });
  }

  successLogout(message) {
    deleteCookie(this.res);
    this.res.status(200).json({
      status: {
        code: 200,
        message: `${message}`,
      },
    });
  }

  success201(data) {
    this.res.status(201).json({
      status: {
        code: 201,
        message: "Created Data Sucessfully",
      },
      data,
    });
  }

  error400(message) {
    this.res.status(400).json({
      status: {
        code: 400,
        message: `${message}`,
      },
      data: null,
    });
  }

  error401() {
    this.res.status(401).json({
      status: {
        code: 401,
        message: "Unauthorized Access!",
      },
      data: null,
    });
  }

  error403(message) {
    this.res.status(403).json({
      status: {
        code: 403,
        message: `Forbidden - ${message}`,
      },
      data: null,
    });
  }

  error404() {
    this.res.status(404).json({
      status: {
        code: 404,
        message: "URL not found!",
      },
      data: null,
    });
  }

  error405() {
    this.res.status(405).json({
      status: {
        code: 405,
        message: "Request method not allowed!",
      },
      data: null,
    });
  }

  error429(message) {
    this.res.status(429).json({
      status: {
        code: 429,
        message: `${message} - try again later`,
      },
      data: null,
    });
  }

  error500(message, stack) {
    this.res.status(500).json({
      status: {
        code: 500,
        message: `Server error! - ${message}`,
        stack: stack || null,
      },
    }); 
    logger.error(`Server error! - ${message}, Stack: ${stack}`);  
  }
}

export default ResponseHandler;
