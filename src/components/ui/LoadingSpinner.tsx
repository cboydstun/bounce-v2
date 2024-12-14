import { ClipLoader } from "react-spinners";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export const LoadingSpinner = ({
  size = 50,
  color = "#3B82F6",
}: LoadingSpinnerProps) => {
  return (
    <div
      className="flex justify-center items-center p-4"
      data-testid="loading-spinner"
    >
      <ClipLoader color={color} size={size} />
    </div>
  );
};
