import Card from '@/components/Card';
import { getProductById } from '@/services/axios';
import React from 'react';
import { Locale } from '@/i18n-config';
import Container from '@/components/Container';
//import QuantitySelector from '@/components/QuantitySelector/QuantitySelector';


async function Product({ params }: { params: { lang: Locale } }) {
  const product = await getProductById(1);
  console.log('product: ', product);
  /* const onClick = (id: number) => { console.log(id) } */

  return <>
    <Container>
      <Card product={product?.data} locale={params.lang} /* onBuyClick={onClick} */ />
      {/* <QuantitySelector onChange={handleChanged} quantity={product?.data.attributes[0].quantity} /> */}
    </Container>
  </>;
}

export default Product;