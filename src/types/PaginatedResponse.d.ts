export declare interface PaginatedResponse<D> {
  data: D[];
  total: number;
  limit: number;
  skip: number;
}
