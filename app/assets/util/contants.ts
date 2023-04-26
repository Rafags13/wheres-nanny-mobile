export const TERMS_SECTION = {
    title: 'Termos',
    data: [
        {
            label: 'checkbox',
            content: 'Confirmo em oferecer todos os dados acima e me comprometo, em caso de problemas judiciais, em concedê-los.'
        }
    ]
}

export const USER_DATA_SECTION =
{
    title: 'Dados Pessoais',
    data: [
        {
            label: 'name',
            displayNameLabel: 'Nome'
        },
        {
            label: 'cpf',
            displayNameLabel: 'CPF'
        },
        {
            label: 'birthdayDate',
            displayNameLabel: 'Data de Nascimento'
        },
        {
            label: 'password',
            displayNameLabel: 'Senha'
        },
        {
            label: 'repeatPassword',
            displayNameLabel: 'Digite a Senha Novamente'
        },
    ],
}

export const COMMON_USER_SECTION = [
    {
        ...USER_DATA_SECTION
    }, {
        ...TERMS_SECTION
    }
]

export const NANNY_SECTIONS = [
    {
        ...USER_DATA_SECTION
    }, {
        title: 'Endereço',
        data: [
            {
                label: 'cep',
                displayNameLabel: 'CEP'
            },
            {
                label: 'city',
                displayNameLabel: 'Cidade'
            },
            {
                label: 'state',
                displayNameLabel: 'Estado'
            },
            {
                label: 'neighborhood',
                displayNameLabel: 'Bairro'
            },
            {
                label: 'street',
                displayNameLabel: 'Rua'
            },
            {
                label: 'number',
                displayNameLabel: 'Número'
            },
            {
                label: 'complement',
                displayNameLabel: 'Complemento'
            }
        ]
    },
    {
        ...TERMS_SECTION
    }
]