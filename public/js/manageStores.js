const searchInput = document.querySelector(".form-store-manage");

const updateStores = async (method, storeNumber) => {
  try {
    const url =
      type === "store"
        ? `http://127.0.0.1:8000/api/v1/stores?storeNumber=${searchInput}`
        : "http://127.0.0.1:8000/api/v1/projects/65cae03ee58277c6a440d81e";

    const res = await axios({
      method: "GET",
      url,
      data,
    });

    if (res.data.status === "success") {
      showAlert("success", `${type.toUpperCase()} found. Update below`);
    }
  } catch (err) {
    showAlert("error", `============> ${err}`);
  }
};

if (searchInput)
  searchInput.addEventListener("input", async (e) => {
    e.preventDefault();
   let value = e.target.value
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
