// import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, _) => {
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
