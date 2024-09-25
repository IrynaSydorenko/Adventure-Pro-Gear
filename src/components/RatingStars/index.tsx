'use client'

import styles from './RatingStars.module.css'

interface RatingStarsProp {
    averageRating: number;
    variant?: 'standart' | 'big';
}

const RatingStars: React.FC<RatingStarsProp> = ({ averageRating, variant = 'standart' }) => {
    const fullStars = Math.floor(averageRating);
    const halfStar = averageRating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const classNameHalf = `${styles.half} ${styles.before}`
    const clipWidth = (averageRating - fullStars) * 20;

    const classNameStars = variant === 'big' ? `${styles.stars} ${styles.big}` : `${styles.stars}`
    const ViewBox = variant === "big" ? '0 0 24 24' : '0 0 20 20'
    const widthStar = variant === "big" ? 24 : 20;
    const heightStar = variant === "big" ? 24 : 20;
    const pathD = variant === "big" ? "M11.4399 1.53675L12.0999 3.53675C12.3982 4.46244 13.2574 5.09174 14.2299 5.09675H16.3099C17.2854 5.09056 18.1528 5.7164 18.4544 6.64412C18.756 7.57184 18.4226 8.58809 17.6299 9.15675L15.9199 10.3968C15.1328 10.9682 14.802 11.9808 15.0999 12.9068L15.7599 14.9068C16.0864 15.8359 15.7677 16.8692 14.9746 17.4531C14.1816 18.037 13.1002 18.0344 12.3099 17.4468L10.6299 16.1968C9.8424 15.6262 8.77746 15.6262 7.98993 16.1968L6.30993 17.4468C5.52407 18.0219 4.45662 18.0235 3.66913 17.4505C2.88163 16.8776 2.55454 15.8615 2.85993 14.9368L3.51993 12.9368C3.81789 12.0108 3.48709 10.9982 2.69993 10.4268L0.949928 9.16675C0.141226 8.59692 -0.197894 7.56405 0.115641 6.62575C0.429177 5.68745 1.32111 5.06595 2.30993 5.09675H4.38993C5.35713 5.09459 6.21473 4.47454 6.51993 3.55675L7.17993 1.55675C7.4758 0.632962 8.33266 0.00457893 9.30267 2.49081e-05C10.2727 -0.00452912 11.1354 0.615781 11.4399 1.53675Z" : "M12.0333 3.78063L12.5833 5.4473C12.8318 6.2187 13.5478 6.74312 14.3583 6.7473H16.0916C16.9045 6.74213 17.6273 7.26367 17.8787 8.03677C18.13 8.80987 17.8521 9.65674 17.1916 10.1306L15.7666 11.164C15.1106 11.6402 14.835 12.484 15.0833 13.2556L15.6333 14.9223C15.9053 15.6966 15.6397 16.5577 14.9789 17.0443C14.318 17.5308 13.4168 17.5287 12.7583 17.039L11.3583 15.9973C10.702 15.5219 9.81455 15.5219 9.15827 15.9973L7.75827 17.039C7.10339 17.5183 6.21385 17.5195 5.55761 17.0421C4.90136 16.5647 4.62878 15.7179 4.88327 14.9473L5.43327 13.2806C5.68158 12.509 5.40591 11.6652 4.74994 11.189L3.29161 10.139C2.61769 9.6641 2.33509 8.80338 2.59637 8.02146C2.85765 7.23954 3.60092 6.72162 4.42494 6.7473H6.15827C6.96427 6.74549 7.67894 6.22878 7.93327 5.46396L8.48327 3.7973C8.72984 3.02747 9.44388 2.50382 10.2522 2.50002C11.0606 2.49623 11.7795 3.01315 12.0333 3.78063Z"

    return <div className={classNameStars}>
        {[...Array(fullStars)].map((_, index) => (
            <svg key={`full-${index}`} viewBox={ViewBox} width={widthStar} height={heightStar} fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={pathD} fill="#FFC670" />
            </svg>
        ))}
        {halfStar && (
            <div className={styles.half}>
                <svg viewBox={ViewBox} width={widthStar} height={heightStar} fill='none' >
                    <defs>
                        <clipPath id="half-clip">
                            <rect x="0" y="0" width={clipWidth} height="20" />
                        </clipPath>
                    </defs>
                    <path d={pathD} fill="#FFC670" clipPath="url(#half-clip)" />
                </svg>
                <svg fill='none' viewBox={ViewBox} width={widthStar} height={heightStar} className={classNameHalf}>
                    <path d={pathD} stroke="#FFC670" />
                </svg>
            </div>
        )}
        {[...Array(emptyStars)].map((_, index) => (
            <svg key={`empty-${index}`} fill='none' viewBox={ViewBox} width={widthStar} height={heightStar}>
                <path d={pathD} stroke="#FFC670" />
            </svg>
        ))}
    </div >
}

export default RatingStars;