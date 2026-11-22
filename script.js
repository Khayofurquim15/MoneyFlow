const formMov = document.getElementById('formMov');
const listaMov = document.getElementById('listaMov');
let movimentacoes = [];

formMov.addEventListener('submit', (evento)=> { // CHAMA O BOTAO PARA ADICIONAR A MOVIMENTAÇÃO //

    evento.preventDefault(); // IMPEDE QUE A PAGINA RECARREGUE //

    const nomeMov = document.getElementById('nomeMov');
    const valorMov = document.getElementById('valorMov');
    const categMov = document.getElementById('cateMov');
    const tipoMov = document.querySelector('input[name="tipos"]:checked');

    const movimentacao = {
        id: Date.now(),
        nome: String(nomeMov.value),
        valor: Number(valorMov.value),
        tipo: String(tipoMov.value),
        categoria: String(categMov.value),
        data: new Date().toLocaleDateString("pt-BR")
    };

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
                    <li>
                        <div class="bloco" >
                            <div class="indicador-bom" ><i class="fa-solid fa-circle-up"></i> </div> <p>${mov.nome}</p> 
                        </div> 
                        <p> ${mov.data} </p>
                        <p>+ ${mov.valor}</p>
                    </li>
            `;

        }else if(mov.tipo == 'despesa'){
            listaMov.innerHTML += `
                    <li>
                        <div class="bloco" >
                            <div class="indicador-ruim" ><i class="fa-solid fa-circle-down"></i> </div> <p> ${mov.nome} </p> 
                        </div> 
                        <p> ${mov.data} </p>
                        <p>- ${mov.valor} </p>
                    </li>            
            `;

        }else{
            console.log('error...');
        }
    });
};

carregarMov();