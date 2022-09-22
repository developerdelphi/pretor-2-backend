CREATE TABLE persona (
  persona_id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  kind CHAR(1) NOT NULL DEFAULT('F'),
  created_at TIMESTAMP NOT NULL DEFAULT(CURRENT_TIMESTAMP),
  deleted_at TIMESTAMP
);

CREATE TABLE address (
  address_id SERIAL,
  persona_id INTEGER,
  street VARCHAR(150) NOT NULL,
  number VARCHAR(20),
  complement VARCHAR(100),
  district VARCHAR(50),
  cep VARCHAR(10),
  city VARCHAR(100),
  uf CHAR(2),
  status VARCHAR(50),
  obs text,
  created_at TIMESTAMP NOT NULL DEFAULT(CURRENT_TIMESTAMP),
  deleted_at TIMESTAMP,
  PRIMARY KEY (address_id, persona_id),
  FOREIGN KEY (persona_id) REFERENCES persona (persona_id)
);

CREATE TABLE phone (
  phone_id SERIAL,
  persona_id INTEGER,
  number VARCHAR(150) NOT NULL,
  status VARCHAR(50) DEFAULT('active'),
  created_at TIMESTAMP NOT NULL DEFAULT(CURRENT_TIMESTAMP),
  deleted_at TIMESTAMP,
  PRIMARY KEY (phone_id, persona_id),
  FOREIGN KEY (persona_id) REFERENCES persona (persona_id)
);

CREATE TABLE document (
  document_id SERIAL,
  persona_id INTEGER,
  type VARCHAR(50) NOT NULL,
  identifier VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT('active'),
  created_at TIMESTAMP NOT NULL DEFAULT(CURRENT_TIMESTAMP),
  deleted_at TIMESTAMP,
  PRIMARY KEY (document_id, persona_id),
  FOREIGN KEY (persona_id) REFERENCES persona (persona_id)
);
