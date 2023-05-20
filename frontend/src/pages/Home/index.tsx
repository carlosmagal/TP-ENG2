/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import DietCard from "./components/DietCard";
import DietModal from "./components/DietModal";

import dietImages from "../../utils/dietImages";

import "./styles.css";

function HomePage() {
  const [username] = useState("Fulano");
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const [diets] = useState<any>([
    {
      id: 1,
      name: "teste",
      beginDate: "2023-05-20T22:03:12",
      endDate: "2023-06-21T22:03:12",
    },
    {
      id: 2,
      name: "teste",
      beginDate: "2023-06-22T22:03:12",
      endDate: "2023-07-21T22:03:12",
    },
    {
      id: 3,
      name: "teste",
      beginDate: "2023-07-22T22:03:12",
      endDate: "2023-08-20T22:03:12",
    },
  ]);

  const handleAddDiet = () => {
    setModalData(null);
    setOpenModal(true);
  };

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
                Olá, {username}!
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
              {diets.map((diet: any, i: any) => (
                <Box gridColumn="span 4" key={i}>
                  <DietCard
                    description={`${new Date(
                      diet.beginDate
                    ).toLocaleDateString()} - ${
                      diet.endDate
                        ? new Date(diet.endDate).toLocaleDateString()
                        : "atualmente"
                    }`}
                    img={dietImages[i]}
                    name={diet.name}
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
        onClick={() => {
          console.log("d");
        }}
      />
    </div>
  );
}

export default HomePage;
