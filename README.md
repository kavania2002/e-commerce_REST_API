# e-commerce_REST_API
REST API for an e-commerce marketplace

To run the API, follow the given instructions

1. Clone the Repository in your local computer
    ```
    git clone https://github.com/kavania2002/e-commerce_REST_API.git
    ```

2. Move to the desired directory
    ```
    cd .\e-commerce_REST_API\
    ```

3. Install all the dependencies
    ```
    npm i
    ```

4. Start the server
    ```
    node index.js
    ```

You are good to go!

<b>NOTE:</b> You would need to create .env file and insert the following

```
MONGOUSER=<mongoDB user>
MONGOPASS=<mongoDB password>
SECRET=<secret message for express session>
```

Here the list of APIs that you can fetch:

    For Authentication of Buyer and Seller
        - POST /api/auth/register
        - POST /api/auth/login

    For Buyers
        - GET /api/buyer/list-of-sellers
        - GET /api/buyer/seller-catalog/:seller_id
        - POST /api/buyer/create-order/:seller_id
    
    For Seller
        - POST /api/seller/create-catalog
        - GET /api/seller/orders


Libraries Used:

- Mongoose : As mongoDb is the database
- Passport : For authentication purpose
- dotenv : To Store the API keys
- cors : To fetch API from trusted sources

## Future Ideas

- GET /auth/login to get user details
- Maybe user can like/dislike or give rating to a product
- Add more details in the product (such as images, ratings)
- If we move further, maybe it would be great to add a payment system

