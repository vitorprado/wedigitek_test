We:Digitek test
===============

Quero comentar um pouco sobre as escolhas feitas nesse teste.

Decidir por utilizar `react-query` + `axios` para facilitar a parte dos requests.
O `react-query` traz uma simplicidade na hora de cuidar do estado nas telas.

Achei o projeto muito pequeno para usar `redux`, dado que o unico ganho 
nesse caso seria o de persistir a store no disco e nao se preocupar com
manter o estado dos restaurantes favoritados. Mesmo assim acredito que
o `React Context API` resolve isso de uma forma simples e mais leve, por
isso preferi utilizar ele do que o `redux`.

Alem disso quero dizer que conheco e ja trabalhei com redux e entendo
os seus detalhes, como prova disso vou deixar aqui uma implementacao
minha que fiz do reduz utilizando apenas kotlin:
https://github.com/reduks/reduks

obs: tive que desativar o flipper porque estava dando erro, como nao tenho
uma maquina mac fiz funcionar no android, entao pode ser que no ios 
possa ter algum problema com o fillper.

obs2: nao me preocupei em deixar a arvore do git bonita e bem separada,
dado o tempo que tive pra fazer acabei fazer apenas um commit, mas isso
nao acontece no dia a dia.
