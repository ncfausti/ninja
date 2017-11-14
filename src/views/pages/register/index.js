import React from 'react';
import {Link} from 'react-router';
import {
    Form, Input, Label, FormGroup, Button, FormText,
    Card, CardBlock
} from 'reactstrap';
import IconTwitter from 'react-icons/lib/fa/twitter';
import IconFacebook from 'react-icons/lib/fa/facebook';
import IconGoogle from 'react-icons/lib/fa/google';
import '../style.scss';

export default () => (
    <div className="view">
        <div className="view-content view-pages view-session d-flex justify-content-center align-items-center flex-column">
            <Card className="mb-3 form-card">
                <CardBlock>
                    <header className="mb-5 center">
                        <Link to="/">
                            {/*Ninja by Hans Paul Mösl Junior from the Noun Project*/}
                            <img src={"/bg_logo.png"} width={"80%"}/>
                            <strong className="h3 text-uppercase" style={{color: '#212121'}}></strong>
                        </Link>
                        <p className="lead">Register for an Account</p>
                    </header>
                    <Form action="/">
                        <FormGroup className="mb-4">
                            <Label>Email Address</Label>
                            <Input type="email" placeholder="someone@xyz.com"/>
                        </FormGroup>
                        <FormGroup className="mb-4">
                            <Label>Password</Label>
                            <Input type="password" placeholder="longsecret"/>
                            <FormText>Minimum length 6 characters</FormText>
                        </FormGroup>
                        <FormGroup className="mb-5">
                            <Label>Retype Password</Label>
                            <Input type="password" placeholder="samelongsecret"/>
                            <FormText className="ml-4"><Input type="checkbox"/>&nbsp;&nbsp;Email me monthly newsletter</FormText>
                        </FormGroup>
                        <FormGroup className="text-right">
                            <Button color="success" block size="lg">Register</Button>
                        </FormGroup>
                    </Form>
                </CardBlock>
            </Card>
            <p className="font-weight-bold">or sign up with...</p>
            <ul className="list-unstyled social-auth">
                <li><a href="#na"><IconTwitter size={22}/></a></li>
                <li><a href="#na"><IconFacebook size={22}/></a></li>
                <li><a href="#na"><IconGoogle size={22}/></a></li>
            </ul>
        </div>
    </div>
)
