import React from "react";
import { Wrapper, Message, DeafaultImg } from "./DeafaultScreen.styled";
import NoQuery from '../empty-res.png'

function DeafaultScreen() {
    return (
    <Wrapper>
            <Message>Please enter your query in the text box!</Message>
            <DeafaultImg src={NoQuery} alt="enter your query" />
    </Wrapper>
)};

export default DeafaultScreen;