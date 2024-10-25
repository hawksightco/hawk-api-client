export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}
