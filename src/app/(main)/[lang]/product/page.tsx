import Card from '@/components/Card';
import { getAllReviews, getAverageRatingByProductId, getProductById, getReviewsById } from '@/services/axios';
import React from 'react';
import { Locale } from '@/i18n-config';
import Container from '@/components/Container';
import RatingStars from '@/components/RatingStars';
//import QuantitySelector from '@/components/QuantitySelector/QuantitySelector';


async function Product({ params }: { params: { lang: Locale } }) {
  const product = await getProductById(1);

  const rating = await getAverageRatingByProductId(3);
  console.log('rating', rating)
  const reviews = await getAllReviews(3)
  console.log('reviews', reviews)
  //console.log('product: ', product);
  /* const onClick = (id: number) => { console.log(id) } */

  return <>
    <Container>
      <Card product={product?.data} locale={params.lang} avgRating={rating?.data} countReviews={reviews?.data.length}/* onBuyClick={onClick} */ />
      {/* <QuantitySelector onChange={handleChanged} quantity={product?.data.attributes[0].quantity} /> */}
      <RatingStars averageRating={4.5} variant='big' />
    </Container>
  </>;
}

export default Product;