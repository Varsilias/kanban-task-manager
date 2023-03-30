import React, { PropsWithChildren } from "react";
import { FaSpinner } from "react-icons/fa";

interface ISubmitButtonProps {
  submitting?: boolean;
}

const SubmitButton: React.FC<PropsWithChildren<ISubmitButtonProps>> = ({
  children,
  submitting,
}) => {
  return (
    <button className="flex w-full justify-center cursor-pointer bg-purple-primary text-white text-bold text-sm px-4 py-2 rounded-[20px] hover:bg-purple-hover">
      {submitting ? (
        <FaSpinner className="spinner" size={30} />
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default SubmitButton;
