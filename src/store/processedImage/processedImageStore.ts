import { create } from "zustand";
import type { ProcessImageResponse } from "../../services/model/modelService";

export type ProcessedImageResult = {
  response: ProcessImageResponse;
  originalFile: File | null;
  originalFileName: string;
  modelSlug?: string;
  modelId?: string;
  modelOptionId?: string | null;
  modelName?: string |null;
  processedAt: Date;
};

type ProcessedImageState = {
  result: ProcessedImageResult | null;
  setResult: (result: ProcessedImageResult) => void;
  clearResult: () => void;
};

export const useProcessedImageStore = create<ProcessedImageState>((set) => ({
  result: null,
  setResult: (result) => set({ result }),
  clearResult: () => set({ result: null }),
}));


