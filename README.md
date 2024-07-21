# backend-candra-saputra

## Description
Backend markerplace sederhana merupakan sebuah platform yang menghubungkan merchant dengan customer untuk memperluas jangkauan bisnis dan meningkatkan jumlah transaksi.

## Tech
- NodeJs
- TypeScript
- ExpressJs
- Posgress
- TypeOrm
- Docker
- Docker compose

## Postman Collection
1. Buka postman
2. import marketplace.postman_collection.json

## How to run locally
Ada beberapa cara untuk menjalankan backend ini di local

### Cara 1: Docker compose
1. Install docker (refrensi: https://www.docker.com/)
2. Jalankan ```npm install```
3. Ubah nama .env-example menjadi .env
4. Jalankan `docker compose up -d --build`
5. Done endpoint `http://localhost:8081`

### Cara 2: Npm run start:dev
1. Jalankan ```npm install```
2. Ubah nama .env-example menjadi .env
3. Sesuaikan .env dengan cridentials DB kamu
4. npm install
6. Jalankan `npm run migration:run`
5. npm run start:dev

### Cara 3: VSCode debugger
1. Jalankan ```npm install```
2. Ubah nama .env-example menjadi .env
3. Sesuaikan .env dengan cridentials DB kamu
4. npm install
5. Jalankan `npm run migration:run`
6. Buka tab run and debug di vscode
7. Pilih debug server
8. Klik Run

### Seeding data
Pastikan sudah menjalankan langkah - langkah How to run locally
```
npm run seed
```

## DB Schema
![Image DB Schema](/db.png)

## How to deploy
Ada banyak cara untuk mendeploy aplikasi ini.
Berikut contoh jika menggunakan digitalocean.

## App platform
1. Pilih sumber code. e.g: github, next
2. Digitalocean akan mendetksi docker file secara otomatis, next
3. Setup Variables
4. Pilih region
5. Create resource
6. Done

## Deploy menggunakan docker compose
Cukup ikuti langkah langkah ini
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-22-04

## Hak akses
| #                          | MERCHANT | CUSTOMER |
|----------------------------|----------|----------|
| GET /api/v1/products       | x        | x        |
| POST /api/v1/products      | x        |          |
| DELETE /api/v1/products    | x        |          |
| GET /api/v1/transactions   | x        |          |
| POST /api/v1/transactions  | x        | x        |

## Assumtions
- Hanya user yang sudah login yang bisa membeli produk
- Auth endpoint hanya digunakan untuk menggenerate token
- Tidak mendukung payment flow
- Soft delete product
- Ongkir 50.0000 hardcode untuk semua transaksi