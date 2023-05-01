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
            label: 'fullname',
            displayNameLabel: 'Nome',
            rules: {
                required: {
                    value: true,
                    message: "O Nome é obrigatório",
                }
            }

        },
        {
            label: 'username',
            displayNameLabel: 'Apelido (Nome de usuário)',
            rules: {
                required: {
                    value: true,
                    message: "O Apelido é obrigatório",
                }
            }

        },
        {
            label: 'email',
            displayNameLabel: 'E-mail',
            rules: {
                required: {
                    value: true,
                    message: "O E-mail é obrigatório",
                }
            }

        },
        {
            label: 'cellphone',
            displayNameLabel: 'Telefone',
            rules: {
                required: {
                    value: true,
                    message: "O Telefone é obrigatório",
                }
            }

        },
        {
            label: 'cpf',
            displayNameLabel: 'CPF',
            rules: {
                required: {
                    value: true,
                    message: "O CPF é obrigatório",
                }
            }
        },
        {
            label: 'birthdayDate',
            displayNameLabel: 'Data de Nascimento',
            rules: {
                required: {
                    value: true,
                    message: "A Data de Nascimento é obrigatória",
                }
            }
        },
        {
            label: 'password',
            displayNameLabel: 'Senha',
            rules: {
                required: {
                    value: true,
                    message: "A Senha é obrigatória",
                }
            }
        },
        {
            label: 'repeatPassword',
            displayNameLabel: 'Digite a Senha Novamente',
            rules: {
                required: {
                    value: true,
                    message: "A senha é obrigatória",
                }
            }
        },
    ],
}

export const ADDRESS_DATA_SECTION = {
    title: 'Endereço',
    data: [
        {
            label: 'cep',
            displayNameLabel: 'CEP',
            rules: {
                required: {
                    value: true,
                    message: "O CEP é obrigatório",
                }
            }
        },
        {
            label: 'city',
            displayNameLabel: 'Cidade',
            rules: {
                required: {
                    value: false,
                    message: "",
                }
            }
        },
        {
            label: 'state',
            displayNameLabel: 'Estado',
            rules: {
                required: {
                    value: false,
                    message: "",
                }
            }
        },
        {
            label: 'neighborhood',
            displayNameLabel: 'Bairro',
            rules: {
                required: {
                    value: false,
                    message: "",
                }
            }
        },
        {
            label: 'street',
            displayNameLabel: 'Rua',
            rules: {
                required: {
                    value: false,
                    message: "",
                }
            }
        },
        {
            label: 'number',
            displayNameLabel: 'Número',
            rules: {
                required: {
                    value: false,
                    message: "",
                }
            }
        },
        {
            label: 'complement',
            displayNameLabel: 'Complemento',
            rules: {
                required: {
                    value: false,
                    message: "",
                }
            }
        }
    ]
}

export const COMMON_USER_SECTION = [
    {
        ...USER_DATA_SECTION
    }, {
        ...ADDRESS_DATA_SECTION
    },
    {
        ...TERMS_SECTION
    }
]

export const NANNY_SECTIONS = [
    {
        ...USER_DATA_SECTION
    }, {
        ...ADDRESS_DATA_SECTION
    },
    {
        ...TERMS_SECTION
    }
]