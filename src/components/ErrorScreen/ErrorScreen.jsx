import { Wrapper, Message, ErrorImg } from "./ErrorScreen.styled";
import ErrorImage from '../error-res.png'

function ErrorScreen({query}) {
    return (
    <Wrapper>
            <Message>Unfortunately we has not foung images by "{query}"!</Message>
            <ErrorImg src={ErrorImage} alt="enter your query" />
    </Wrapper>
)};

export default ErrorScreen;