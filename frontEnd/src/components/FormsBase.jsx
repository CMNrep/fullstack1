import NavBar from "./Nav";
import { Container, Row, Col } from "react-bootstrap";

function FormsBase( children , title) {
  return (
    <>
      <NavBar />
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="p-4 bg-white rounded shadow-sm">
              <Row className="justify-content-center ">
                <h3 className="text-center mb-4 d-none d-sm-block">
                  {title}
                </h3>
                <h5 className="text-center mb-4 d-block d-sm-none">
                  {title}
                </h5>
              </Row>
              {children}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FormsBase;
