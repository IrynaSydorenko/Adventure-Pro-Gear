'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Locale } from '@/i18n-config';
import FollowinIcon from '@/../public/icons/Following.svg';
import Reviews from '@/../public/icons/Reviews.svg';
import Comercial from '@/../public/icons/Comercial.svg';
import NotAvailable from '@/../public/images/soldout.png';
import styles from './Card.module.css';
import Button from '../Button';

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
    locale: Locale;
    screenOption?: string;
    /* onBuyClick: (productId: number) => void; */
}

const Card: React.FC<CardProps> = ({ product, attrInd = 1, locale, /* onBuyClick, */ screenOption = 'standart' }) => {
    const [newPrice, setNewPrice] = useState<number>(0);
    const [isAvailable, setIsAvailable] = useState(true);
    const [productName, setProductName] = useState<string>('');
    const [classNameBuy, setClassNameBuy] = useState<string>(styles.buySectionHide);
    console.log(product)
    console.log('!label', !product.attributes[attrInd].label)
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
                <Image className={styles.productImage} src="https://dummyimage.com/164x164" width={164} height={160} alt={productName} />
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
                        <div className={styles.stars}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.0333 3.78063L12.5833 5.4473C12.8318 6.2187 13.5478 6.74312 14.3583 6.7473H16.0916C16.9045 6.74213 17.6273 7.26367 17.8787 8.03677C18.13 8.80987 17.8521 9.65674 17.1916 10.1306L15.7666 11.164C15.1106 11.6402 14.835 12.484 15.0833 13.2556L15.6333 14.9223C15.9053 15.6966 15.6397 16.5577 14.9789 17.0443C14.318 17.5308 13.4168 17.5287 12.7583 17.039L11.3583 15.9973C10.702 15.5219 9.81455 15.5219 9.15827 15.9973L7.75827 17.039C7.10339 17.5183 6.21385 17.5195 5.55761 17.0421C4.90136 16.5647 4.62878 15.7179 4.88327 14.9473L5.43327 13.2806C5.68158 12.509 5.40591 11.6652 4.74994 11.189L3.29161 10.139C2.61769 9.6641 2.33509 8.80338 2.59637 8.02146C2.85765 7.23954 3.60092 6.72162 4.42494 6.7473H6.15827C6.96427 6.74549 7.67894 6.22878 7.93327 5.46396L8.48327 3.7973C8.72984 3.02747 9.44388 2.50382 10.2522 2.50002C11.0606 2.49623 11.7795 3.01315 12.0333 3.78063Z" fill="#FFC670" />
                            </svg>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.0333 3.78063L12.5833 5.4473C12.8318 6.2187 13.5478 6.74312 14.3583 6.7473H16.0916C16.9045 6.74213 17.6273 7.26367 17.8787 8.03677C18.13 8.80987 17.8521 9.65674 17.1916 10.1306L15.7666 11.164C15.1106 11.6402 14.835 12.484 15.0833 13.2556L15.6333 14.9223C15.9053 15.6966 15.6397 16.5577 14.9789 17.0443C14.318 17.5308 13.4168 17.5287 12.7583 17.039L11.3583 15.9973C10.702 15.5219 9.81455 15.5219 9.15827 15.9973L7.75827 17.039C7.10339 17.5183 6.21385 17.5195 5.55761 17.0421C4.90136 16.5647 4.62878 15.7179 4.88327 14.9473L5.43327 13.2806C5.68158 12.509 5.40591 11.6652 4.74994 11.189L3.29161 10.139C2.61769 9.6641 2.33509 8.80338 2.59637 8.02146C2.85765 7.23954 3.60092 6.72162 4.42494 6.7473H6.15827C6.96427 6.74549 7.67894 6.22878 7.93327 5.46396L8.48327 3.7973C8.72984 3.02747 9.44388 2.50382 10.2522 2.50002C11.0606 2.49623 11.7795 3.01315 12.0333 3.78063Z" fill="#FFC670" />
                            </svg>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.0333 3.78063L12.5833 5.4473C12.8318 6.2187 13.5478 6.74312 14.3583 6.7473H16.0916C16.9045 6.74213 17.6273 7.26367 17.8787 8.03677C18.13 8.80987 17.8521 9.65674 17.1916 10.1306L15.7666 11.164C15.1106 11.6402 14.835 12.484 15.0833 13.2556L15.6333 14.9223C15.9053 15.6966 15.6397 16.5577 14.9789 17.0443C14.318 17.5308 13.4168 17.5287 12.7583 17.039L11.3583 15.9973C10.702 15.5219 9.81455 15.5219 9.15827 15.9973L7.75827 17.039C7.10339 17.5183 6.21385 17.5195 5.55761 17.0421C4.90136 16.5647 4.62878 15.7179 4.88327 14.9473L5.43327 13.2806C5.68158 12.509 5.40591 11.6652 4.74994 11.189L3.29161 10.139C2.61769 9.6641 2.33509 8.80338 2.59637 8.02146C2.85765 7.23954 3.60092 6.72162 4.42494 6.7473H6.15827C6.96427 6.74549 7.67894 6.22878 7.93327 5.46396L8.48327 3.7973C8.72984 3.02747 9.44388 2.50382 10.2522 2.50002C11.0606 2.49623 11.7795 3.01315 12.0333 3.78063Z" fill="#FFC670" />
                            </svg>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.0333 3.78063L12.5833 5.4473C12.8318 6.2187 13.5478 6.74312 14.3583 6.7473H16.0916C16.9045 6.74213 17.6273 7.26367 17.8787 8.03677C18.13 8.80987 17.8521 9.65674 17.1916 10.1306L15.7666 11.164C15.1106 11.6402 14.835 12.484 15.0833 13.2556L15.6333 14.9223C15.9053 15.6966 15.6397 16.5577 14.9789 17.0443C14.318 17.5308 13.4168 17.5287 12.7583 17.039L11.3583 15.9973C10.702 15.5219 9.81455 15.5219 9.15827 15.9973L7.75827 17.039C7.10339 17.5183 6.21385 17.5195 5.55761 17.0421C4.90136 16.5647 4.62878 15.7179 4.88327 14.9473L5.43327 13.2806C5.68158 12.509 5.40591 11.6652 4.74994 11.189L3.29161 10.139C2.61769 9.6641 2.33509 8.80338 2.59637 8.02146C2.85765 7.23954 3.60092 6.72162 4.42494 6.7473H6.15827C6.96427 6.74549 7.67894 6.22878 7.93327 5.46396L8.48327 3.7973C8.72984 3.02747 9.44388 2.50382 10.2522 2.50002C11.0606 2.49623 11.7795 3.01315 12.0333 3.78063Z" fill="#FFC670" />
                            </svg>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.0333 3.78063L12.5833 5.4473C12.8318 6.2187 13.5478 6.74312 14.3583 6.7473H16.0916C16.9045 6.74213 17.6273 7.26367 17.8787 8.03677C18.13 8.80987 17.8521 9.65674 17.1916 10.1306L15.7666 11.164C15.1106 11.6402 14.835 12.484 15.0833 13.2556L15.6333 14.9223C15.9053 15.6966 15.6397 16.5577 14.9789 17.0443C14.318 17.5308 13.4168 17.5287 12.7583 17.039L11.3583 15.9973C10.702 15.5219 9.81455 15.5219 9.15827 15.9973L7.75827 17.039C7.10339 17.5183 6.21385 17.5195 5.55761 17.0421C4.90136 16.5647 4.62878 15.7179 4.88327 14.9473L5.43327 13.2806C5.68158 12.509 5.40591 11.6652 4.74994 11.189L3.29161 10.139C2.61769 9.6641 2.33509 8.80338 2.59637 8.02146C2.85765 7.23954 3.60092 6.72162 4.42494 6.7473H6.15827C6.96427 6.74549 7.67894 6.22878 7.93327 5.46396L8.48327 3.7973C8.72984 3.02747 9.44388 2.50382 10.2522 2.50002C11.0606 2.49623 11.7795 3.01315 12.0333 3.78063Z" fill="#FFC670" />
                            </svg>
                        </div>
                        <div className={styles.reviews}>
                            <Image src={Reviews} width={12} height={11} alt='reviews' />
                            <span className={styles.text}>10</span>
                        </div>
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