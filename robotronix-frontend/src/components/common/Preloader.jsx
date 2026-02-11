import { useState, useEffect } from 'react'

const Preloader = () => {
    const [isVisible, setIsVisible] = useState(true)
    const [opacity, setOpacity] = useState(1)

    useEffect(() => {
        const hasShown = sessionStorage.getItem('preloaderShown')
        if (hasShown) {
            setIsVisible(false)
            return
        }

        const timer = setTimeout(() => {
            setOpacity(0)
            setTimeout(() => {
                setIsVisible(false)
                sessionStorage.setItem('preloaderShown', 'true')
            }, 500)
        }, 800)

        return () => clearTimeout(timer)
    }, [])

    if (!isVisible) return null

    return (
        <div
            id="preloader"
            style={{ opacity, transition: 'opacity 0.5s ease' }}
        >
            <div className="robot-loader">
                <div className="robot-head">
                    <div className="robot-eye left"></div>
                    <div className="robot-eye right"></div>
                </div>
                <div className="loading-text">Yuklanmoqda...</div>
            </div>
        </div>
    )
}

export default Preloader
