import Card from '@/components/Card';
import { getProductById, getReviewsById } from '@/services/axios';
import React from 'react';
import { Locale } from '@/i18n-config';
import Container from '@/components/Container';
import RatingStars from '@/components/RatingStars';
//import QuantitySelector from '@/components/QuantitySelector/QuantitySelector';


async function Product({ params }: { params: { lang: Locale } }) {
  const product = await getProductById(1);

  const reviews = await getReviewsById(1);
  console.log(reviews)
  console.log('product: ', product);
  /* const onClick = (id: number) => { console.log(id) } */

  return <>
    <Container>
      <Card product={product?.data} locale={params.lang} /* onBuyClick={onClick} */ />
      {/* <QuantitySelector onChange={handleChanged} quantity={product?.data.attributes[0].quantity} /> */}
      <RatingStars averageRating={4.5} variant='big' />
    </Container>
  </>;
}

export default Product;