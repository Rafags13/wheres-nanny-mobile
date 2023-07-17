import { ProfileUpdateDataDto } from "@dtos/Person/ProfileUpdateDataDto";
import { UpdatePasswordDto } from "@dtos/User/UpdatePasswordDto";
import { getCurrentUser } from "@storage/index";
import { getData, updateData } from "@services/apiRequests";

export async function getProfileData() {
    const currentUser = getCurrentUser();

    return await getData(`Person/GetProfileInformation/${currentUser.id}`);
}

export async function updateProfile(updateDataProfile: ProfileUpdateDataDto) {
    return await updateData("Person/UpdatePersonData", updateDataProfile);
}

export async function updatePassword(updatePasswordDto: UpdatePasswordDto) {
    return await updateData('User/UpdatePassword', updatePasswordDto);
}