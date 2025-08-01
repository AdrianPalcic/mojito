import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/all"
import { useRef } from "react"
import { useMediaQuery } from "react-responsive"

const Hero = () => {

    const videoRef = useRef<HTMLVideoElement | null>(null);

    const isMobile = useMediaQuery({ maxWidth: 767 })

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
            .to('.right-leaf', { y: 200 }, 0)
            .to('.left-leaf', { y: -200 }, 0)

        gsap.from('video', {
            opacity: 0,
            y: -10,
            duration: 2,
            delay: 1
        })

        const startValue = isMobile ? 'top 50%' : 'center 60%';
        const endValue = isMobile ? '250% top' : 'bottom top'

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'video',
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
            }
        })
        if (videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
                tl.to(videoRef.current, {
                    currentTime: videoRef.current?.duration
                })
            }
        }

    }, [])

    return (
        <>
            <section id="hero" className="noisy">
                <h1 className="title uppercase">Mojito</h1>
                <img src="/images/hero-left-leaf.png" alt="Left leaf" className="left-leaf" />
                <img src="/images/hero-right-leaf.png" alt="right leaf" className="right-leaf" />
                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden mt-15 md:block ">
                            <p>Coll. Crisp. Classis.</p>
                            <p className="subtitle"> Sip the Spirit <br /> of Summer</p>
                        </div>

                        <div className="view-cocktails">
                            <p className="subtitle">Every cocktail on our menu is a blend of premium ingridients, creative flair, and timeless recipes - designed to delight your senses</p>
                            <a href="#cocktails">View Cocktails</a>
                        </div>
                    </div>
                </div>

            </section>

            <div className="video absolute inset-0">
                <video ref={videoRef} src="/videos/output.mp4" muted playsInline preload="auto"></video>
            </div>
        </>
    )
}

export default Hero