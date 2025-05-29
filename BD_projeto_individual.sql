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
data_quiz date,
foreign key (fkUsuarios) references usuarios(id)
);






drop database CentralTalks;