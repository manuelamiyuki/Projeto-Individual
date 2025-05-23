-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

create database CentralTalks;
use CentralTalks;


create table usuarios(
id int primary key auto_increment,
nome varchar (100),
userName varchar( 100),
email varchar(50),
senha varchar (50),
personagemFavorito varchar(50),
constraint chk_personagem_favorito check (personagemFavorito in('Chandler','Ross','Monica','Rachel','Joey','Phoebe'))
);


create table quiz(
id int primary key auto_increment,
tentativa int default 0,
qtd_perguntas int,
qtd_respostas_certas int,
qtd_respostas_erradas int,
fkUsuarios int,
foreign key (fkUsuarios) references usuarios(id)
);

