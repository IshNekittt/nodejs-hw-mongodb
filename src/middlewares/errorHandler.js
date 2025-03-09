import { HttpError } from 'http-errors';

export const errorHandler = (err, _req, res, _next) => {
  if (err.name === 'ValidationError') {
    res.status(400).json({
      status: 400,
      message: err.message,
      data: err.details,
    });
  }

  if (err instanceof HttpError) {
    const responce = {
      status: err.statusCode,
      message: err.name,
      data: err.message,
    };

    if (err.page && err.totalPages) {
      responce.page = err.page;
      responce.totalPages = err.totalPages;
    }

    res.status(err.status).json(responce);
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
