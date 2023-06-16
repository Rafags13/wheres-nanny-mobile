import * as yup from 'yup';
import { REGEX_BIRTHDAY_DATE, REGEX_CELLPHONE, REGEX_CEP, REGEX_CPF } from './contants';

export const registerValidationSchema = yup.object().shape({
    fullname: yup.string().required("O Nome é obrigatório."),
    username: yup.string().required("O Apelido é obrigatório."),
    email: yup.string().required("o E-mail é obrigatório.").email("Informe um E-mail válido."),
    cellphone: yup.string().required("O Telefone é obrigatório.").matches(REGEX_CELLPHONE, 'Informe um Telefone válido.'),
    cpf: yup.string().required('o CPF é obrigatório.').matches(REGEX_CPF, 'Informe um CPF válido.'),
    birthdayDate: yup.string().required('a Data de Nascimento é obrigatória.').matches(REGEX_BIRTHDAY_DATE, 'Informe uma Data de Nascimento válida.'),
    cep: yup.string().required('o CEP é obrigatório.').matches(REGEX_CEP, 'Informe um CEP válido.'),
    password: yup.string().required('a Senha é obrigatória'),
    repeatPassword: yup.string().required('é necessário repetir a Senha').oneOf([yup.ref('password')], 'as Senhas não conferem.'),
    photo: yup.string().required('é necessário selecionar uma foto para seu perfil.'),
})


export const registerValidationSchemaNanny =
    registerValidationSchema.shape({
        proofOfAddress: yup.string().required('é necessário que você insira o seu comprovante de residência.'),
        criminalRecord: yup.string().required('é necessário que você insira os seus antecedentes criminais.'),
        servicePrice: yup.string().required('é necessário informar um preço para o seu serviço.'),
    })

export const updatePersonValidationSchema = yup.object().shape({
    fullname: yup.string().required("O Nome é obrigatório."),
    cpf: yup.string().required("O CPF é obrigatório").matches(REGEX_CPF, 'Informe um CPF válido.'),
    email: yup.string().required("o E-mail é obrigatório.").email("Informe um E-mail válido."),
    cellphone: yup.string().required("O Telefone é obrigatório.").matches(REGEX_CELLPHONE, 'Informe um Telefone válido.'),
    cep: yup.string().required('o CEP é obrigatório.').matches(REGEX_CEP, 'Informe um CEP válido.'),
});
