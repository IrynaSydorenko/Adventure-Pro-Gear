'use client'
import { Locale } from '@/i18n-config';
import Card from "../Card"

interface TempProps {
    product: any;
    locale: Locale;
    avgRating?: number;
    countReviews?: number;
    translation: {
        card: {
            addToFollowing: string;
            sale: string;
            new: string;
            available: string;
            outOfStock: string;
            buy: string;
        }
    };
}

const TempComponent: React.FC<TempProps> = ({ product, locale, avgRating = 0, countReviews = 0, translation }) => {
    const onClick = (id: number) => { console.log('productId', id) }
    const onFClick = (id: number, isFavorite: boolean) => { console.log('productId from favorite', id, isFavorite) }

    return <>
        <Card product={product} locale={locale} avgRating={avgRating} isLogged={true} translation={translation} countReviews={countReviews} onBuyClick={onClick} onFavoriteClick={onFClick} variant='big' />
    </>
}
export default TempComponent