import {
  keepPreviousData,
  useInfiniteQuery,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Product } from "../types/product";
import {
  getProduct,
  getProducts,
  getProjects,
  getTodo,
  getTodosIds,
} from "./api";

export const useTodosIds = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodosIds,
    refetchOnWindowFocus: false,
  });
};

export const useTodos = (ids: (number | undefined)[] | undefined) => {
  console.log("ids : ", ids);
  return useQueries({
    queries: (ids ?? [])?.map((id) => {
      return {
        queryKey: ["todo", { id }],
        queryFn: () => getTodo(id!),
        gcTime: 1000 * 3,
        staleTime: 1000 * 3,
      };
    }),
  });
};

export const useProjects = (page: number) => {
  return useQuery({
    queryKey: ["projects", { page }],
    queryFn: () => getProjects(page),
    placeholderData: keepPreviousData,
    // gcTime: 0,
    // staleTime: 0,
  });
};

export const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
};

export const useProduct = (id: number | null) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProduct(id!),
    enabled: !!id,
    placeholderData: () => {
      console.log(
        queryClient.getQueryData(["products"]) as {
          pages: Product[] | undefined;
        }
      );
      const cachedProducts = (
        queryClient.getQueryData(["products"]) as {
          pages: Product[] | undefined;
        }
      )?.pages?.flat();

      if (cachedProducts) {
        return cachedProducts.find((item) => item.id === id);
      }
    },
  });
};
