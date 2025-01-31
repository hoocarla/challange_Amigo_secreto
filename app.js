const friendsList = []; //Variável para armazenar a lista de amigos

const friendNameInput = document.querySelector("#amigo"); //Variável para pegar o input onde será digitado o nome

const divInput = document.querySelector(".input-wrapper"); //Variável que seleciona a div do input para criar um span logo após.

const spanAlert = document.createElement("span"); // Variável que cria uma tag span

const ulList = document.getElementById("listaAmigos"); // Variável para pegar a ul listaAmigos para exibir os nomes

const ulResult = document.getElementById("resultado");

/* 
    Como era algo que precisava acontecer mais de uma vez no código, pois o mesmo span serve para exibir o erro do input em branco ao adicionar amigo, e para avisar que todos os amigos já foram sorteados. Foi criada uma função para evitar repetição de código. 
*/ 
function showAlertMessage(message) {
	// Adiciona um texto ao span criado, passando como parâmetro o texto que achar necessário para alertar o usuário
	spanAlert.textContent = message;

	/* Cria uma classe "alertMessage" para estilização pelo arquivo style.css. 
        A título de ilustração, o Javascript cria algo como: 
        <span class="alertMessage"></span> para poder utilizar essa classe no arquivo CSS
    */
	spanAlert.classList.add("alertMessage");

	// Criar o span logo após a div que contém a caixa de texto
	divInput.after(spanAlert);
}

// Função para adicionar o amigo no Array/Lista com algumas validações
function adicionarAmigo() {
	// Condição -> se o campo estiver vazio:
	if (friendNameInput.value === "") {

        //Chama a função passando o texto desejado como parâmetro que será exibido no span. O parâmetro message recebe esse texto digitado
		showAlertMessage("Preencha o campo com o nome de um amigo!");

		// Condição -> caso não esteja vazio
	} else {
		// Pega o nome digitado pelo usuário utilizando .value e adiciona à lista usando .push
		friendsList.push(friendNameInput.value);

		// Limpa o span de alerta e o nome digitado para que não fiquem sendo exibidos na tela já que a condição foi cumprida.
		spanAlert.textContent = "";
		friendNameInput.value = "";

		// Limpa a lista antes de adicionar novos itens para que não fique repetindo os nomes toda vez que for atualizada (experimente retirar para ver como funcionaria)
		ulList.innerHTML = "";

		// forEach percorre cada elemento adicionado ao array/lista
		friendsList.forEach((friend) => {
			// Criação de uma tag li para receber um nome do array e ser adicionado à tag ul como elemento filho
			let liItem = document.createElement("li");

			// Conforme percorre a lista, cada elemento é atribuído à li através do textContent (também pode ser utilizado o innerHTML)
			liItem.textContent = friend;

			// Relaciona a tag li criada como um elemento filho da tag ul
			ulList.appendChild(liItem);
		});
	}
}

// Função para sortear um amigo
function sortearAmigo() {
	// Verifica se o array não está vazio através do .length (se for 0 é porque nenhum elemento foi adicionado)
	if (friendsList.length !== 0) {
		// Limpar a mensagem de alerta caso o array contenha elementos ao apertar o botão
		spanAlert.textContent = "";

		// O Math.random sorteia números apenas entre 0 e 1 (casas decimais), por isso precisa multiplicar pelo comprimento da lista, para dar um valor correspondente à quantidade de itens dentro dela (ainda em decimais).
		// Ao passo que o Math.floor arredonda o número para baixo, garantindo que o número seja inteiro e igual à um número dentro do limite de elementos da lista.
		const randomIndex = Math.floor(Math.random() * friendsList.length);

		// O randomIndex irá trazer o número inteiro, e para saber quem é o amigo sorteado, precisamos procurar esse número na lista. Por isso ele foi colocado dentro das [].
		// A título de exemplo seria algo como friendsList[2] -> o amigo que estiver no índice 2 foi o sorteado
		const sortedFriend = `${friendsList[randomIndex]} foi sorteado(a)`;

		// Adiciona o amigo sorteado ao texto da ul
		ulResult.textContent = sortedFriend;

		// Remove o amigo que já foi sorteado da lista com o método splice, utlizando o índice sorteado como parâmetro e passando 1 como argumento para remover um único item (teste sem o agumento 1 para ver como ele se comporta).
		friendsList.splice(randomIndex, 1);
	} else {
		// Adiciona um texto ao span quando todos os nomes forem sorteados, ou seja, quanto o length da lista chegar a 0.
		showAlertMessage(
			"Todos os amigos foram sorteados, adicione novos nomes para continuar!"
		);
	}
}
