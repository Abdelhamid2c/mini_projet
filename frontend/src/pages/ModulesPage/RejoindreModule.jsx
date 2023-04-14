import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CustomModal from "../../components/CustomModal";
import { useMutation, useQuery } from "react-query";
import { LoadingButton } from "@mui/lab";
import { searchModules, sendInvitation } from "../../redux/api/moduleApi";
import { useSelector } from "react-redux";
import SnackBar from "../../components/SnackBar";

function RejoindreModule() {
  const { user } = useSelector((state) => state.auth);

  const [openModal, setOpenModal] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarType, setSnackBarType] = useState("");
  const [values, setValues] = useState({
    identifiant: "",
  });

  const [searchModule, setSearchModule] = useState(null);

  const { isLoading, mutate } = useMutation({
    mutationKey: "rejoindreModule",
    mutationFn: () => {
      return sendInvitation(searchModule._id, user._id, user.token);
    },
    onSuccess: (data) => {
      setSnackBarMessage(
        "Votre demande d'inscription a été envoyée avec succès"
      );
      setSnackBarType("success");
      setOpenSnackBar(true);
    },
    onError: (err) => {
      setSnackBarMessage(err.response.data.message);
      setSnackBarType("error");
      setOpenSnackBar(true);
    },
  });

  const {
    isLoading: isLoadingSearch,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: "searchModule",
    enabled: false,
    queryFn: () => {
      return searchModules(user._id, user.token, values.identifiant);
    },
    onSuccess: (data) => {
      setSearchModule(data.data.module);
    },
    onError: (err) => {
      setSnackBarMessage("Aucun module n'a été trouvé avec cet identifiant");
      setSnackBarType("error");
      setOpenSnackBar(true);
    },
  });

  const handleSubmit = () => {
    mutate();
  };

  const handleSearch = () => {
    if (
      values.identifiant === "" ||
      values.identifiant === null ||
      values.identifiant === undefined
    ) {
      setSnackBarMessage("Veuillez remplir tous les champs");
      setSnackBarType("error");
      setOpenSnackBar(true);
      return;
    }
    if (values.identifiant.length < 8) {
      setSnackBarMessage("L'identifiant doit contenir au moins 8 caractères");
      setSnackBarType("error");
      setOpenSnackBar(true);
      return;
    }
    refetch();
  };
  return (
    <Box>
      <SnackBar
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        message={snackBarMessage}
        type={snackBarType}
      />
      <LoadingButton
        variant="contained"
        onClick={() => {
          setOpenModal(true);
        }}
        loading={isLoading}
      >
        Rejoindre un cours
      </LoadingButton>
      <CustomModal open={openModal} setOpen={setOpenModal}>
        <Stack spacing={2}>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            Rejoindre un cours
          </Typography>

          <TextField
            margin="normal"
            name="id"
            required
            fullWidth
            id="id"
            label="Identifiant"
            autoFocus
            onChange={(handleChange) => {
              setValues({ identifiant: handleChange.target.value });
            }}
          />
          <Divider />

          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Annuler
            </Button>
            <LoadingButton
              variant="contained"
              onClick={handleSearch}
              loading={isLoadingSearch || isFetching}
            >
              Rechercher
            </LoadingButton>
          </Stack>
          <Divider />
          {searchModule && (
            <Stack direction="row" justifyContent="space-between">
              <Typography>
                {searchModule.name} - {searchModule.teacherId.fullName}
              </Typography>
              <LoadingButton
                variant="contained"
                onClick={() => {
                  handleSubmit();
                  setOpenModal(false);
                  setSearchModule(null);
                  setValues({ identifiant: "" });
                }}
                loading={isLoading}
              >
                Rejoindre
              </LoadingButton>
            </Stack>
          )}
        </Stack>
      </CustomModal>
    </Box>
  );
}

export default RejoindreModule;
