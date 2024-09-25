'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Locale } from '@/i18n-config';
import FollowinIcon from '@/../public/icons/Following.svg';
import Comercial from '@/../public/icons/Comercial.svg';
import NotAvailable from '@/../public/images/soldout.png';
import styles from './Card.module.css';
import Button from '../Button';
import RatingStars from '../RatingStars';
import ReviewCount from '../ReviewCount';

interface CardProps {
    product: {
        productId: number,
        productNameUa: string,
        productNameEn: string,
        basePrice: number,
        attributes: [
            {
                priceDeviation: number,
                quantity: number,
                label: string | null
            }
        ],
        contents: [
            { source: string }
        ],
    };
    attrInd?: number;
    avgRating?: number;
    countReviews?: number;
    locale: Locale;
    screenOption?: string;
    /* onBuyClick: (productId: number) => void; */
}

const Card: React.FC<CardProps> = ({ product, attrInd = 1, locale, avgRating = 0, countReviews = 0,/* onBuyClick, */ screenOption = 'standart' }) => {
    const [newPrice, setNewPrice] = useState<number>(0);
    const [isAvailable, setIsAvailable] = useState(true);
    const [productName, setProductName] = useState<string>('');
    const [classNameBuy, setClassNameBuy] = useState<string>(styles.buySectionHide);
    console.log(product)

    useEffect(() => {
        setNewPrice(product.basePrice + product.basePrice * (product.attributes[attrInd].priceDeviation / 100));
        setProductName(locale == 'uk-UA' ? product.productNameUa : product.productNameEn);
        setIsAvailable(product.attributes[attrInd].quantity > 0 ? true : false);
    }, [product, locale]);

    const handleMouseOver: (event: any) => void = () => {
        setClassNameBuy(styles.buySectionShow)
    }
    const handleMouseLeave: (event: any) => void = () => {
        setClassNameBuy(styles.buySectionHide)
    }

    return (
        <section className={styles.cardWrapper} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
            <div className={styles.imageWrapper}>
                <Image className={styles.productImage} src="https://dummyimage.com/180x180" width={164} height={160} alt={productName} />
                <div className={styles.specialWrapper}>
                    {!isAvailable && <Image className={styles.saleOut} src={NotAvailable} alt='not available' width={105} height={49} />}
                    {product.basePrice > newPrice &&
                        <div className={styles.sale}>Акція</div>}
                    {product.attributes[0].label &&
                        <div className={styles.new}>Нове</div>}
                </div>
                <div className={styles.following}>
                    <Image src={FollowinIcon} width={20} height={18} alt='following' />
                </div>
            </div>
            <div className={styles.cardContent}>
                <div className={styles.cardInfo}>
                    <h3 className={styles.productName}>
                        {productName}
                    </h3>
                    <div className={styles.rating}>
                        <RatingStars averageRating={avgRating} />
                        <ReviewCount reviewCount={countReviews} />
                    </div>
                    {product.basePrice !== newPrice ?
                        (<div className={styles.price}>
                            <div className={styles.oldPrice}>
                                <span>{product.basePrice} ₴</span>
                                <span className={styles.deviation}>{product.attributes[attrInd].priceDeviation} %</span>
                            </div>
                            <div className={styles.newPrice}>{newPrice} ₴</div>
                        </div>)
                        : (<div className={styles.newPrice}>{product.basePrice} ₴</div>)}
                </div>
                <div className={styles.available}>{isAvailable ? "В наявності" : "Нема в наявності"}</div>
            </div>
            <div className={classNameBuy}>
                <Button /* onClick={() => onBuyClick(product.productId)} */ text={'Купити'} className={styles.buyButton} disabled={!isAvailable} icon={<Image src={Comercial} width={20} height={20} alt='Comercial' />} />
            </div>
        </section>
    );
};

export default Card;