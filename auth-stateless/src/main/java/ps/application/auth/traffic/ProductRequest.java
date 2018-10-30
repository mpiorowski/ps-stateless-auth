package ps.application.auth.traffic;

import ps.application.auth.dao.Product;

import javax.validation.Valid;
import java.util.List;

public class ProductRequest {

  @Valid
  private List<Product> products;

  public List<Product> getProducts() {
    return products;
  }

  public void setProducts(List<Product> products) {
    this.products = products;
  }
}
