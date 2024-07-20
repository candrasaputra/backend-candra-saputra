# backend-candra-saputra

## Description

## Tech
- NodeJs
- TypeScript
- ExpressJs
- Posgress
- Docker
- Docker compose

## How to run locally

## How to run test

## DB Schema

## How to deploy

## How to run test

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
- Auth endpoint hanya digunakan untuk mengenrate token
- Tidak mendukung payment flow