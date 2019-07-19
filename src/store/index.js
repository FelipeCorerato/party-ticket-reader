import { createStore } from 'redux';

const initialState = {
    dados: {
        nomeEvento: 'PD Party',
        valoresLidos: []
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADICIONAR_VALOR':
            return { 
                ...state, 
                valoresLidos: action.valoresLidos, 
            }
        case 'DELETAR_VALOR':
            return { 
                ...state, 
                valoresLidos: action.valoresLidos,
            }
        case 'REFRESH':
            return {
                ...state
            }
    }

    return state;
}

const store = createStore(reducer);

export default store;
