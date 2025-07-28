import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/all"

const Hero = () => {

    useGSAP(() => {
        const heroSplit = new SplitText('.title', {
            type: 'chars, words'
        })
        const paraSplit = new SplitText('.subtitle', {
            type: 'lines'
        })

        heroSplit.chars.forEach((c) => c.classList.add('text-gradient'))
        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 2.2,
            ease: 'expo.out',
            stagger: 0.06
        })

        gsap.from(paraSplit.lines, {
            opacity: 0,
            y: 100,
            duration: 1.8,
            ease: 'expo.out',
            delay: 1,
            stagger: 0.06
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: "#hero", 
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        })
        .to('.right-leaf', {y: 300}, 0)
        .to('.left-leaf', {y: -200}, 0)
    }, [])

  return (
    <>
    <section id="hero" className="noisy">
        <h1 className="title">Mojito</h1>
        <img src="/images/hero-left-leaf.png" alt="Left leaf" className="left-leaf" />
        <img src="/images/hero-right-leaf.png" alt="right leaf" className="right-leaf" />
    <div className="body">
        <div className="content">
            <div className="space-y-5 hidden mt-15 md:block ">
                <p>Coll. Crisp. Classis.</p>
                <p className="subtitle"> Sip the Spirit <br /> of Summer</p>
            </div>

            <div className="view-cocktails md:mt-2">
                <p className="subtitle">Every cocktail on our menu is a blend of premium ingridients, creative flair, and timeless recipes - designed to delight your senses</p>
                <a href="#cocktails">View Cocktails</a>
            </div>
        </div>
    </div>

    </section>
    </>
  )
}

export default Hero