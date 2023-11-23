import { Box, Button, IconButton, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridFilterModel, GridRenderCellParams, GridRowsProp, GridToolbar } from "@mui/x-data-grid";
import { Key, ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGetCategoriesQuery } from "./CategorySlice";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack'
import { CategoriesTable } from "./components/Category.Table";

export const CategoryList = () => {
    const [options, setOptions] = useState({
        page: 1,
        search: "",
        perPage: 10,
        rowsPerPage: [10, 20, 30],
    });
    const [deleteCategory, { error: deleteError, isSuccess: deleteSuccess }] =
        useDeleteCategoryMutation();
    //const [categories, setCategories] = useState(data);
    // const categories = useAppSelector(selectCategories);
    const { data, isFetching, error } = useGetCategoriesQuery(options);
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const componentProps = {
        toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
        }
    }
    // const rows: GridRowsProp = categories ? categories.data.map((category: { id: any; name: any; is_active: any; created_at: string | number | Date; }) => ({
    //     id: category.id,
    //     name: category.name,
    //     is_active: category.is_active,
    //     created_at: new Date(category.created_at).toLocaleDateString("pt-BR"),

    // })) : [];
    // const columns: GridColDef[] = [
    //     {
    //         field: 'name',
    //         headerName: ' Name',
    //         flex: 1,
    //         renderCell: renderNameCell
    //     },

    //     {
    //         field: "is_active",
    //         headerName: "Active",
    //         flex: 1,
    //         type: "boolean",
    //         renderCell: renderIsActiveCell
    //     },
    //     {
    //         field: "created_at",
    //         headerName: "Created At",
    //         flex: 1
    //     },
    //     {
    //         field: 'id',
    //         headerName: "Actions",
    //         type: 'string',
    //         flex: 1,
    //         renderCell: renderActionsCell,
    //     },

    // ];

    async function handleDeleteCategory(id: string) {
        await deleteCategory(id);

    }


    function renderActionsCell(params: GridRenderCellParams) {
        const { id } = params;

        return (

            <IconButton
                color="secondary"
                onClick={() => handleDeleteCategory(params.value)}
                aria-label="delete"
            >
                <DeleteIcon />
            </IconButton>
        );
    }
    function renderNameCell(rowData: GridRenderCellParams) {
        return (
            <Link
                style={{ textDecoration: "none" }}
                href={`/categories/edit/${rowData.id}`}
            >
                <Typography color="primary">{rowData.value}</Typography>
            </Link>
        );
    }
    function renderIsActiveCell(rowData: GridRenderCellParams) {
        return (
            <Typography color={rowData.value ? 'primary' : 'secondary'}>
                {rowData.value ? "Active" : "Inactive"}
            </Typography>
        );
    }


    return (
        <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    href="/categories/create"
                    style={{ marginBottom: "1rem" }}
                >
                    New Category

                </Button>
            </Box>

            <Box sx={{ display: "flex", height: 600 }}>
                <CategoriesTable
                    data={data}
                    isFetching={isFetching}
                    perPage={options.perPage}
                    rowsPerPage={options.rowsPerPage}
                    handleDelete={handleDeleteCategory} handleOnPageChange={function (page: number): void {
                        throw new Error("Function not implemented.");
                    }} handleFilterChange={function (filterModel: GridFilterModel): void {
                        throw new Error("Function not implemented.");
                    }} handleOnPageSizeChange={function (perPage: number): void {
                        throw new Error("Function not implemented.");
                    }}                // handleOnPageChange={handleOnPageChange}
                // handleOnPageSizeChange={handleOnPageSizeChange}
                // handleFilterChange={handleFilterChange}
                />


            </Box>
        </Box>
    );
};

function useDeleteCategoryMutation(): [any, { error: any; isSuccess: any; }] {
    throw new Error("Function not implemented.");
}
