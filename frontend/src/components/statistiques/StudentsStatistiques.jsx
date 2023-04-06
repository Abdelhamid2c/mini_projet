import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CustomCardApercu from "./CustomCardApercu";

import GroupIcon from "@mui/icons-material/Group";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RestorePageIcon from "@mui/icons-material/RestorePage";
import CancelIcon from "@mui/icons-material/Cancel";
import CustomModalForStudentsStatistiques from "./CustomModalForStatistiques";

function StudentsStatistiques(props) {
  const {
    students,
    studentLessThan7,
    studentsNotValidated,
    studentsValidated,
  } = props.students;

  const [openStuentNotValidated, setOpenStuentNotValidated] =
    React.useState(false);
  const [rowsStudentValidated, setRowsStudentValidated] = React.useState([]);

  const [openStudentLessThan7, setOpenStudentLessThan7] = React.useState(false);
  const [rowsStudentLessThan7, setRowsStudentLessThan7] = React.useState([]);

  const [openStudentValidated, setOpenStudentValidated] = React.useState(false);
  const [rowsStudentNotValidated, setRowsStudentNotValidated] = React.useState(
    []
  );

  useEffect(() => {
    if (studentsValidated) {
      const rows = studentsValidated.map((mark) => {
        return {
          id: mark._id,
          cne: mark.student.codeMassar,
          name: mark.student.fullName,
          note: mark.mark,
        };
      });
      setRowsStudentValidated(rows);
    }
  }, [studentsValidated]);

  useEffect(() => {
    if (studentLessThan7) {
      const rows = studentLessThan7.map((mark) => {
        return {
          id: mark._id,
          cne: mark.student.codeMassar,
          name: mark.student.fullName,
          note: mark.mark,
        };
      });
      setRowsStudentLessThan7(rows);
    }
  }, [studentLessThan7]);

  useEffect(() => {
    if (studentsNotValidated) {
      const rows = studentsNotValidated.map((mark) => {
        return {
          id: mark._id,
          cne: mark.student.codeMassar,
          name: mark.student.fullName,
          note: mark.mark,
        };
      });
      setRowsStudentNotValidated(rows);
    }
  }, [studentsNotValidated]);

  const handleClickStudent = () => {};
  const handleClickStudentLessThan7 = () => {
    setOpenStudentLessThan7(true);
  };
  const handleClickStudentNotValidat = () => {
    setOpenStuentNotValidated(true);
  };
  const handleClickStudentValidated = () => {
    setOpenStudentValidated(true);
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        width: "100%",
        padding: "10px",
        border: "1px solid #eaeaea",
        borderRadius: "5px",
      }}
    >
      <Typography
        sx={{
          color: "#231942",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Statistiques des étudiants
      </Typography>
      <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <CustomCardApercu
            number={students ? students.length : 0}
            text="Elèves inscrits"
            backgroundColor="#bc4749"
            enabled={true}
            onClick={handleClickStudent}
            icon={<GroupIcon />}
          />

          <CustomCardApercu
            number={studentsValidated ? studentsValidated.length : 0}
            text="Elèves validés"
            backgroundColor="#a7c957"
            enabled={true}
            onClick={handleClickStudentValidated}
            icon={<CheckCircleOutlineIcon />}
          />
          <CustomModalForStudentsStatistiques
            open={openStudentValidated}
            setOpen={setOpenStudentValidated}
            title="Elèves validés"
            rows={rowsStudentValidated}
          />

          <CustomCardApercu
            number={studentLessThan7 ? studentLessThan7.length : 0}
            text="Elèves en rattrapage"
            backgroundColor="#6a994e"
            enabled={true}
            onClick={handleClickStudentLessThan7}
            icon={<RestorePageIcon />}
          />
          <CustomModalForStudentsStatistiques
            open={openStudentLessThan7}
            setOpen={setOpenStudentLessThan7}
            title="Elèves en rattrapage"
            rows={rowsStudentLessThan7}
          />
          <CustomCardApercu
            number={studentsNotValidated ? studentsNotValidated.length : 0}
            text="Elèves non validés"
            backgroundColor="#386641"
            enabled={true}
            onClick={handleClickStudentNotValidat}
            icon={<CancelIcon />}
          />
          <CustomModalForStudentsStatistiques
            open={openStuentNotValidated}
            setOpen={setOpenStuentNotValidated}
            title="Elèves non validés"
            rows={rowsStudentNotValidated}
          />
        </Grid>
      </Box>
    </Stack>
  );
}

export default StudentsStatistiques;
