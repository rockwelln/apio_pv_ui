import React, {Component} from "react";
import Row from "react-bootstrap/lib/Row";
import Form from "react-bootstrap/lib/Form";
import FormGroup from "react-bootstrap/lib/FormGroup";
import FormControl from "react-bootstrap/lib/FormControl";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import Button from "react-bootstrap/lib/Button";
import Col from "react-bootstrap/lib/Col";
import Panel from "react-bootstrap/lib/Panel";
import Alert from "react-bootstrap/lib/Alert";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import {FormattedMessage} from "react-intl";
import {API_URL_PREFIX, checkStatus} from "./utils";
import apio_logo from "./images/logo.png";

const RESET_PASSWORD_TOKEN_LENGTH = 64;
export const RESET_PASSWORD_PREFIX = '/reset-password/';


class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {password: '', confirm: '', error: undefined, success: false}
    }

    onSubmit(e) {
        e.preventDefault();

        fetch(API_URL_PREFIX + '/api/v01/auth/reset-password/' + window.location.href.substr(- RESET_PASSWORD_TOKEN_LENGTH), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: this.state.password,
            }),
        })
            .then(checkStatus)
            .then(() => this.setState({success: true, error: undefined}))
            .catch(error => this.setState({error: error.response.statusText}))
    }

    render() {
        const {success, password, error, confirm} = this.state;

        if(success) {
            setTimeout(() => window.location.href = "/", 2000);
            return (
                <Alert bsStyle="success">
                    <FormattedMessage id="password-reset" defaultMessage="Your password has been reset."/>
                </Alert>
            );
        }

        const validPassword = (password === '')?null:(password.length >= 8)?"success":"error";
        const validConfirm = (password === '')?null:(confirm === password)?"success":"error";
        const validForm = (validPassword === "success" && validConfirm === "success");

        return (
            <Form horizontal>
                {error && (
                    <Alert bsStyle="danger">
                        <FormattedMessage id="fail-password-reset" defaultMessage="Failed to reset the password." />
                        {` (${error})`}
                    </Alert>
                )}
                <FormGroup validationState={validPassword}>
                    <Col componentClass={ControlLabel} sm={3}>
                        <FormattedMessage id="password" defaultMessage="Password" />
                    </Col>

                    <Col sm={8}>
                        <FormControl
                            type="password"
                            value={password}
                            onChange={(e) => this.setState({password: e.target.value, error: undefined})}
                        />
                        <HelpBlock><FormattedMessage id="Your password must be at least 8 characters long."/></HelpBlock>
                    </Col>
                </FormGroup>
                <FormGroup validationState={validConfirm}>
                    <Col componentClass={ControlLabel} sm={3}>
                        <FormattedMessage id="confirm" defaultMessage="Confirm" />
                    </Col>

                    <Col sm={8}>
                        <FormControl
                            type="password"
                            value={confirm}
                            onChange={(e) => this.setState({confirm: e.target.value, error: undefined})}
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={3} sm={10}>
                        <Button type="submit" onClick={this.onSubmit.bind(this)} disabled={!validForm}>
                            <FormattedMessage id="submit" defaultMessage="Submit" />
                        </Button>
                    </Col>
                </FormGroup>
            </Form>)
    }
}


export const ResetPasswordPage = ({standby_alert}) => (
    <div>
        <Row style={{height: "20px", display: "block"}}/>
        <Row style={{height: "100%", display: "block"}}>
            <Col xsOffset={1} xs={10} mdOffset={4} md={4}>
                {
                    standby_alert || null
                }
                <Panel>
                    <Panel.Body>
                        <Row>
                            <Col xsOffset={3} xs={6} mdOffset={3} md={7}>
                                <img src={apio_logo}
                                     width={"100%"}
                                     height={"100%"}
                                     style={{padding: 0}}
                                     alt="apio" />
                            </Col>
                        </Row>
                        <Row>
                            <Col xsOffset={1} xs={10} mdOffset={0} md={12}>
                                <hr/>
                                <ResetPasswordForm />
                            </Col>
                        </Row>
                    </Panel.Body>
                </Panel>
            </Col>
        </Row>
    </div>
);
