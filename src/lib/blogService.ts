import { apiClient } from './apiClient';
import type { BlogDetail, BlogListResponse } from '../types';

// Both endpoints are public (no auth) and only ever return published posts.
export const blogService = {
  list: (page = 1, limit = 9, signal?: AbortSignal) =>
    apiClient.get<BlogListResponse>('/blogs', { page, limit }, { signal }),

  getBySlug: (slug: string, signal?: AbortSignal) =>
    apiClient.get<BlogDetail>(`/blogs/${encodeURIComponent(slug)}`, undefined, { signal }),
};
