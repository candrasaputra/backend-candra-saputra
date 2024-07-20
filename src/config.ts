/* eslint no-process-env: "off" */

// NOTE: All env vars from process.env are imported as STRINGS. It is important to keep this in mind and cast your env vars as needed.

export const NODE_ENV = process.env.NODE_ENV || 'test';
export const SERVICE_NAME = process.env.SERVICE_NAME || 'marketplace-backend';
export const PORT = process.env.PORT || '8081';

export const IS_PRODUCTION = NODE_ENV === 'production';
export const IS_TEST = NODE_ENV === 'test';

// Envvars for default database connection
export const PGDATABASE = process.env.PGDATABASE || 'test';
export const PGHOST = process.env.PGHOST || 'localhost';
export const PGPORT = Number(process.env.PGPORT) || 54320;
export const PGUSER = process.env.PGUSER || 'test';
export const PGPASSWORD = process.env.PGPASSWORD || 'test';

// Envvars for read replica database connection; defaults to default db connection
export const PGROHOST = process.env.PGROHOST || PGHOST;
export const PGROPORT = Number(process.env.PGROPORT) || PGPORT;
export const PGROUSER = process.env.PGROUSER || PGUSER;
export const PGROPASSWORD = process.env.PGROPASSWORD || PGPASSWORD;

export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
