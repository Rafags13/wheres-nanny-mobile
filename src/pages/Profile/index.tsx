import { CommonActions, useNavigation } from "@react-navigation/native";
import { FormProvider, useForm } from "react-hook-form";
import { Image, Text, View, } from "react-native";
import { Background } from "@components/Background";
import Button from "@components/Button";
import DefaultInput from "@components/Inputs/Default";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from "./style";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { viaCepRequestGetByCep } from "@services/apiRequests";
import { ProfileUpdateDataDto } from "@dtos/Person/ProfileUpdateDataDto";
import { ModalType, useModal } from "@context/ModalContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePasswordValidationSchema, updatePersonValidationSchema } from "@util/yupValidations";
import { formatCellphoneNumber, formatCpf, removeSpecialCharacter } from "@util/functions";
import Cep from "@components/Inputs/Cep";
import { UpdatePasswordDto } from "@dtos/User/UpdatePasswordDto";
import { getProfileData, updatePassword, updateProfile } from "@services/requests/PersonRequests";
import PasswordInput from "@components/Inputs/Password";
import { globalStyles } from "@styles/global.styles";
import useLoggedUser from "@hooks/useLoggedUser";
import Loader from "@components/Loader";
import { useLoading } from "@context/LoadingContext";
import { Skeleton } from "moti/skeleton";
import useFakeApiCallRequests from "@hooks/useFakeApiCallRequest";

function ProfileSkeleton() {
	return (
		<Skeleton.Group show={true}>
			<View style={{ gap: 15 }}>
				<Skeleton width={150} colorMode='light' colors={['rgb(222, 220, 220)', 'rgb(160, 160, 160)']} />

				<View style={{ gap: 5 }}>
					<Skeleton width={100} height={20} colorMode='light' colors={['rgb(222, 220, 220)', 'rgb(160, 160, 160)']} />
					<Skeleton width={'100%'} height={40} colorMode='light' colors={['rgb(222, 220, 220)', 'rgb(160, 160, 160)']} />
				</View>

				<View style={{ gap: 5 }}>
					<Skeleton width={50} height={20} colorMode='light' colors={['rgb(222, 220, 220)', 'rgb(160, 160, 160)']} />
					<Skeleton width={'100%'} height={40} colorMode='light' colors={['rgb(222, 220, 220)', 'rgb(160, 160, 160)']} />
				</View>

				<View style={{ gap: 5 }}>
					<Skeleton width={60} height={20} colorMode='light' colors={['rgb(222, 220, 220)', 'rgb(160, 160, 160)']} />
					<Skeleton width={'100%'} height={40} colorMode='light' colors={['rgb(222, 220, 220)', 'rgb(160, 160, 160)']} />
				</View>

				<View style={{ gap: 5, marginBottom: 15 }}>
					<Skeleton width={70} height={20} colorMode='light' colors={['rgb(222, 220, 220)', 'rgb(160, 160, 160)']} />
					<Skeleton width={'100%'} height={40} colorMode='light' colors={['rgb(222, 220, 220)', 'rgb(160, 160, 160)']} />
				</View>

				<Skeleton width={150} colorMode='light' colors={['rgb(222, 220, 220)', 'rgb(160, 160, 160)']} />

				<View style={{ gap: 5 }}>
					<Skeleton width={50} colorMode='light' colors={['rgb(222, 220, 220)', 'rgb(160, 160, 160)']} />
					<Skeleton width={'100%'} height={40} colorMode='light' colors={['rgb(222, 220, 220)', 'rgb(160, 160, 160)']} />
				</View>
			</View>
		</Skeleton.Group>
	)

}

