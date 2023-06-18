/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

// interface DietModalInterface {
//   open: boolean;
//   setOpen: (v: boolean) => void;
//   initialData?: any;
//   onClick: any;
// }

export default function DietModal({
  open,
  setOpen,
  initialData,
  onClick,
  onClose,
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [observations, setObservations] = useState("");
  const [title, setTitle] = useState("");

  const readMode = !!initialData;

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSubmit = () => {
    const data = {
      startDate: new Date(startDate).toISOString().split(".")?.at(0),
      endDate: new Date(endDate).toISOString().split(".")?.at(0),
      breakfast,
      lunch,
      dinner,
      observations,
      title,
    };

    onClick(data);
  };

  useEffect(() => {
    setStartDate(initialData?.startDate?.split("T")?.at(0) || "");
    setEndDate(initialData?.endDate?.split("T")?.at(0) || "");
    setBreakfast(initialData?.breakfast || "");
    setLunch(initialData?.lunch || "");
    setDinner(initialData?.dinner || "");
    setObservations(initialData?.observations || "");
    setTitle(initialData?.title || "");
  }, [initialData]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Box
            alignContent="center"
            justifyContent="center"
            display="flex"
            gap={2}
          >
            <img src="/src/assets/logo-no-background.png" alt="" width={50} />
            <span>{readMode ? "Ver dieta " : " Adicionar dieta"}</span>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ padding: "32px", overflow: "visible" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Box display="grid" gridTemplateColumns="repeat(8, 1fr)" gap={2}>
              <Box gridColumn="span 8">
                <TextField
                  disabled={readMode}
                  margin="dense"
                  label="Nome"
                  type="text"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  inputProps={{
                    "data-testid": "nome",
                  }}
                />
              </Box>

              <Box gridColumn="span 4">
                <TextField
                  disabled={readMode}
                  margin="dense"
                  label="Data de início"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  inputProps={{
                    "data-testid": "dataInicio",
                  }}
                />
              </Box>
              <Box gridColumn="span 4">
                <TextField
                  disabled={readMode}
                  margin="dense"
                  label="Data de término"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  inputProps={{
                    "data-testid": "dataTermino",
                  }}
                />
              </Box>
              <Box gridColumn="span 8">
                <TextField
                  disabled={readMode}
                  margin="dense"
                  label="Café da manhã"
                  type="text"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                  value={breakfast}
                  onChange={(e) => setBreakfast(e.target.value)}
                  inputProps={{
                    "data-testid": "cafeDaManha",
                  }}
                />
              </Box>
              <Box gridColumn="span 8">
                <TextField
                  disabled={readMode}
                  margin="dense"
                  label="Almoço"
                  type="text"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                  value={lunch}
                  onChange={(e) => setLunch(e.target.value)}
                  inputProps={{
                    "data-testid": "almoco",
                  }}
                />
              </Box>
              <Box gridColumn="span 8">
                <TextField
                  disabled={readMode}
                  margin="dense"
                  label="Janta"
                  type="text"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                  value={dinner}
                  onChange={(e) => setDinner(e.target.value)}
                  inputProps={{
                    "data-testid": "janta",
                  }}
                />
              </Box>
              <Box gridColumn="span 8">
                <TextField
                  disabled={readMode}
                  margin="dense"
                  label="Observações"
                  type="text"
                  multiline
                  rows={2}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  inputProps={{
                    "data-testid": "observacoes",
                  }}
                />
              </Box>
            </Box>

            {!readMode && (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                data-testid="submit-diet"
                fullWidth
                sx={{
                  margin: "32px 0",
                  backgroundColor: "#FAC63C",
                  fontWeight: "900",
                  width: "100%",
                  ":hover": { background: "#FAC63C", opacity: ".6" },
                }}
              >
                Salvar dieta
              </Button>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
