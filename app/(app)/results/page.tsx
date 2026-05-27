import { ResultsGallery } from "@/features/generate/results-gallery";
import { Suspense } from "react";

export default function ResultsPage() {
  return (
    <Suspense>
      <ResultsGallery />
    </Suspense>
  );
}
