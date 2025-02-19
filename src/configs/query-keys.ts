export const urlKeys = {
  all: ["url"] as const,
  lists: () => [...urlKeys.all, "list"] as const,
  list: (filters: string) => [...urlKeys.lists(), { filters }] as const,
  details: () => [...urlKeys.all, "detail"] as const,
  detail: (id: string) => [...urlKeys.details(), id] as const,
};
