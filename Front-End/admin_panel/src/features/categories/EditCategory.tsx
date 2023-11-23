import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGetCategoriesQuery, Category } from "./CategorySlice";
import { CategoryForm } from "./components/CategoryForm";
import { useSnackbar } from 'notistack'
export const CategoryEdit = () => {
    // const id = useParams().id || "";
    const [isdisabled, setIsdisabled] = useState(false);
    const id = useParams().id as string;
    // const category = useAppSelector((state) => selectCategoryById(state, id));
    const { data: category, isFetching } = useGetCategoriesQuery({ id });
    const [categoryState, setCategoryState] = useState<Category>({
        id: "",
        name: "",
        is_active: false,
        created_at: "",
        updated_at: "",
        deleted_at: "",
        description: "",
    });
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(updateCategory(categoryState));
        enqueueSnackbar("Success updating category!", { variant: "success" })
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategoryState({ ...categoryState, [name]: value });
    }

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setCategoryState({ ...categoryState, [name]: checked })
    }

    return (
        <Box >
            <Paper>
                <Box p={2}>

                    <Box mb={2}>
                        <Typography variant='h4' >
                            CategoryEdit Page
                        </Typography>
                    </Box>


                </Box>
                <CategoryForm
                    category={categoryState}
                    isdisabled={isdisabled}
                    isLoading={false}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleToggle={handleToggle} />
            </Paper>
        </Box>
    );
};

