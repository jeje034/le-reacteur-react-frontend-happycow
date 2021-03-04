import "./EstablishmentsSection.scss";

import { Link } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import vegOptionIcon from "../../assets/category_veg-options.svg";
import veganIcon from "../../assets/category_vegan.svg";
import vegetarianIcon from "../../assets/category_vegetarian.svg";
import bAndBIcon from "../../assets/category_b-b.svg";
import starIcon from "../../assets/Star.png";
import emptyStarIcon from "../../assets/EmptyStar.png";
import halfStarIcon from "../../assets/HalfStar.png";

const EstablishmentsSection = ({
    deviceScreen,
    responsive,
    sectionDatas,
    sectionTitle,
}) => {
    const getEstblishmentCard = (indice) => {
        if (sectionDatas.length >= indice + 1) {
            return (
                <div className="establishment-section-establishment-card">
                    <Link
                        key={sectionDatas[indice].placeId}
                        // to={`/offer/${offer._id}`}
                        to={`/reviews`}
                        target="_blank"
                        style={{
                            textDecoration: "none",
                            color: "black",
                        }}
                    >
                        <img
                            className="establishment-section-card-image"
                            alt={sectionDatas[indice].name}
                            src={sectionDatas[indice].thumbnail}
                        ></img>
                    </Link>

                    <div className="establishment-section-establishment-type-and-name">
                        {sectionDatas[indice].type === "veg-options" && (
                            <img
                                className="establishment-section-establishment-type-image"
                                src={vegOptionIcon}
                                alt="veg-options"
                            />
                        )}
                        {sectionDatas[indice].type === "vegan" && (
                            <img
                                className="establishment-section-establishment-type-image"
                                src={veganIcon}
                                alt="vegan"
                            />
                        )}
                        {sectionDatas[indice].type === "vegetarian" && (
                            <img
                                className="establishment-section-establishment-type-image"
                                src={vegetarianIcon}
                                alt="vegetarian"
                            />
                        )}
                        {sectionDatas[indice].type === "B&B" && (
                            <img
                                className="establishment-section-establishment-type-image"
                                src={bAndBIcon}
                                alt="B&amp;B"
                            />
                        )}
                        <Link
                            key={sectionDatas[indice].placeId}
                            // to={`/offer/${offer._id}`}
                            to={`/reviews`}
                            target="_blank"
                            style={{
                                textDecoration: "none",
                                color: "black",
                            }}
                        >
                            <div className="establishment-section-establishment-name">
                                {sectionDatas[indice].name.length > 20
                                    ? sectionDatas[indice].name.substring(
                                          0,
                                          20
                                      ) + "…"
                                    : sectionDatas[indice].name}
                            </div>
                        </Link>
                    </div>
                    {/*
                    Le Caboulot de la Se…
                    Les Demoiselles de M…                    
                    Green Lab - Comédie

                     */}
                    {/*
     Récupérer à partir d'adresse semble délicat
     "9 Rue Quincampoix (at 4t…rondissement), Paris, …"
     "31 rue Vieille du Temple, Paris, France, 75004"
     "22, Rue des Ecouffes, Paris, France, 75004"

     => à partir de coorodnnées
      */}
                    <div className="establishment-section-adress">
                        Ville, Pays
                    </div>

                    {getStars(sectionDatas[indice].rating)}
                    <p>{sectionDatas[indice].description}</p>
                </div>
            );
        }
    };

    const getStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (rating - 1 >= 0) {
                stars.push(1);
            } else if (rating - 0.5 >= 0) {
                stars.push(0.5);
            } else {
                stars.push(0);
            }
            rating--;
        }

        return (
            <div className="establishment-section-around-star">
                {stars.map((element, indice) => {
                    return (
                        <img
                            key={indice}
                            className="establishment-section-star"
                            src={
                                element === 1
                                    ? starIcon
                                    : element === 0.5
                                    ? halfStarIcon
                                    : emptyStarIcon
                            }
                            alt={
                                element === starIcon
                                    ? "Star"
                                    : element === halfStarIcon
                                    ? "Half star"
                                    : "No star"
                            }
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <section className="establishment-container-x-columns">
            <h2 className="establishment-section-h2">{sectionTitle}</h2>
            <Carousel
                swipeable={deviceScreen === "mobile"} //Peut-on le faire défiler à la main ?
                draggable={false}
                showDots={false} //Pour masquer les petits points (dots dans le doc) en bas permettant de savoir sur quelle "page on est" et aussi de se déplacer
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={false}
                autoPlay={false} //msgjs21 this.props.deviceType !== "mobile" ? true : false
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition={
                    deviceScreen === "mobile"
                        ? "none 0"
                        : "transform 200ms ease-in-out"
                } //"none 0" //"all .5"
                transitionDuration={200} //{deviceScreen === "mobile" ? 0 : 300}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["mobile"]}
                arrows={
                    responsive[deviceScreen]["items"] >= 2 &&
                    sectionDatas.length > responsive[deviceScreen]["items"]
                }
                deviceType={deviceScreen} //msgjs21 {this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {getEstblishmentCard(0)}
                {getEstblishmentCard(1)}
                {getEstblishmentCard(2)}
                {getEstblishmentCard(3)}
                {getEstblishmentCard(4)}
                {getEstblishmentCard(5)}
                {getEstblishmentCard(6)}
                {getEstblishmentCard(7)}
                {getEstblishmentCard(8)}
                {getEstblishmentCard(9)}
            </Carousel>

            {/* {sectionDatas.map((restaurant, index) => {
        return (
            <div key={restaurant.placeId}>
                {`${getDistanceFromBrowserForDebug(
                    restaurant.location.lat,
                    restaurant.location.lng
                ).toFixed(1)} km : ${restaurant.name} : type ${
                    restaurant.type
                }, category ${restaurant.category}, vegan ${
                    restaurant.vegan
                }, vegOnly ${restaurant.vegOnly}, address ${
                    restaurant.address
                }`}
            </div>
        );
    })} */}
            {/* {bAndBsNearMeArray.map((bAndB, index) => {
        return (
            <div key={bAndB.placeId}>
                {`${getDistanceFromBrowserForDebug(
                    bAndB.location.lat,
                    bAndB.location.lng
                ).toFixed(1)} km : ${bAndB.name} : category ${
                    bAndB.category
                }, vegan ${bAndB.vegan}, vegOnly ${
                    bAndB.vegOnly
                }, address ${bAndB.address}`}
            </div>
        );
    })} */}
            {/*  Exemple de filtre sur un map
    
    {restaurants
        .filter(
            (restaurant) =>
                !restaurant.address.includes("Paris")
        )
        .map((restaurant, index) => {
            //console.log(restaurant.location);
            return (
                <div key={restaurant.placeId}>
                    {"2 - restaurants sans Paris - " +
                        distance(
                            restaurant.location.lat,
                            restaurant.location.lng
                        ) +
                        " - " +
                        restaurant.address}
                </div>
            );
        })} */}
        </section>
    );
};

export default EstablishmentsSection;
