class ResponseHandler {
  constructor(res) {
    this.res = res;
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
        message: `Client side error! - ${message}`,
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

  error500(error) {
    this.res.status(500).json({
      status: {
        code: 500,
        message: `Server error! - ${error}`,
      },
    });
  }
}

export default ResponseHandler;