export default function Profile() {
	const { currentUser, logout } = useLoggedUser();
	const navigation = useNavigation<any>();
	const scrollViewRef = useRef<any>(null);
	const [enabledFields, setEnabledFields] = useState<boolean>(false);
	const { setLoading } = useLoading();
	const { showModal } = useModal();
	const updatePasswordForm = useForm({ resolver: yupResolver(updatePasswordValidationSchema) });
	const { data, isLoading } = useQuery(['getProfileInformation', currentUser.id], async () => {
		const profileData = await createProfileModel();
		return profileData;
	});

	const updateProfileForm = useForm({ resolver: yupResolver(updatePersonValidationSchema) });

	async function createProfileModel() {
		const response = await getProfileData()
		const viacepResponse = await viaCepRequestGetByCep(currentUser.cep);
		const profileData = {
			...response.data,
			addressFromUpdateInformation: {
				cep: viacepResponse.data.cep,
				bairro: viacepResponse.data.bairro,
				cidade: viacepResponse.data.localidade,
				logradouro: viacepResponse.data.logradouro,
				estado: viacepResponse.data.uf
			},
		};

		return profileData;
	}

	async function updateInformations(data: any) {
		const updateDataProfile: ProfileUpdateDataDto = createUpdateProfileModel(data);
		setLoading(true)
		await updateProfile(updateDataProfile).then((response) => {
			setLoading(false)
			showModal({ modalType: ModalType.SUCCESS, message: response.data });
			setEnabledFields(false);
			scrollToTop();
		}).catch((error: Error) => {
			showModal({ modalType: ModalType.ERROR, message: error.message })
		});
	}

	function createUpdateProfileModel(data: any) {
		const updatedProfileModel: ProfileUpdateDataDto = {
			personInformation: {
				id: currentUser.id,
				fullname: data.fullname,
				cpf: removeSpecialCharacter(data.cpf),
				email: data.email,
				cellphone: removeSpecialCharacter(data.cellphone),
				imageBase64: ''
			},
			addressFromUpdateInformation: {
				cep: removeSpecialCharacter(data.cep),
				bairro: "",
				logradouro: "",
				cidade: "",
				estado: "",
				complement: "",
				number: ""
			}
		}

		return updatedProfileModel;
	}

	function onInvalid(data: any) {
		let message = [];
		for (const key in data) {
			message.push(data[key].message);
		}

		showModal({ modalType: ModalType.ERROR, message: message.join("\n") })
	}

	async function onPasswordUpdate(data: any) {
		var updatePasswordDto: UpdatePasswordDto = {
			userId: currentUser.id,
			oldPassword: data.oldPassword,
			newPassword: data.newPassword
		}

		await updatePassword(updatePasswordDto).then((response) => {
			showModal({ modalType: ModalType.SUCCESS, message: response.data });
			updatePasswordForm.setValue('oldPassword', '');
			updatePasswordForm.setValue('newPassword', '');
			updatePasswordForm.setValue('repeatNewPassword', '');
		}).catch((error) => {
			showModal({ modalType: ModalType.ERROR, message: error.response.data });
		})
	}

	function scrollToTop() {
		scrollViewRef.current.scrollTo({ y: 0, animated: true });
	}

	return (
		<Background.ScrollView
			scrollviewRef={scrollViewRef}
		>
			<Background.Header style={{ padding: 10, backgroundColor: '#F8FDFE' }}>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, }}>
					<Text style={styles.title}>Meu Perfil</Text>
					<Ionicons name="person-circle" size={32} color='#192553' />
				</View>
				<View style={styles.imageProfileContainer}>
					<Loader show={isLoading} radius="round" width={75} height={75}>
						<Image style={styles.nannyProfilePicture} source={{ uri: `data:image/png;base64,${data?.personInformation.imageBase64}` }} />
					</Loader>
				</View>
			</Background.Header>

			<FormProvider {...updateProfileForm}>
				<View style={{ padding: 15 }}>
					{isLoading ? (
						<ProfileSkeleton />
					) : (
						<>
							<Text style={styles.personalInformationsTitle}>Informações Pessoais</Text>

							<View style={styles.inputsContainer}>

								<DefaultInput
									defaultValue={data?.personInformation.fullname}
									hasError={updateProfileForm.formState.errors.fullname !== undefined}
									disabled={!enabledFields}
									name={"fullname"}
									control={updateProfileForm.control}
									label={
										<Text style={globalStyles.label}>
											Nome Completo
										</Text>
									}
								/>

								<DefaultInput
									defaultValue={formatCpf(data?.personInformation.cpf)}
									hasError={updateProfileForm.formState.errors.cpf !== undefined}
									disabled={!enabledFields}
									name={"cpf"}
									control={updateProfileForm.control}
									label={
										<Text style={globalStyles.label}>
											Cpf
										</Text>
									}
								/>

								<DefaultInput
									defaultValue={data?.personInformation.email}
									hasError={updateProfileForm.formState.errors.email !== undefined}
									disabled={!enabledFields}
									name={"email"}
									control={updateProfileForm.control}
									label={
										<Text style={globalStyles.label}>
											E-mail
										</Text>
									}
								/>

								<DefaultInput
									defaultValue={formatCellphoneNumber(data?.personInformation.cellphone)}
									hasError={updateProfileForm.formState.errors.cellphone !== undefined}
									disabled={!enabledFields}
									name={"cellphone"}
									control={updateProfileForm.control}
									label={
										<Text style={globalStyles.label}>
											Telefone
										</Text>
									}
								/>
							</View>

							<Text style={[styles.personalInformationsTitle, { marginTop: 20 }]}>Endereço</Text>

							<View style={styles.inputsContainer}>
								<Cep
									placeholder="00000-000"
									hasError={updateProfileForm.formState.errors.cep !== undefined}
									defaultValue={data?.addressFromUpdateInformation.cep}
									disabled={!enabledFields}
									label={"cep"}
									control={updateProfileForm.control}
									displayNameLabel="Cep"
								/>
								<DefaultInput
									defaultValue={data?.addressFromUpdateInformation.bairro}
									disabled
									name={"neighborhood"}
									control={updateProfileForm.control}
									label={
										<Text style={globalStyles.label}>
											Bairro
										</Text>
									}
								/>

								<DefaultInput
									defaultValue={data?.addressFromUpdateInformation.logradouro}
									disabled
									name={"publicPlace"}
									control={updateProfileForm.control}
									label={
										<Text style={globalStyles.label}>
											Logradouro
										</Text>
									}
								/>

								<DefaultInput
									defaultValue={data?.addressFromUpdateInformation.cidade}
									disabled
									name={"city"}
									control={updateProfileForm.control}
									label={
										<Text style={globalStyles.label}>
											Cidade
										</Text>
									}
								/>

								<DefaultInput
									defaultValue={data?.addressFromUpdateInformation.estado}
									disabled
									name={"state"}
									control={updateProfileForm.control}
									label={
										<Text style={globalStyles.label}>
											Estado
										</Text>
									}
								/>

								<DefaultInput
									defaultValue={data?.addressFromUpdateInformation.complement}
									disabled={!enabledFields}
									name={"complement"}
									control={updateProfileForm.control}
									label={
										<Text style={globalStyles.label}>
											Complemento
										</Text>
									}
								/>

								<DefaultInput
									defaultValue={data?.addressFromUpdateInformation.number}
									disabled={!enabledFields}
									name={"number"}
									control={updateProfileForm.control}
									label={
										<Text style={globalStyles.label}>
											Número
										</Text>
									}
								/>
							</View>

							{!enabledFields ? (
								<Button
									label={"Alterar"}
									onClick={() => {
										setEnabledFields(true);
										scrollToTop();
									}}
									containerStyle={{ marginTop: 20, marginVertical: 20 }}
									icon={
										<FontAwesome5 name="pen" size={16} color={'white'} />
									}
								/>
							) : (
								<View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
									<Button
										label={"Salvar"}
										onClick={updateProfileForm.handleSubmit(updateInformations, onInvalid)}
										containerStyle={{ backgroundColor: '#218838', width: '45%' }}
										icon={
											<FontAwesome name="check" size={16} color={'white'} />
										}
									/>
									<Button
										label={"Cancelar"}
										onClick={() => {
											showModal({
												modalType: ModalType.QUESTION,
												message: 'Deseja sair sem salvar as alterações?',
												function: (value: boolean) => { setEnabledFields(!value) }
											})

										}}
										containerStyle={{ backgroundColor: '#C82333', width: '45%' }}
										icon={
											<FontAwesome name="remove" size={16} color="white" />
										}
									/>
								</View>
							)}

							<View style={styles.inputsContainer}>

								<Text style={styles.personalInformationsTitle}>Alterar Senha</Text>

								<PasswordInput
									name={"oldPassword"}
									control={updatePasswordForm.control}
									label={
										<Text style={globalStyles.label}>
											Senha Atual
										</Text>
									}
								/>
								<PasswordInput
									name={"newPassword"}
									control={updatePasswordForm.control}
									label={
										<Text style={globalStyles.label}>
											Nova Senha
										</Text>
									}
								/>
								<PasswordInput
									name={"repeatNewPassword"}
									control={updatePasswordForm.control}
									label={
										<Text style={globalStyles.label}>
											Repetir Nova Senha
										</Text>
									}
								/>

								<Button label="Atualizar" onClick={updatePasswordForm.handleSubmit(onPasswordUpdate, onInvalid)} containerStyle={{ marginTop: 15 }} />

							</View>
							<Button
								label={"Sair"}
								onClick={() => {
									logout();
									navigation.dispatch(
										CommonActions.reset({
											index: 1,
											routes: [
												{ name: 'login' },
											],
										})
									);
								}}
								containerStyle={{ backgroundColor: '#C82333', marginVertical: 20 }}
								icon={
									<MaterialIcons name="logout" size={16} color="white" />
								}
							/>
						</>
					)}
				</View>
			</FormProvider>

		</Background.ScrollView>
	)
}