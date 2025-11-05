import { useQuery } from "@tanstack/react-query";
import { getAllModels } from "../../services/model/modelService";

export const useGetAllModelsQuery = () => {
  return useQuery({
    queryKey: ["models"],
    queryFn: getAllModels,
    staleTime: 1000 * 60 * 10, // 10 minutes - models don't change often
    retry: 1,
  });
};