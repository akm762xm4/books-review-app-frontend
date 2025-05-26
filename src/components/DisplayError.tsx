import toast from "react-hot-toast";

export const DisplayError = ({ error }: { error: any }) => {
  toast.error(error.error);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center text-2xl text-red-600">{error.error}</div>
    </div>
  );
};
