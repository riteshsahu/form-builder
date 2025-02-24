import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "@/components/ui";
import { FormSchemaWithResponses } from "@/lib/types";
import { Button, Card, HStack, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { LuTrash } from "react-icons/lu";
import { SlOptionsVertical } from "react-icons/sl";
import { Link, useNavigate } from "react-router";

interface FormInfoCardProps extends FormSchemaWithResponses {
  onDelete: (id: string) => Promise<void>;
}

export const FormInfoCard = (props: FormInfoCardProps) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const { id, title, questions = [], responses = [], onDelete } = props;

  const onDeleteClick = async () => {
    setIsDeleting(true);
    await onDelete(id);
    setIsDeleting(false);
  };

  return (
    <Card.Root overflow="hidden">
      <Card.Body gap="2">
        <HStack justifyContent={"space-between"}>
          <Card.Title>{title}</Card.Title>
          <MenuRoot>
            <MenuTrigger asChild>
              <IconButton variant="ghost" size="sm">
                <SlOptionsVertical />
              </IconButton>
            </MenuTrigger>
            <MenuContent>
              <MenuItem onClick={() => navigate(`/build/${id}`)} value="edit">
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => navigate(`/forms/${id}/responses`)}
                value="view-responses"
              >
                View Responses
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        </HStack>
        <Card.Description>Questions: {questions.length}</Card.Description>
        <Card.Description visibility={responses.length ? "visible" : "hidden"}>
          <Link to={`/responses/${id}`}>Responses: {responses.length}</Link>
        </Card.Description>
      </Card.Body>
      <Card.Footer gap="2" justifyContent="flex-end">
        {questions.length > 0 ? (
          <Button variant="solid" asChild>
            <Link to={`/forms/${id}`}>View</Link>
          </Button>
        ) : (
          <Button variant="solid" asChild>
            <Link to={`/build/${id}`}>Continue Editing</Link>
          </Button>
        )}
        <IconButton
          loading={isDeleting}
          onClick={onDeleteClick}
          aria-label="Delete Form"
          colorPalette="red"
        >
          <LuTrash />
        </IconButton>
      </Card.Footer>
    </Card.Root>
  );
};
