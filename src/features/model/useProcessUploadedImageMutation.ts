import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  processUploadedImage,
  type ProcessImageOptions,
  type ProcessImageResponse,
} from "../../services/model/modelService";
import { useProcessedImageStore } from "../../store/processedImage/processedImageStore";

export type ProcessImageMutationOptions = ProcessImageOptions & {
  // Additional context for setResult
  originalFile?: File | null;
  originalFileName?: string;
  modelName?: string | null;
  // Optional callbacks
  onSuccess?: (response: ProcessImageResponse) => void;
  onError?: (error: Error) => void;
};

export const useProcessUploadedImageMutation = () => {
  const queryClient = useQueryClient();
  const { setResult } = useProcessedImageStore();

  return useMutation<ProcessImageResponse, Error, ProcessImageMutationOptions>({
    mutationFn: (options: ProcessImageMutationOptions) => {
      const {
        originalFile,
        originalFileName,
        modelName,
        onSuccess,
        onError,
        ...processOptions
      } = options;
      return processUploadedImage(processOptions);
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });

      if (
        variables.originalFile !== undefined ||
        variables.modelSlug !== undefined
      ) {
        setResult({
          response,
          originalFile: variables.originalFile ?? null,
          originalFileName: variables.originalFileName ?? "",
          modelSlug: variables.modelSlug,
          modelId: variables.modelId,
          modelOptionId: variables.modelOptionId,
          modelName: variables.modelName,
          processedAt: new Date(),
        });
      }

      // Call optional onSuccess callback
      if (variables.onSuccess) {
        variables.onSuccess(response);
      }
    },
    onError: (error, variables) => {
      console.error("Image processing error:", error);

      // Call optional onError callback
      if (variables.onError) {
        variables.onError(error);
      }
    },
  });
};
