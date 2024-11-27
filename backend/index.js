const express = require("express") 
const cors = require("cors") 
const AssociadoRoutes = require("./routes/AssociadoRoutes.js") 

const app = express();

app.use(cors());
app.use(express.json());
app.use("/associados",AssociadoRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
}); 