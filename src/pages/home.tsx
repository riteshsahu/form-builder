import { FormInfoCard } from "@/components/form-info-card";
import { FormService } from "@/lib/form-service";
import { FormSchema } from "@/lib/types";
import { generateUUID } from "@/utils";
import { Box, Button, Grid, Heading, IconButton, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { LuTrash } from "react-icons/lu";
import { Link, useNavigate } from "react-router";

export function HomePage() {
  const [forms, setForms] = useState<FormSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setIsDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      const forms = await FormService.getAllForms();
      setForms(forms);
      setLoading(false);
    };
    fetchForms();
  }, []);

  const onDelete = async (id: string) => {
    setIsDeletingId(id);
    await FormService.deleteForm(id);
    setForms((forms) => forms.filter((form) => form.id !== id));
    setIsDeletingId(null);
  };

  const onCreateForm = async () => {
    const id = generateUUID();
    navigate("/build/" + id);
  };

  if (loading) {
    return (
      <VStack h="100vh" justifyContent="center" alignItems="center" gap={10}>
        <Heading textAlign="center" fontSize="3xl">
          Loading...
        </Heading>
      </VStack>
    );
  }

  return (
    <Box p={5}>
      {forms.length === 0 ? (
        <VStack h="100vh" justifyContent="center" alignItems="center" gap={10}>
          <Heading textAlign="center" fontSize="3xl">
            Build Forms, Simplify Workflows, Empower Users!
          </Heading>
          <Button onClick={onCreateForm} size="xl">
            Get Started
          </Button>
        </VStack>
      ) : (
        <React.Fragment>
          <Grid gap={8} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
            {forms.map((form) => (
              <FormInfoCard
                key={form.id}
                {...form}
                renderActions={() => (
                  <React.Fragment>
                    <Button variant="solid" asChild>
                      <Link to={`/forms/${form.id}`}>View</Link>
                    </Button>
                    <IconButton
                      loading={deletingId === form.id}
                      onClick={() => onDelete(form.id)}
                      aria-label="Delete Form"
                      colorPalette="red"
                    >
                      <LuTrash />
                    </IconButton>
                  </React.Fragment>
                )}
              />
            ))}
          </Grid>
          <IconButton size="2xl" pos="fixed" zIndex={10} right="5" bottom="5" onClick={onCreateForm} rounded="full">
            <BiPlus />
          </IconButton>
        </React.Fragment>
      )}
    </Box>
  );
}
