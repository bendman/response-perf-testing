# Performance Testing: Resource Loading

## Setup

1. clone this repo
2. `pnpm install` dependencies
3. generate secrets for SSL (http2 requires SSL)
    a. Ensure you have `openssl` installed
    b. Generate local certificates
        ```sh
        mkdir ssl &\
        cd ssl &\
        openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365 -nodes
        ```

## Running

1. `pnpm start`
2. go to https://127.0.0.1:3000/
    there are different routes for different `head` setups and response handling
