import { Loader as LoaderIcon } from "lucide-react";

export const Loader = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <LoaderIcon className="w-10 h-10 text-accent animate-spin" />
      </div>
    </div>
  );
};
