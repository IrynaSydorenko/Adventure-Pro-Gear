'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Locale } from '@/i18n-config';
import FollowinIcon from '@/../public/icons/Following.svg';
import FollowingFill from '@/../public/icons/FollowingFill.svg';
import Comercial from '@/../public/icons/Comercial.svg';
import NotAvailable from '@/../public/images/soldout.png';
import Button from '../Button';
import RatingStars from '../RatingStars';
import ReviewCount from '../ReviewCount';
import styles from './Card.module.css';

interface CardProps {
  product: {
    productId: number;
    productNameUa: string;
    productNameEn: string;
    basePrice: number;
    attributes: [
      {
        priceDeviation: number;
        quantity: number;
        label: string | null;
      },
    ];
    contents: [{ source: string }];
  };
  attrInd?: number;
  avgRating?: number;
  countReviews?: number;
  locale: Locale;
  isLogged: boolean;
  variant?: 'big' | 'standart' | 'small';
  translation: {
    card: {
      addToFollowing: string;
      sale: string;
      new: string;
      available: string;
      outOfStock: string;
      buy: string;
    };
  };
  onBuyClick: (productId: number) => void;
  onFavoriteClick: (productId: number, isFavorite: boolean) => void;
}

const Card: React.FC<CardProps> = ({
  product,
  attrInd = 0,
  locale,
  isLogged,
  avgRating = 0,
  countReviews = 0,
  variant = 'standart',
  translation,
  onBuyClick,
  onFavoriteClick,
}) => {
  const [newPrice, setNewPrice] = useState<number>(0);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [productName, setProductName] = useState<string>('');
  const [classNameImg, setClassNameImg] = useState<string>(styles.imageWrapper);
  const [addToFavorite, setAddToFavorite] = useState<boolean>(false);
  const [following, setFollowing] = useState(FollowinIcon);

  useEffect(() => {
    setNewPrice(
      product.basePrice + product.basePrice * (product.attributes[attrInd].priceDeviation / 100)
    );
    setProductName(locale === 'uk-UA' ? product.productNameUa : product.productNameEn);
    setIsAvailable(product.attributes[attrInd].quantity > 0 ? true : false);
    setClassNameImg(
      isAvailable
        ? variant === 'big'
          ? `${styles.imageWrapper} ${styles.big}`
          : variant === 'small'
            ? `${styles.imageWrapper} ${styles.small}`
            : `${styles.imageWrapper}`
        : variant === 'big'
          ? `${styles.imageWrapper} ${styles.big} ${styles.outStock}`
          : variant === 'small'
            ? `${styles.imageWrapper} ${styles.small} ${styles.outStock}`
            : `${styles.imageWrapper} ${styles.outStock}`
    );

    if (addToFavorite && isLogged) {
      setFollowing(FollowingFill);
    } else setFollowing(FollowinIcon);
  }, [product, locale, addToFavorite, isAvailable, variant, isLogged]);

  const handleAddToFavorite: (event: any) => void = () => {
    setAddToFavorite(!addToFavorite);
    onFavoriteClick(product.productId, !addToFavorite);
  };

  return (
    <section
      className={
        variant === 'big'
          ? `${styles.cardWrapper} ${styles.big}`
          : variant === 'small'
            ? `${styles.cardWrapper} ${styles.small}`
            : `${styles.cardWrapper}`
      } /* onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} */
    >
      <div className={classNameImg}>
        {addToFavorite && !isLogged && (
          <div
            className={
              variant === 'big'
                ? `${styles.addToFavorite} ${styles.big}`
                : `${styles.addToFavorite}`
            }
          >
            {translation.card.addToFollowing}
          </div>
        )}
        <Image
          className={styles.productImage}
          src={product.contents[0].source}
          layout="fill"
          objectFit="contain"
          alt={productName}
        />
        <div
          className={
            variant === 'big'
              ? `${styles.specialWrapper} ${styles.big}`
              : `${styles.specialWrapper}`
          }
        >
          {!isAvailable && (
            <Image
              className={styles.saleOut}
              src={NotAvailable}
              alt="not available"
              width={105}
              height={49}
            />
          )}
          {product.basePrice > newPrice && (
            <div className={styles.sale}>{translation.card.sale}</div>
          )}
          {product.attributes[0].label && <div className={styles.new}>{translation.card.new}</div>}
        </div>
        <div onClick={handleAddToFavorite} className={styles.following}>
          <Image src={following} width={20} height={18} alt="following" />
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardInfo}>
          <h3
            className={
              variant === 'big' ? `${styles.productName} ${styles.big}` : `${styles.productName}`
            }
          >
            {productName}
          </h3>
          <div className={styles.rating}>
            <RatingStars averageRating={avgRating} />
            <ReviewCount reviewCount={countReviews} />
          </div>
          {product.basePrice !== newPrice ? (
            <div className={styles.price}>
              <div className={styles.oldPrice}>
                <span>{product.basePrice} ₴</span>
                <span
                  className={
                    variant === 'big' ? `${styles.deviation} ${styles.big}` : `${styles.deviation}`
                  }
                >
                  {product.attributes[attrInd].priceDeviation} %
                </span>
              </div>
              <div
                className={
                  variant === 'big' ? `${styles.newPrice} ${styles.big}` : `${styles.newPrice}`
                }
              >
                {newPrice} ₴
              </div>
            </div>
          ) : (
            <div
              className={
                variant === 'big' ? `${styles.newPrice} ${styles.big}` : `${styles.newPrice}`
              }
            >
              {product.basePrice} ₴
            </div>
          )}
        </div>
        <div
          className={
            variant === 'big' ? `${styles.available} ${styles.big}` : `${styles.available}`
          }
        >
          {isAvailable ? translation.card.available : translation.card.outOfStock}
        </div>
      </div>
      <div className={styles.buySection}>
        <Button
          onClick={() => onBuyClick(product.productId)}
          text={translation.card.buy}
          className={
            variant === 'big' ? `${styles.buyButton} ${styles.big}` : `${styles.buyButton}`
          }
          disabled={!isAvailable}
          icon={<Image src={Comercial} width={20} height={20} alt="Comercial" />}
        />
      </div>
    </section>
  );
};

export default Card;
