import React, { useState } from 'react'
import Slider from 'react-slick';
import { map } from 'lodash';
import { Image, Modal } from 'semantic-ui-react';

export default function CarouselScreenshots(props) {

    const { title, screenshots } = props;
    const [showModal, setShowModal] = useState(false);
    const [urlImage, setUrlImage] = useState(null);

    // Creamos la configuracion para nuestro slider de imagenes
    const settings = {
        className: "carousel-screenshots",
        dots: false, // dots son los puntos que se muestran siempre debajo del slider
        infinity: true, // infinity indica si cuando el slider llegue al final, comience de nuevo
        speed: 500,
        slidesToShow: 3,
        swipeToSlider: true 
    };

    // Funcion para hacer zoom en la imagen al hacer click
    const openImage = url => {
        
        setUrlImage(url);
        setShowModal(true);

    }

    return (
        <>
            <Slider {...settings}>
                
                { map(screenshots, (screenshot) => (
                    <Image key={screenshot.id} src={screenshot.url} alt={title} onClick={() => openImage(screenshot.url)} />
                )) }

            </Slider>
            <Modal open={showModal} onClose={() => setShowModal(false)} size="large">
                <Image src={urlImage} alt={title} />
            </Modal>
        </>
    )
}
