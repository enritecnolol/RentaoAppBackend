export function paginate(data: any, limit: number, page: number) {
  const dataPaginated = data.slice((page - 1) * limit, page * limit);
  return {
    data: dataPaginated,
    totalItems: data.length,
    totalPages: Math.ceil(data.length / limit),
  };
}

export type Query = {
  limit?: number;
  page?: number;
};

export type DataPaginate = {
  data: [];
  totalItems: number;
  totalPages: number;
};
