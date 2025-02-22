import { Button, ButtonProps } from "@chakra-ui/react";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router";

export const BackButton = (props: ButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(-1)} variant="ghost" {...props}>
      <RiArrowLeftLine /> Back
    </Button>
  );
};
