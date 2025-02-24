import { FormInfoCard } from "@/components/form-info-card";
import { Loader } from "@/components/loader";
import { FormService } from "@/lib/form-service";
import { FormSchemaWithResponses } from "@/lib/types";
import { generateUUID } from "@/utils";
import {
  AbsoluteCenter,
  Box,
  Button,
  Grid,
  Heading,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router";

export function HomePage() {
  const [forms, setForms] = useState<FormSchemaWithResponses[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      const forms = await FormService.getAllFormsWithResponses();
      setForms(forms);
      setLoading(false);
    };
    fetchForms();
  }, []);

  const onDelete = async (id: string) => {
    await FormService.deleteForm(id);
    setForms((forms) => forms.filter((form) => form.id !== id));
  };

  const onCreateForm = async () => {
    const id = generateUUID();
    navigate("/build/" + id);
  };

  if (loading) return <Loader />;

  return (
    <Box p={5}>
      {forms.length === 0 ? (
        <AbsoluteCenter w={"full"}>
          <VStack gap={10}>
            <Heading textAlign="center" fontSize="3xl" lineHeight={"moderate"}>
              Build Forms, Simplify Workflows, Empower Users!
            </Heading>
            <Button onClick={onCreateForm} size="xl">
              Get Started
            </Button>
          </VStack>
        </AbsoluteCenter>
      ) : (
        <React.Fragment>
          <Grid
            gap={8}
            templateColumns={{
              base: "1fr",
              md: "repeat(auto-fill, minmax(300px, 1fr))",
            }}
          >
            {forms.map((form) => (
              <FormInfoCard
                key={form.id}
                {...form}
                onDelete={() => onDelete(form.id)}
              />
            ))}
          </Grid>
          <IconButton
            size="2xl"
            pos="fixed"
            zIndex={10}
            right="5"
            bottom="5"
            onClick={onCreateForm}
            rounded="full"
          >
            <BiPlus />
          </IconButton>
        </React.Fragment>
      )}
    </Box>
  );
}
