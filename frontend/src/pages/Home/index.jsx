/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import DietCard from "./components/DietCard";
import DietModal from "./components/DietModal";

import dietImages from "../../utils/dietImages";

import "./styles.css";
import api from "../../api";
import { toast } from "react-toastify";

function HomePage() {
  const [username, setUsername] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const [diets, setDiets] = useState([]);

  const handleAddDiet = () => {
    setModalData(null);
    setOpenModal(true);
  };

  const handleCreateDiet = async (data) => {
    try {
      await api.post("/diet", data);
      toast.success("Dieta criada com sucesso!");

      await handleLoadUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateDiet = async (data) => {
    try {
      await api.patch(`/diet/${modalData?.id}`, data);
      toast.success("Dieta editada com sucesso!");

      await handleLoadUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadUser = async () => {
    try {
      const response = await api.get("/diet");
      setDiets(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoadUser();
  }, []);

  return (
    <div className="home">
      <header className="d-flex j-center">
        <img src="/src/assets/logo-no-background.png" alt="Logo" height={50} />
      </header>
      <main className="d-flex j-center">
        <div style={{ width: "75%" }}>
          <section className="cont-header d-flex">
            <div className="d-flex">
              <div
                style={{
                  height: "35px",
                  width: "20px",
                  background: "#FAC63C",
                  marginRight: "8px",
                }}
              />
              <Typography variant="h5" gutterBottom>
                Seja bem vindo!
              </Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddDiet}
                fullWidth
                style={{
                  backgroundColor: "#FAC63C",
                  fontWeight: "900",
                }}
                data-testid="add-diet"
              >
                Adicionar dieta
              </Button>
            </div>
          </section>

          <div style={{ padding: "64px 0" }}>
            <Typography variant="h5" gutterBottom>
              Dietas cadastradas
            </Typography>
          </div>

          <section>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
              {diets.map((diet, i) => (
                <Box gridColumn="span 4" key={i}>
                  <DietCard
                    description={`${new Date(
                      diet.startDate
                    ).toLocaleDateString()} - ${
                      diet.endDate
                        ? new Date(diet.endDate).toLocaleDateString()
                        : "atualmente"
                    }`}
                    img={dietImages[i]}
                    name={diet.title}
                    onClick={() => {
                      setModalData(diet);
                      setOpenModal(true);
                    }}
                  />
                </Box>
              ))}
            </Box>
          </section>
        </div>
      </main>
      <DietModal
        open={openModal}
        setOpen={setOpenModal}
        initialData={modalData}
        onClose={() => {
          setModalData(null);
        }}
        onClick={async (data) => {
          if (modalData) {
            await handleUpdateDiet(data);
          } else {
            await handleCreateDiet(data);
          }

          setOpenModal(false);
          setModalData(null);
        }}
      />
    </div>
  );
}

export default HomePage;
