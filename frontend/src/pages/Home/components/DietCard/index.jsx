import { Button, Typography } from "@mui/material";

/* eslint-disable @typescript-eslint/no-explicit-any */
// interface DietCardProps {
//   name: string;
//   description: string;
//   onClick: any;
//   img: string;
// }

// function DietCard({ description, name, onClick, img }: DietCardProps) {
function DietCard({ description, name, onClick, img }) {
  return (
    <div
      className="d-flex"
      style={{
        flexDirection: "column",
        gap: "8px",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <img
        src={img}
        alt="diet"
        style={{ borderRadius: "8px", maxWidth: "100%", height: "300px" }}
      />
      <div>
        <Typography variant="h5" gutterBottom>
          {name}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            onClick();
          }}
          fullWidth
          style={{
            backgroundColor: "#FAC63C",
            fontWeight: "900",
            width: "100%",
          }}
        >
          Visualizar dieta
        </Button>
      </div>
    </div>
  );
}

export default DietCard;
