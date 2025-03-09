import createHttpError from 'http-errors';

export const calculatePaginationData = (count, page, perPage) => {
  const totalPages = Math.ceil(count / perPage);
  if (page > totalPages)
    throw createHttpError(400, 'Conflicting pagination parameters', {
      page,
      totalPages,
    });

  const hasNextPage = Boolean(totalPages - page);
  const hasPreviousPage = page !== 1;

  return {
    page,
    perPage,
    totalPages,
    totalItems: count,
    hasNextPage,
    hasPreviousPage,
  };
};
