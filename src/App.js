function App() {
  return (
    <div className="container">
      <div className="navbar-expand-lg">
        <div className="text-center">
          <h3>Shopping Cart</h3>
        </div>
      </div>

      <section>
        <h3>Products</h3>
        <ProductList />
      </section>

      <section>
        <h3>Cart</h3>
        <Cart />
      </section>

      <section>
        <h3>Wishlist</h3>
        <Wishlist />
      </section>
    </div>
  );
}
