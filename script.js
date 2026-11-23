const formMov = document.getElementById('formMov');
const listaMov = document.getElementById('listaMov');

let movimentacoes = [];


formMov.addEventListener('submit', (evento)=> { // CHAMA O BOTAO PARA ADICIONAR A MOVIMENTAÇÃO //

    evento.preventDefault(); // IMPEDE QUE A PAGINA RECARREGUE //

    const nomeMov = document.getElementById('nomeMov');
    const valorMov = document.getElementById('valorMov');
    const categMov = document.querySelector('div[name=""]');
    const tipoMov = document.querySelector('input[name="tipos"]:checked');

    const movimentacao = {
        id: Date.now(),
        nome: String(nomeMov.value),
        valor: Number(valorMov.value).toLocaleString('pt-br', {style:'currency',currency:'BRL'}),
        tipo: String(tipoMov.value),
        categoria: categMov,
        data: new Date().toLocaleDateString("pt-BR")
    };

    nomeMov.value = '';
    valorMov.value = '';

    movimentacoes.push(movimentacao);
    salvarMov();
    carregarMov()
});

function salvarMov(){
    localStorage.setItem('movimentacoes', JSON.stringify(movimentacoes));
    console.log('Movimentação salva com sucesso...');
};

function carregarMov(){
    const movSalvo = localStorage.getItem('movimentacoes');

    if(movSalvo){
        movimentacoes = JSON.parse(movSalvo);
    }else{
        movimentacoes = [];
    }

    console.log(movimentacoes);
    mostrarMov();
};

function mostrarMov(){
    listaMov.innerHTML = ' ';
    
    movimentacoes.forEach(mov => {

        if(mov.tipo == 'receita'){
            listaMov.innerHTML += `
                    <li onclick="maisInfo()" >
                        <div class="bloco-lista" >
                            <div class="bloco" >
                                <div class="indicador-bom" ><i class="fa-solid fa-circle-up"></i> </div> <p>${mov.nome}</p> 
                            </div> 
                            <p> ${mov.data} </p>
                            <p>+ ${mov.valor}</p>
                            <button onclick="verMais(${mov.id})" ><i class="fa-solid fa-bars"></i></button>
                        </div>

                        <div class="bloco-saibaMais" id="${mov.id}" >
                            <button onclick="excluirMov(${mov.id})" >Excluir</button>
                        </div>
                    </li>
            `;

        }else if(mov.tipo == 'despesa'){
            listaMov.innerHTML += `
                    <li onclick="maisInfo()">
                        <div class="bloco-lista" >
                            <div class="bloco" >
                                <div class="indicador-ruim" ><i class="fa-solid fa-circle-down"></i> </div> <p> ${mov.nome} </p> 
                            </div> 
                            <p> ${mov.data} </p>
                            <p>- ${mov.valor} </p>
                            <button onclick="verMais(${mov.id})" ><i class="fa-solid fa-bars"></i></button>
                        </div>

                        <div class="bloco-saibaMais" id="${mov.id}" >
                            <button onclick="excluirMov(${mov.id})" >Excluir</button>
                        </div>
                    </li>            
            `;

        }else{
            console.log('error...');
        }
    });
};

function excluirMov(idMov){
    movimentacoes = movimentacoes.filter(mov => mov.id !== idMov);
    salvarMov();
    carregarMov();
    console.log('Movimentação excluida com sucesso...');
};

function verMais(idDiv){
    const divMais = document.getElementById(idDiv);

    if(divMais.style.display == 'flex'){
        divMais.style.display = 'none';

    }else{
        divMais.style.display = 'flex';
    };
};

const saldoTotal = movimentacoes.reduce()

carregarMov();