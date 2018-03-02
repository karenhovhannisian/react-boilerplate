"use strict";

import {Col, Container, Row} from "reactstrap";
import * as React from "react";

interface IMainContainerProps {
    children: any;
}

const MainContainer: React.StatelessComponent<IMainContainerProps> = ({children}) => {
    return (
        <section id="login-content" className="login-content">
            <Container>
                <Row>
                    <Col xs="12" lg="4">
                        <div className="form-login">
                            {children}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default MainContainer;
