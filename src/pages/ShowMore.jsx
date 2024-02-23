import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from "../components/Button";
import Footer from "../components/Footer";
import { Star, StarBorderOutlined } from "@mui/icons-material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';

function ShowMore() {
    const { mediaType, id } = useParams();
    const [content, setContent] = useState({});
    const [year, setYear] = useState('');
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [trailerKey, setTrailerKey] = useState('');

    useEffect(() => {
        const apiUrl = mediaType === 'movie'
            ? `https://api.themoviedb.org/3/movie/${id}?api_key=4d515835e70ed91238de09e575d7d8b2`
            : `https://api.themoviedb.org/3/tv/${id}?api_key=4d515835e70ed91238de09e575d7d8b2`;
        const castUrl = `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=4d515835e70ed91238de09e575d7d8b2&language=en-US`;
        const videoUrl = `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=4d515835e70ed91238de09e575d7d8b2&language=en-US`;

        axios.get(apiUrl)
            .then(response => {
                setContent(response.data);
                const releaseDate = response.data.first_air_date || response.data.release_date;
                if (releaseDate) {
                    const year = new Date(releaseDate).getFullYear();
                    setYear(year);
                }
            })
            .catch(error => console.error('Error fetching media details:', error));

        axios.get(castUrl)
            .then(response => {
                setCrew(response.data.crew);
                setCast(response.data.cast.slice(0, 7));
            })
            .catch(error => console.error('Error fetching credits:', error));

        axios.get(videoUrl)
            .then(response => {
                const foundOfficialTrailer = response.data.results.find(item => (
                    item.type === "Trailer" &&
                    item.site === "YouTube" &&
                    item.official === true
                ));
                if (foundOfficialTrailer) {
                    setTrailerKey(foundOfficialTrailer.key);
                }
            })
            .catch(error => console.error('Error fetching trailer:', error));
    }, [id, mediaType]);

    return (
        <>
            <div className='mx-[200px]'>
                <div className="flex justify-between items-start">
                    <div className="mb-5">
                        <div className="mb-4 text-[26px] font-bold">{mediaType === 'movie' ? content.title : content.name}</div>
                        <div className="text-gray-400">
                            <ul className="flex">
                                <li className="mr-3">{year}</li>
                                <li className="mr-3">|</li>
                                <li>{(content.episode_run_time || content.runtime) != "" ? (content.episode_run_time || content.runtime) + ' min' : "NA min"}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-[30px]">
                        <div className="text-[32px]">
                            <ul className="flex">
                                <li><Star className="text-yellow-500 pb-2" style={{ fontSize: "40px" }} /></li>
                                <li>{content.vote_average ? content.vote_average.toFixed(1) : 'NA'}</li>
                                <li><span className="text-[20px] text-gray-400 mr-6">/10</span></li>
                                <div className='cursor-pointer flex'>
                                    <li><StarBorderOutlined className="text-blue-500 ml-auto" /></li>
                                    <li><span className="text-blue-500 text-[20px]">Rate</span></li>
                                </div>

                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex mb-[30px]">
                    <img className='h-[480px] w-[340px] object-cover object-top rounded-lg mr-[40px]' src={`https://image.tmdb.org/t/p/original/${content.poster_path}`} alt="Poster" />
                    {trailerKey ? (
                        <iframe className='h-[480px] w-[100%] object-cover object-top rounded-lg' src={`https://www.youtube.com/embed/${trailerKey}`} title="Trailer" allowFullScreen></iframe>
                    ) : (
                        <img className='h-[480px] w-[100%] object-cover object-top rounded-lg' src={`https://image.tmdb.org/t/p/original/${content.backdrop_path}`} alt="Backdrop" />
                    )}
                </div>
                <div>
                    <div className="mb-4 flex gap-2">
                        {content.genres?.map(genre => (
                            <Button key={genre} name={genre.name} bgColor='transparent' textColor='yellow_default' borderColor='yellow_default' fit='fit' />
                        ))}
                    </div>
                </div>
                <div className='flex'>
                    <div className='w-[75%]'>
                        <div>
                            <div className='font-bold text-[20px]'>
                                Overview :
                            </div>
                            <div className="mb-16">
                                {content.overview}
                            </div>
                            <div>
                                <hr />
                                <div className='flex text-[15px] my-2'>
                                    <div className='font-bold mr-4'>
                                        Director:
                                    </div>
                                    <div>
                                        {crew.find(member => member.known_for_department === 'Directing')?.name || "NA"}
                                    </div>
                                </div>
                                <hr />
                                <div className='flex text-[15px] my-2'>
                                    <div className='font-bold mr-4'>
                                        Cast :
                                    </div>
                                    <div>
                                        <ul className="flex">
                                            {cast.map(actor => (
                                                <li key={actor.id} className="mr-4 text-blue-600">{actor.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <hr />
                                <div className='flex text-[15px] my-2'>
                                    <div className='font-bold mr-4'>
                                        Tag Line :
                                    </div>
                                    <div>
                                        {content.tagline || "NA"}
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col pl-[60px] ml-[60px] border-l-2 pb-1 space-y-4'>
                        <div>
                            <div className='font-bold text-[17px]'>
                                Status
                            </div>
                            <div className='text-blue-600 text-[15px]'>
                                {content.status}
                            </div>
                        </div>
                        <div>
                            <div className='font-bold text-[17px]'>
                                Original Language
                            </div>
                            <div className='text-blue-600 text-[15px]'>
                                {content.original_language}
                            </div>
                        </div>
                        {mediaType === 'tv' && (
                            <>
                                <div>
                                    <div className='font-bold text-[17px]'>
                                        Total Seasons
                                    </div>
                                    <div className='text-blue-600 text-[15px]'>
                                        {content.number_of_seasons}
                                    </div>
                                </div>
                                <div>
                                    <div className='font-bold text-[17px]'>
                                        Total Episodes
                                    </div>
                                    <div className='text-blue-600 text-[15px]'>
                                        {content.number_of_episodes}
                                    </div>
                                </div>
                            </>
                        )}
                        <div>
                            <div className='font-bold text-[17px]'>
                                Release Date
                            </div>
                            <div className='text-blue-600 text-[15px]'>
                                {content.release_date || content.first_air_date}
                            </div>
                        </div>
                        <div>
                            <div className='font-bold text-[17px]'>
                                Runtime
                            </div>
                            <div className='text-blue-600 text-[15px]'>
                                {(content.episode_run_time || content.runtime) != "" ? (content.episode_run_time || content.runtime) + ' min' : "NA min"}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='relative  w-[75%] mt-10'>
                    <div className='flex items-center mb-10'>
                        <div className="bottom-0 left-0 p-2 border-l-4 border-yellow_default flex items-center">
                            <span className="ml-2 mr-1 font-bold text-[23px]">Reviews</span>
                            <ArrowForwardIosIcon sx={{ fontSize: "26px" }} className="arrow" />
                        </div>
                        <div className='absolute right-0'>
                            <Button name='Give Review' bgColor='blue-600' />
                        </div>
                    </div>
                    <div className='mb-5 '>
                        <div className='flex'>
                            <div className='p-6 bg-orange-500 h-[50px] w-[50px] text-center flex items-center justify-center rounded-full mr-4'>
                                F
                            </div>
                            <div>
                                <div className='font-bold text-[17px]'>
                                    Floch Forster {/* user name will be shown here */}
                                </div>
                                <div className=' text-[14px] text-gray-400 mb-3'>
                                    January 7, 2024{/* data when review is given will be shown here */}
                                </div>
                            </div>
                        </div>
                        <div className='flex mb-3'>
                            <Star className="text-yellow-500" />
                            <Star className="text-yellow-500" />
                            <Star className="text-yellow-500" />
                            <Star className="text-yellow-500" />
                            <Star className="text-yellow-500" />
                            <Star className="text-yellow-500" />
                            <Star className="text-yellow-500" />
                            <Star className="text-yellow-500" />
                            <Star className="text-yellow-500" />
                            <Star className="text-yellow-500" />
                        </div>
                        <div>
                            He was the best guy around {/* Reviews are shown here*/}
                            <hr />
                        </div>
                    </div>
                    <div className='mb-5 '>
                        <div className='flex'>
                            <div className='p-6 bg-orange-900 h-[50px] w-[50px] text-center flex items-center justify-center rounded-full mr-4'>
                                R
                            </div>
                            <div>
                                <div className='font-bold text-[17px]'>
                                    Reiner Braun {/* user name will be shown here */}
                                </div>
                                <div className=' text-[14px] text-gray-400 mb-3'>
                                    January 8, 2024{/* data when review is given will be shown here */}
                                </div>
                            </div>
                        </div>
                        <div className='flex mb-3'>
                            <Star className="text-yellow-500" />
                            <Star className="text-yellow-500" />
                            <StarBorderOutlined className='text-yellow-500' />
                            <StarBorderOutlined className='text-yellow-500' />
                            <StarBorderOutlined className='text-yellow-500' />
                            <StarBorderOutlined className='text-yellow-500' />
                            <StarBorderOutlined className='text-yellow-500' />
                            <StarBorderOutlined className='text-yellow-500' />
                            <StarBorderOutlined className='text-yellow-500' />
                            <StarBorderOutlined className='text-yellow-500' />

                        </div>
                        <div>
                            What about the people he.....? {/* Reviews are shown here*/}
                            <hr />
                        </div>
                    </div>
                    <div className='flex justify-center' >
                        <Button name='Show More' bgColor='blue-600' />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default ShowMore;
