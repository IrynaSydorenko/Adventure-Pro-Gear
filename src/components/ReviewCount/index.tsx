'use client'

import Image from 'next/image'
import styles from './ReviewCount.module.css'
import Reviews from '@/../public/icons/Reviews.svg';

interface ReviewCountProps {
    reviewCount: number;
}
const ReviewCount: React.FC<ReviewCountProps> = ({ reviewCount }) => {
    return <div className={styles.reviews}>
        <Image src={Reviews} width={12} height={11} alt='reviews' />
        <span className={styles.text}>{reviewCount}</span>
    </div>
}

export default ReviewCount;