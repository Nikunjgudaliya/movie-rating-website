import PropTypes from 'prop-types'
import Accordian from './Accordian';

// import Accordian from './Accordian';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Page(props) {


    const renderDropdowns = () => {
        if (props.title === "Movies" || props.title === "TV Series") {
            return (
                <>
                    <Accordian />
                </>
            );
        } else {
            return (
                <>
                    {/* <Accordian />
                    <Accordian />
                    <Accordian /> */}

                </>
            );
        }
    }

    return (
        <>
            <div>
                <p className='text-[34px] ml-[80px] mb-8'> Explore {props.title} </p>
                {renderDropdowns()}
            </div>
        </>
    );
}

Page.propTypes = {
    title: PropTypes.string.isRequired,
};
