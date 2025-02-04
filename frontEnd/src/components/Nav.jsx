import React, { useState } from "react";
import { Navbar, Nav, Offcanvas, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../assets/Imgs/logo.svg";
import MenuIcon from "../assets/Icons/menuIcon.svg";

function NavBar() {
  const [showCanvas, setShowCanvas] = useState(false);

  const handleShow = () => setShowCanvas(true);
  const handleClose = () => setShowCanvas(false);

  return (
    <>
      <Navbar style={{ backgroundColor: "#2C3E50" }} variant="dark" className="d-flex justify-content-between align-items-center">
        {/* Lado esquerdo */}
        <Nav className="d-flex align-items-center">
          <Button
            variant="link"
            onClick={handleShow}
            className="text-white p-0 ms-5"
            style={{ border: "none", background: "none" }}
          >
            <img src={MenuIcon} alt="Menu" style={{ maxHeight: "30px" }} className="d-inline-block" />
          </Button>
        </Nav>

        {/* Lado direito */}
        <Nav className="d-flex align-items-center me-5">
          <Navbar.Brand href="#" className="m-0">
            <Link to={"/"}>
              <img
                src={Logo}
                alt="Logo"
                style={{ maxHeight: "40px" }}
                className="h-auto w-auto"
              />
            </Link>
          </Navbar.Brand>
        </Nav>
      </Navbar>


      <Offcanvas show={showCanvas} onHide={handleClose} placement="start" backdrop={true} style={{ backgroundColor: "#2C3E50"}}>
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title className="text-light">Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" className="text-light">Início</Nav.Link>
            <Nav.Link as={Link} to="/associados" className="text-light">Cadastrar Associado</Nav.Link>
            <Nav.Link as={Link} className="text-light" >Cadastrar títulos</Nav.Link>
            <Nav.Link as={Link} to="/netflix-ta-cara-meus-anjos" className="text-light">
              Cadastrar Despesas
            </Nav.Link>
            <Nav.Link as={Link} className="text-light">Cadastrar cargos</Nav.Link>
            <Nav.Link as={Link} className="text-light">_______________________</Nav.Link>
            <Nav.Link as={Link} to="/ListarAssociados" className="text-light">Consultar Associados</Nav.Link>
            <Nav.Link as={Link} className="text-light">_______________________</Nav.Link>
            <Nav.Link as={Link} to="/" disabled className="text-light disabled">Ajuda</Nav.Link>
                       
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavBar;
