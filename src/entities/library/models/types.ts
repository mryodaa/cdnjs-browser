export interface ILibrary {
  name: string;
  version: string;
  description?: string;
  latest?: string;
  keywords?: string[];
  license?: string;
  homepage?: string;
  repository?: { type?: string; url?: string };
  filename?: string;
  author?: { name?: string; email?: string; url?: string };
  versions?: string[];
  sri?: string;
  assets?: {
    version: string;
    files: string[];
  }[];
}

export interface ILibrariesResponse {
  results: ILibrary[];
  total: number;
}
