export function paginate(data: any, limit: number, page: number) {
  const dataPaginated = data.slice((page - 1) * limit, page * limit);
  return {
    data: dataPaginated,
    totalItems: dataPaginated.length,
  };
}
export type Query = {
  limit?: number;
  page?: number;
};
export type DataPaginate = {
  data: [];
  totalItems: number;
};
