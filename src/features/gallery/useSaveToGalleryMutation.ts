import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  saveToGallery,
  type GalleryItem,
} from "../../services/gallery/gallleryService";

export type SaveToGalleryOptions = {
  modelId: string;
  processedImageUrl: string;
  fileSizeMb: number;
  modelOptionId?: string | null;
};

export const useSaveToGalleryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<GalleryItem, Error, SaveToGalleryOptions>({
    mutationFn: (options: SaveToGalleryOptions) =>
      saveToGallery(
        options.modelId,
        options.processedImageUrl,
        options.fileSizeMb,
        options.modelOptionId
      ),
    onSuccess: () => {
      // Invalidate gallery queries to refresh the gallery
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
    onError: (error) => {
      console.error("Save to gallery error:", error);
    },
  });
};