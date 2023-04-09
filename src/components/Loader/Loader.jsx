import { MagnifyingGlass } from 'react-loader-spinner'
import { Overlay } from './Loader.styled';


export default function Spiner() {
    return (
        <Overlay>
            <MagnifyingGlass
                visible={true}
                height="100"
                width="100"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor = '#CCEFF6'
                color = '#0070A0'
            />
        </Overlay>
    );
}


