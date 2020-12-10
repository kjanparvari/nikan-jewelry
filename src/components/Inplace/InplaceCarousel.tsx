import React, {useEffect, useRef, useState} from 'react';
import Carousel from 'react-bootstrap/Carousel'
import {GrNext} from 'react-icons/gr';
import {NavigateNext, NavigateBefore} from '@material-ui/icons'

function InplaceCarousel({slides}: any) {
    const [index, setIndex] = useState(0);
    const nextRef = useRef(null);

    const handleSelect = (selectedIndex: any, e: any) => {
        setIndex(selectedIndex);
    };
    // useEffect(() => {// @ts-ignore
    //     nextRef.current.focus()}, []);
    const items = slides.map((slide: any) => {
        return (
            <Carousel.Item>
                <div className="d-block w-100">
                    {slide}
                </div>
            </Carousel.Item>
        );
    });
    const nextIcon = <a style={{color: "white"}} ref={nextRef}> <NavigateNext style={{fontSize: 50}}/> </a>;
    const prevIcon = <a style={{color: "white"}}> <NavigateBefore style={{fontSize: 50}}/> </a>;
    return (
        <Carousel activeIndex={index} onSelect={handleSelect} indicators={false} slide={false} wrap={false}
                  fade={true} nextIcon={nextIcon} prevIcon={prevIcon} keyboard={true}>;
            {items}
        </Carousel>
    );
}

export default InplaceCarousel;