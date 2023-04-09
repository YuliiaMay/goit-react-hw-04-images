import axios from "axios";
import PropTypes from 'prop-types';

const API_KEY = '33500508-b4271a177ba3ac813eaf35292';
axios.defaults.baseURL = "https://pixabay.com/api/";


export async function fetchImages(query, page) {
    try {
        const response = await axios('', {
            params: {
                key: API_KEY,
                q: query,
                page,
                image_type: 'photo',
                orientation: 'horizontal',
                per_page: 12,
            },
        });

        

        if (response.status === 200) {
            return response;
        }

        return Promise.reject(
            new Error('happened mistake')
        );
    } catch(error) {
        console.log(error.message);
    }
}


fetchImages.propTypes = {
    query: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
};