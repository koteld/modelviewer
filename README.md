# modelviewer
address - your address in the local network

Make security certificate with mkcert: https://github.com/FiloSottile/mkcert:

`mkcert install`

`mkcert address`

Run https server with certificates:
`http-server -S -C ./address.pem -K ./address-key.pem -a address -o index.html`
