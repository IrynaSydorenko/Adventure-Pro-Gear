import Card from '@/components/Card';
import { getProductById } from '@/services/axios';
import React from 'react';
import { Locale } from '@/i18n-config';
import Container from '@/components/Container';


async function Product({ params }: { params: { lang: Locale } }) {
  const product = await getProductById(4);
  console.log('product: ', product);
  return <>
    <Container>
      <Card product={product?.data} locale={params.lang} />
    </Container>
  </>;
}

export default Product;