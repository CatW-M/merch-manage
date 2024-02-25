const storeDataForm = document.querySelector(".form-store-data");

const updateStores = async (data, type) => {
  try {
    const url =
      type === "store"
        ? `http://127.0.0.1:8000/api/v1/stores/${data.storeId}`
        : "http://127.0.0.1:8000/api/v1/projects/65cae03ee58277c6a440d81e";

    const res = await axios({
      method: "PATCH",
      url,
      data,
    });
    if (res.data.status === "success") {
      showAlert("success", `${type.toUpperCase()} updated successfully`);
    }
  } catch (err) {
    showAlert("error", `============> ${err}`);
  }
};

if (storeDataForm)
  storeDataForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const storeId = document.getElementById("id").value;
    const totalDoors = document.getElementById("total-doors").value;
    const nonAlcoholDoors = document.getElementById("na-doors").value;
    const phoneNumber = document.getElementById("phone-number").value;
    const glideType = document.getElementById("glide-type").value;
    const glideDimensions = document.getElementById("glide-dimensions").value;
    const locationLong = document.getElementById("location-long").value;
    const locationLat = document.getElementById("location-lat").value;
    await updateStores(
      {
        storeId,
        totalDoors,
        nonAlcoholDoors,
        phoneNumber,
        glideType,
        glideDimensions,
        $set: { "location.coordinates.0": locationLong },
        $set: { "location.coordinates.1": locationLat },
      },
      "store",
    );
  });
