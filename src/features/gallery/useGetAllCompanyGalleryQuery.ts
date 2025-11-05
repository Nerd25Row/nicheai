import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/auth/authStore";
import {
  getAllCompanyGallery,
  type GalleryItem,
} from "../../services/gallery/gallleryService";

export const useGetAllCompanyGalleryQuery = () => {
  const { user, status } = useAuthStore();

  return useQuery<GalleryItem[], Error>({
    queryKey: ["gallery"],
    queryFn: getAllCompanyGallery,
    enabled: status === "authenticated" && !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};