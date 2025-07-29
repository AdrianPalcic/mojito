import { useRef, useState } from "react";
import { sliderLists } from "../../constants"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = () => {

    const [currentIndex, setCurrentIndex] = useState(0)
    const contentRef = useRef<HTMLDivElement | null>(null)

    useGSAP(() => {

        gsap.fromTo('#title', { opacity:0 }, {opacity: 1})
        gsap.fromTo('.cocktail img', { opacity:0, xPercent: - 100 }, {opacity: 1, xPercent: 0, duration: 1, ease: 'power1.inOut' })
        gsap.fromTo('.details h2', {yPercent: 100, opacity: 0}, {yPercent: 0, opacity: 1, ease: 'power1.inOut'})
        gsap.fromTo('.details p', {yPercent: 100, opacity: 0}, {yPercent: 0, opacity: 1, ease: 'power1.inOut'})

    }, [currentIndex])

    const totalCocktails = sliderLists.length;

    const goToSlide = (idx: number) => {
        const newIndex = (idx + totalCocktails) % totalCocktails;

        setCurrentIndex(newIndex)
    }

    const getCocktails = (idxOffset: number) => {

        return sliderLists[(currentIndex + idxOffset + totalCocktails) % totalCocktails]
    }

    const currentCocktail = getCocktails(0)
    const prevCocktail = getCocktails(-1)
    const nextCocktail = getCocktails(1)

  return (
    <section id="menu" className="overflow-hidden" aria-labelledby="menu-heading">
        <img src="/images/slider-left-leaf.png" alt="Left-leaf" id="m-left-leaf" />
        <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />

        <h2 id="menu-heading" className="sr-only">
            Cocktail Menu
        </h2>

        <nav className="cocktail-tabs" aria-label="Cocktail navigation">
            {sliderLists.map((drink, idx) => {
                const isActive = idx === currentIndex;

                return (
                    <button onClick={() => goToSlide(idx)} key={drink.id} className={`${isActive ? 'text-white border-white' : 'text-white/50 border-white/50'}`}>{drink.name}</button>
                )
            })}
        </nav>

        <div className="content ">
            <div className="arrows ">
                <button className="text-left" onClick={() => goToSlide(currentIndex - 1)}>
                    <span>{prevCocktail.name}</span>
                    <img src="/images/right-arrow.png" alt="right arrow" aria-hidden="true" />
                </button>
                <button className="text-left" onClick={() => goToSlide(currentIndex + 1)}>
                    <span>{nextCocktail.name}</span>
                    <img src="/images/left-arrow.png" alt="left arrow" aria-hidden="true" />
                </button>
            </div>

            <div className="cocktail ">
                <img src={currentCocktail.image} alt="Cocktail" className="object-contain" />
            </div>

            <div className="recipe">
                <div ref={contentRef} className="info">
                    <p>Recipe for:</p>
                    <p id="title">{currentCocktail.name}</p>
                </div>

                <div className="details ">
                    <h2>{currentCocktail.title}</h2>
                    <p>{currentCocktail.description}</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Menu