import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import Chart from "./components/Chart";
import Rates from "./components/Rates";

const App: React.FunctionComponent = ()=>{

    return (
        <Container className={"pt-5 pb-5"}>
            <Row className={"mb-4"}>
                <Col>
                    <h2 className={"text-center"}>Currencies information</h2>
                </Col>
            </Row>
            <Row>
                <Col className={"rates"}>
                    <Rates/>
                </Col>
                <Col className={"chart"}>
                    <Chart/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
