export const REGEX_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const REGEX_CELLPHONE = /^\((?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;
export const REGEX_CPF = /[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/;
export const REGEX_BIRTHDAY_DATE = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
export const REGEX_CEP = /^([\d]{2})\.?([\d]{3})\-([\d]{3})/;

export const TERMS_SECTION = {
    title: 'Termos',
    data: [
        {
            label: 'checkbox',
            content: 'Confirmo em oferecer todos os dados acima e me comprometo, em caso de causas judiciais, em concedê-los.'
        }
    ]
}

export const USER_DATA_SECTION =
{
    title: 'Dados Pessoais',
    data: [
        {
            label: 'fullname',
            displayNameLabel: 'Nome Completo',
        },
        {
            label: 'username',
            displayNameLabel: 'Apelido (Nome de usuário)',
        },
        {
            label: 'email',
            displayNameLabel: 'E-mail',
            placeholder: 'name@provider.com'

        },
        {
            label: 'cellphone',
            displayNameLabel: 'Telefone',
            placeholder: '(00) 00000-0000'
        },
        {
            label: 'cpf',
            displayNameLabel: 'CPF',
            placeholder: '000.000.000-00',
        },
        {
            label: 'birthdayDate',
            displayNameLabel: 'Data de Nascimento',
            placeholder: '00/00/0000',
        },
        {
            label: 'password',
            displayNameLabel: 'Senha',
            isPasswordInput: true,
        },
        {
            label: 'repeatPassword',
            displayNameLabel: 'Digite a Senha Novamente',
            isPasswordInput: true,
        },
    ],
}

export const ADDRESS_DATA_SECTION = {
    title: 'Endereço',
    data: [
        {
            label: 'cep',
            displayNameLabel: 'CEP',
        },
    ]
}

export const PHOTO_SECTION = {
    title: 'Foto Pessoal',
    data: [
        {
            label: 'photo'
        }
    ]
}

export const DOCUMENT_SECTION = {
    title: 'Documento',
    data: [
        {
            label: 'document',
            documentIdentifier: 'proofOfAddress',
            typeOfDocument: 'Comprovante de residência',
        },
        {
            label: 'document',
            documentIdentifier: 'criminalRecord',
            typeOfDocument: 'Antecedentes criminais',
        }
    ]
}

export const SALARY_FOR_SERVICE_SECTION = {
    title: 'Serviço',
    data: [
        {
            label: 'servicePrice',
            displayNameLabel: 'Preço por serviço',
            placeholder: '0000,00',
        },
    ]
}

export const COMMON_USER_SECTION = [
    {
        ...USER_DATA_SECTION
    }, {
        ...ADDRESS_DATA_SECTION
    },
    {
        ...PHOTO_SECTION
    },
    {
        ...TERMS_SECTION
    }
]

export const NANNY_SECTION = [
    {
        ...USER_DATA_SECTION
    }, {
        ...ADDRESS_DATA_SECTION
    },
    {
        ...PHOTO_SECTION
    },
    {
        ...DOCUMENT_SECTION
    },
    {
        ...SALARY_FOR_SERVICE_SECTION
    },
    {
        ...TERMS_SECTION
    }
]