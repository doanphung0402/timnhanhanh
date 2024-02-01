import React, { memo, useEffect, useState } from "react";
import { Select, InputReadOnly, InputForm } from "../components";
import {
  apiGetPublicProvinces,
  apiGetPublicDistrict,
  apiGetPublicWard,
} from "../services";
import { useSelector } from "react-redux";

const Address = ({ setPayload, invalidFields, setInvalidFields }) => {
  const { dataEdit } = useSelector((state) => state.post);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);


  const [street, setStreet] = useState("");
  const [numberHouse, setNumberHouse] = useState("");
  const [province, setProvince] = useState(" ");
  const [district, setDistrict] = useState(" ");
  const [ward, setWard] = useState(" ");

  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (dataEdit) {
      let addressArr = dataEdit?.address?.split(",");
      let foundProvince =
        provinces?.length &&
        provinces?.find(
          (item) =>
            item.province_name === addressArr[addressArr?.length - 1]?.trim()
        );
      setProvince(foundProvince ? foundProvince.province_id : "");
    }
  }, [provinces, dataEdit]);

  useEffect(() => {
    if (dataEdit) {
      let addressArr = dataEdit?.address?.split(",");
      let foundDistrict =
        districts?.length > 0 &&
        districts?.find(
          (item) =>
            item.district_name === addressArr[addressArr.length - 2]?.trim()
        );
      setDistrict(foundDistrict ? foundDistrict.district_id : "");
    }
  }, [districts, dataEdit]);

  useEffect(() => {
    if (dataEdit) {
      let addressArr = dataEdit?.address?.split(",");
      let foundWard =
        wards?.length > 0 &&
        wards?.find(
          (item) => item.ward_name === addressArr[addressArr.length - 3]?.trim()
        );
      setWard(foundWard ? foundWard.ward_id : "");
    }
  }, [wards, dataEdit]);

  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setProvinces(response?.data.results);
      }
    };
    fetchPublicProvince();
  }, []);

  useEffect(() => {
    setDistrict("");
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(province);
      if (response.status === 200) {
        setDistricts(response.data?.results);
      }
    };
    province && fetchPublicDistrict();
    !province ? setReset(true) : setReset(false);
    !province && setDistricts([]);
  }, [province]);

  useEffect(() => {
    setWard("");
    const fetchPublicWard = async () => {
      const response = await apiGetPublicWard(district);
      if (response.status === 200) {
        setWards(response?.data.results);
      }
    };
    district && fetchPublicWard();
    !district && setWards([]);
  }, [district]);

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      address: `${numberHouse?`Số ${numberHouse},`:''} ${street?`Đường ${street},`:''} ${
        ward
          ? `${
            wards?.find((item) => item.ward_id === ward)
                ?.ward_name
            },`
          : ""
      }  ${
        district
          ? `${
              districts?.find((item) => item.district_id === district)
                ?.district_name
            },`
          : ""
      }${
        province
          ? provinces?.find((item) => item.province_id === province)
              ?.province_name
          : ""
      }`,
      province: province
        ? provinces?.find((item) => item.province_id === province)
            ?.province_name
        : "",
      district : district, 
      ward : ward, 
      numberHouse : numberHouse, 
      street : street 
    }));
  }, [province, district,numberHouse,street]);
  return (
    <div>
      <h2 className="font-semibold text-xl py-4">Địa chỉ cho thuê</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Select
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            type="province"
            value={province}
            setValue={setProvince}
            options={provinces}
            label="Tỉnh/Thành phố"
          />
          <Select
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            reset={reset}
            type="district"
            value={district}
            setValue={setDistrict}
            options={districts}
            label="Quận/Huyện"
          />
          <Select
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            reset={reset}
            type="ward"
            value={ward}
            setValue={setWard}
            options={wards}
            label="Phường/Xã"
          />
        </div>
        <div className="flex  gap-4">
          <div className="w-full">
            <label for="street_name" class="block mb-2 font-medium	">
              Tên đường
            </label>
            <input
              type="text"
              id="street_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               focus:ring-blue-500 focus:border-blue-500 block
               p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
               dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
               onChange={e=>setStreet(e.target.value)}
              required
            />
            {invalidFields?.some((i) => i.name === "street") && (
              <small className="text-red-500 italic">
                {invalidFields.find((i) => i.name === "street")?.message}
              </small>
            )}
          </div>
          <div className="w-full">
            <label for="number_house" class="block mb-2 font-medium	">
              Số nhà
            </label>
            <input
              type="text"
              id="number_house"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               focus:ring-blue-500 focus:border-blue-500 block
               p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
               dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
               onChange={e=>setNumberHouse(e.target.value)}
            />
             {invalidFields?.some((i) => i.name === "numberHouse") && (
              <small className="text-red-500 italic">
                {invalidFields.find((i) => i.name === "numberHouse")?.message}
              </small>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4"></div>
        <InputReadOnly
          label="Địa chỉ chính xác"
          value={`${numberHouse?`Số ${numberHouse},`:''} ${street?`Đường ${street},`:''} ${
            ward
              ? `${
                wards?.find((item) => item.ward_id === ward)
                    ?.ward_name
                }, `
              : ""
          }  ${
            district
              ? `${
                  districts?.find((item) => item.district_id === district)
                    ?.district_name
                }, `
              : ""
          }${
            province
              ? provinces?.find((item) => item.province_id === province)
                  ?.province_name
              : ""
          }`}
        />
      </div>
    </div>
  );
};

export default memo(Address);
