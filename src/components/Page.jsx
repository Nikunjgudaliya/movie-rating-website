import PropTypes from 'prop-types';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import Button from './Button';
import { StarBorderOutlined, Star } from '@mui/icons-material';

export default function Page(props) {
    const [genres, setGenres] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [mediaData, setMediaData] = useState([]);
    const [page, setPage] = useState(1);
    const [loadMoreClicked, setLoadMoreClicked] = useState(false); // Track if Load More button is clicked

    useEffect(() => {
        // Fetch genres from TMDb API
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=4d515835e70ed91238de09e575d7d8b2')
            .then(response => response.json())
            .then(data => {
                const genreNames = data.genres.map(genre => ({ id: genre.id, name: genre.name, selected: false }));
                setGenres(genreNames);
            })
            .catch(error => console.error('Error fetching genres:', error));

        // Fetch languages from TMDb API
        fetch('https://api.themoviedb.org/3/configuration/languages?api_key=4d515835e70ed91238de09e575d7d8b2')
            .then(response => response.json())
            .then(data => {
                const filteredLanguages = data.filter(language =>
                    ['English', 'Hindi', 'French', 'Korean', 'Japanese', 'Gujarati', 'Spanish', 'Italian'].includes(language.english_name)
                );
                setLanguages(filteredLanguages);
            })
            .catch(error => console.error('Error fetching languages:', error));

        // Fetch movie data when the component mounts
        fetchMediaData();
    }, []);

    useEffect(() => {
        // Fetch movie data whenever selected genres or languages change
        fetchMediaData();
    }, [selectedGenres, selectedLanguages, page]);

    const fetchMediaData = () => {
        const genreIds = selectedGenres.filter(genre => genre.selected).map(genre => genre.id).join(',');
        const languageCodes = selectedLanguages.filter(language => language.selected).map(language => language.iso_639_1).join(',');

        // Fetch movie data from TMDb API based on selected genres and languages
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=4d515835e70ed91238de09e575d7d8b2&with_genres=${genreIds}&with_original_language=${languageCodes}&page=${page}`)
            .then(response => response.json())
            .then(data => {
                if (loadMoreClicked && page !== 1) {
                    // If Load More button is clicked and it's not the first page, append new data
                    setMediaData(prevMediaData => [...prevMediaData, ...data.results]);
                } else {
                    // Otherwise, replace existing data with new data
                    setMediaData(data.results);
                }
            })
            .catch(error => console.error('Error fetching media data:', error));
    };

    const handleGenreClick = (index) => {
        const updatedGenres = [...genres];
        updatedGenres[index].selected = !updatedGenres[index].selected;
        setGenres(updatedGenres);
        setSelectedGenres(updatedGenres);
        // Reset Load More clicked status
        setLoadMoreClicked(false);
        setPage(1);
    };

    const handleLanguageClick = (index) => {
        const updatedLanguages = [...languages];
        updatedLanguages[index].selected = !updatedLanguages[index].selected;
        setLanguages(updatedLanguages);
        setSelectedLanguages(updatedLanguages);
        // Reset Load More clicked status
        setLoadMoreClicked(false);
        setPage(1);
    };

    const loadmore = () => {
        setPage(page1 => page1 + 1);
        // Set Load More clicked status
        setLoadMoreClicked(true);
    }

    return (
        <>
            <div className='mx-[80px]'>
                <p className='text-[34px] mb-8'> Explore {props.title} </p>
                <div className="flex">
                    <div className='mr-4'>
                        <Accordion sx={{ backgroundColor: '#202020', color: 'white', width: '300px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Genre
                            </AccordionSummary>
                            <AccordionDetails style={{ height: 'auto', overflowY: 'auto' }}>
                                <ul className='flex flex-wrap justify-center'>
                                    {genres.map((genre, index) => (
                                        <li key={index} className='mr-2 mb-2' onClick={() => handleGenreClick(index)}>
                                            <Button name={genre.name} fit="fit"
                                                bgColor={genre.selected ? 'yellow_default' : 'transparent'}
                                                textColor={genre.selected ? 'black' : 'yellow_default'}
                                                borderColor='yellow_default'>
                                                {genre.name}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionDetails>
                        </Accordion>
                    </div>

                    <div className='mr-4'>
                        <Accordion sx={{ backgroundColor: '#202020', color: 'white', width: '300px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                Language
                            </AccordionSummary>
                            <AccordionDetails style={{ height: 'auto', overflowY: 'auto' }}>
                                <ul className='flex flex-wrap justify-center'>
                                    {languages.map((language, index) => (
                                        <li key={index} className='mr-2 mb-2' onClick={() => handleLanguageClick(index)}>
                                            <Button name={language.english_name} fit="fit"
                                                bgColor={language.selected ? 'yellow_default' : 'transparent'}
                                                textColor={language.selected ? 'black' : 'yellow_default'}
                                                borderColor='yellow_default'>
                                                {language.english_name}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>

                <div className="flex flex-wrap justify-between mb-10">
                    {mediaData.map(media => (
                        <div key={media.id} className='w-[200px] my-4 relative'>
                            <img className='h-[290px] w-full object-cover object-top rounded-tr-md rounded-tl-md' src={`https://image.tmdb.org/t/p/original/${media.poster_path}`} alt={media.title} />
                            <div className="h-[100px] w-full bg-gray_default rounded-bl-md rounded-br-md p-2 text-white flex flex-col">
                                <div className="flex items-center mb-1">
                                    <Star className="text-yellow-500 mr-1" />
                                    <span className="text-sm mr-1">{media.vote_average.toFixed(1)}</span>
                                    <StarBorderOutlined className="text-blue-500 ml-auto" />
                                </div>
                                <p className="text-md font-bold">{media.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div onClick={loadmore} className='flex justify-center mb-5'>
                <Button name="Load More" bgColor='yellow_default' textColor='black' />
            </div>
        </>
    );
}

Page.propTypes = {
    title: PropTypes.string.isRequired,
};
