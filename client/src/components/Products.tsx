import { Fragment, useState } from "react";
import { useProduct, useProducts } from "../services/queries";

const Products = () => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const productsQuery = useProducts();
  const productQuery = useProduct(selectedProductId);
  return (
    <div>
      {productsQuery.data?.pages.map((group, index) => (
        <Fragment key={index}>
          {group.map((product) => (
            <Fragment key={product.id}>
              <button onClick={() => setSelectedProductId(product.id)}>
                {product.name}
              </button>
              <br />
            </Fragment>
          ))}
        </Fragment>
      ))}
      <br />
      <div>
        <button
          onClick={() => productsQuery.fetchNextPage()}
          disabled={
            !productsQuery.hasNextPage || productsQuery.isFetchingNextPage
          }
        >
          {productsQuery.isFetchingNextPage
            ? "loading more..."
            : productsQuery.hasNextPage
            ? "load more"
            : "Nothing more to load"}
        </button>
      </div>
      <div>Selected Product : </div>
      {JSON.stringify(productQuery.data)}
    </div>
  );
};

export default Products;
