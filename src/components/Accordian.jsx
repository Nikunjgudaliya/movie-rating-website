import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import Button from './Button';

export default function Accordian() {
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=4d515835e70ed91238de09e575d7d8b2')
            .then(response => response.json())
            .then(data => {
                const genreNames = data.genres.map(genre => ({ name: genre.name, selected: false }));
                setGenres(genreNames);
            })
            .catch(error => console.error('Error fetching genres:', error));
    }, []);

    const handleGenreClick = (index) => {
        const updatedGenres = [...genres];
        updatedGenres[index].selected = !updatedGenres[index].selected;
        setSelectedGenres(updatedGenres);
    };

    return (
        <>
            <div className='flex ml-[80px]'>
                <Accordion sx={{ backgroundColor: '#202020', color: 'white', width: '300px' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography sx={{ fontWeight: "bold" }}>Genre</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ height: 'auto', overflowY: 'auto' }}>
                        <Typography>
                            <ul className='flex flex-wrap justify-center'>
                                {genres.map((genre, index) => (
                                    <li key={index} className='mr-2 mb-2' onClick={() => handleGenreClick(index)}>
                                        <Button name={genre.name} fit="fit"
                                            bgColor={selectedGenres[index]?.selected ? 'yellow_default' : 'transparent'}
                                            textColor={selectedGenres[index]?.selected ? 'black' : 'yellow_default'}
                                            borderColor='yellow_default'>
                                            {genre.name}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

            </div>
        </>
    );
}

