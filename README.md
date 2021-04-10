# Fashion Shop
Api Written in javascript, using nodejs, express to store products and manage the shopping cart. I'm using mongodb as a database.

## Models
Three models to data persistence
1. User. This model represents the users. This user is necessary to authenticate the access to administer products and cart (it allows add or remove products in the cart).
2. Product.  This model represents the products. 
3. Cart.  This model contains two schemas:  first is the definition of product_item {product_id, quantity} (qty is the quantity the products with product_id  are in the cart). second is the definition of cart that contains {username, items} (username is the owner of the cart and items is the array that contains the product_items in the cart)

## Controllers
There are five controllers to manage the business logic.

1. UserController. This controller only lists users.
2. AuthController. This controller has two methods to register and login users. It uses the JWT to create the token and maintain the session.
3. ProductController. This controller contains the methods to manage the products.  It allows to create, list, update, delete and get details of the products.  
4. CartController. This controller contains the methods to get details of the cart and update products in the cart. The method update receives three arguments: username is the cart's owner, product_id and qty. There are five cases:
    a. If qty < 0, there is an error.  quantity cannot be less than zero.
    b. If qty === 0, and the cart does not exists, there is an error.  quantity cannot be equals to zero.
    c. If qty === 0, and the cart exists, the product with product_id is removed from the cart.
    d. If qty > 0, and the cart exists, the product with product_id is updated in the cart.
    e. If qty > 0, and the cart not exists, the cart is created with this product and quantity.

5. CsvController.  This controller contains the methods to receive csv files to load products and users.

## Routes
There are four files to declare the routes to use the methods in controllers.  Routes to change data need authentication. 

