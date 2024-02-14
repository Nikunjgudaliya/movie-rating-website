import { Carousel } from 'antd';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import Button from '../components/Button';
import { Star } from '@mui/icons-material';

function Slider() {
    const [content, setContent] = useState([]);
    const [genres, setGenres] = useState({});

    const setting = {
        dots: true,
        arrows: true,
        infinite: true,
    }

    // Fetch movies and genres
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=4d515835e70ed91238de09e575d7d8b2&language=en-US")
            .then(res => res.json())
            .then(data => setContent(data.results.slice(0, 10)))
            .catch(error => console.error("Error fetching movies:", error));

        fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=4d515835e70ed91238de09e575d7d8b2&language=en-US")
            .then(res => res.json())
            .then(data => {
                const genreMap = {};
                data.genres.forEach(genre => {
                    genreMap[genre.id] = genre.name;
                });
                setGenres(genreMap);
            })
            .catch(error => console.error("Error fetching genres:", error));
    }, []);

    return (
        <>
            <Carousel className='mx-[90px] mb-10' {...setting}>
                {content.map(movie => (
                    <div key={movie.id} className='p-[20px]'>
                        <div className="relative">
                            <img className='h-[700px] w-full object-cover object-top rounded-lg' src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.original_title} />
                            <div className="absolute bottom-[70px] left-[120px]">
                                <h2 className='text-white mb-2 text-[70px] font-bold'>{movie.title}</h2>
                                <ul className='flex text-white text-xl mb-4'>
                                    <li className='mr-1'><Star className="text-yellow-500 mr-1" style={{ fontSize: "30px" }} /></li>
                                    <li className='mr-5'>{movie.vote_average.toFixed(1)}</li>
                                    <li className='mr-5'>|</li>
                                    <li>{movie.release_date}</li>
                                </ul>
                                <div className='mb-4 flex gap-2'>
                                    {movie.genre_ids.map(genreId => (
                                        <Button key={genreId} name={genres[genreId]} bgColor='transparent' textColor='yellow_default' borderColor='yellow_default' fit='fit' />
                                    ))}
                                </div>
                                <Button name="SHOW MORE" bgColor='yellow_default' textColor='black' />
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel >
        </>
    );
}

export default Slider;
