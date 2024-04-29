 CREATE DATABASE hogwarts;

 CREATE TABLE bruxos (
 id SERIAL PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 idade INTEGER NOT NULL,
 casa VARCHAR(50) NOT NULL,
 habilidade VARCHAR(100) NOT NULL,
 sangue VARCHAR(50) NOT NULL
 );

    INSERT INTO bruxos (nome, idade, casa, habilidade, sangue) VALUES ('Thiago Ferreira', 25, 'grifinoria', 'wirngardium leviosa', 'trouxa');

 CREATE TABLE varinhas(
 id SERIAL PRIMARY KEY,
 material VARCHAR(100),
 tamanho DECIMAL NOT NULL,
 nucleo VARCHAR(100) NOT NULL,
 data_fab DATE NOT NULL
 );

INSERT INTO varinhas (material, tamanho, nucleo, data_fab) VALUES ('madeira fajuta', 30.56,'pelo de unicornio', 2024-04-29);