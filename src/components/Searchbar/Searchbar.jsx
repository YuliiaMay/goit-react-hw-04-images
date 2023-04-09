import {useState} from "react";
import { SearchbarContainer, SearchForm, SearchFormButton, SearchFormInput } from "./Searchbar.styled";
import { toast } from 'react-toastify';
import { FcSearch } from "react-icons/fc";


const Searchbar = ({onSubmit}) => {
    const [query, setQuery] = useState('');

    const handelChange = ({ target: { value } }) => {
        setQuery(value);
    }

    const handelSubmit = (e) => {
        e.preventDefault();

        if (query.trim() === '') {
            toast.warn('Please enter a search query');
            return;
        }

        onSubmit(query.trim());
        reset();
    }

    const reset = () => {
        setQuery('');
    }

        return (
            <SearchbarContainer>
                <SearchForm onSubmit={handelSubmit}>
                    <SearchFormButton type="submit">
                        <FcSearch size={32}/>
                    </SearchFormButton>

                    <SearchFormInput
                        type="text"
                        autocomplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="query"
                        value={query}
                        onChange={handelChange}
                    />
                </SearchForm>
            </SearchbarContainer>
        )
}

export default Searchbar;