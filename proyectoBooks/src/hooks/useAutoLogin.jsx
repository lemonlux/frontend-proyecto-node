import { Navigate } from "react-router-dom";
import { autoLoginUser } from "../services/user.service";

export const useAutoLogin = async (allUser, userLogin) => {
  console.log('entro en el autologin')
  try {
    const { password, userEmail } = allUser?.data?.user;
    const customFormData = {
      userEmail,
      password,
    };

    const sendData = await autoLoginUser(customFormData);

    if (sendData?.status == 200) {
      console.log('200', sendData)
      // const { userName, userEmail, image, check } = sendData?.data?.user;
      const userCustom = {
        token: sendData.data.token,
        user: sendData.data.user.userName,
        gender: sendData.data.user.gender,
        email: sendData.data.user.userEmail,
        image: sendData.data.user.image,
        check: sendData.data.user.check,
        _id: sendData.data.user._id,
        favBooks: sendData.data.user.favBooks,
      };

      const stringUser = JSON.stringify(userCustom);
      userLogin(stringUser);
      return <Navigate to="/dashboard" />;
    } else {
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.log(error);
  }
};
