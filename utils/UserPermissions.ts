import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

class UserPermissions {
  getCameraPermission = async () => {
    const platform: any = Constants.platform;
    if (platform.ios || platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status != "granted") {
        // @ts-ignore
        alert("Permission to access camera roll is required to upload an image");
      }
    }
  };
}

export default new UserPermissions();
