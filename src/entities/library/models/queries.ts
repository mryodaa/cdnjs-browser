import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/shared/api/client";

import type { ILibrariesResponse, ILibrary } from "./types";

export const useLibraries = (
  search = "",
  searchFields: string[] = ["name"]
) => {
  const fieldsKey = searchFields.sort().join(",");

  return useQuery<ILibrariesResponse>({
    queryKey: ["libraries", search, fieldsKey],
    queryFn: async () => {
      const { data } = await apiClient.get<ILibrariesResponse>("/libraries", {
        params: {
          fields: "name,version,description,keywords",
          search: search || undefined,
          search_fields: search ? fieldsKey : undefined,
        },
      });
      return data;
    },
  });
};

export function useLibraryDetails(name: string, enabled: boolean) {
  return useQuery<ILibrary>({
    queryKey: ["library", name],
    queryFn: async () => {
      const { data } = await apiClient.get<ILibrary>(`/libraries/${name}`);
      return data;
    },
    enabled,
    staleTime: 60 * 60 * 1000,
  });
}
