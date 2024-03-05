import React from "react";
import { useTranslations } from "use-intl";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Car } from "../../types";

// carSchema can be undefined

export default function CarView({
  selectedCar,
}: {
  selectedCar: Car | undefined;
}) {
  const t = useTranslations("Car");
  if (!selectedCar) {
    return <div>{t("no_car_yet")}</div>;
  }
  return (
    <div className="h-full w-full overflow-auto border-l shadow">
      <p className="text-center font-bold">{t("car_info")}</p>
      <div className="  grid  w-full gap-2  p-2 md:grid-cols-2">
        <div className=" border p-2 shadow-md">
          <Label className="font-light">{t("chassis_number")}</Label>
          <Input disabled value={selectedCar.chassis_number} />
        </div>
        <div className=" border p-2 shadow-md">
          <Label className="font-light">{t("brand")}</Label>
          <Input disabled value={selectedCar.brand} />
        </div>
        <div className=" border p-2 shadow-md">
          <Label className="font-light">{t("model")}</Label>
          <Input disabled value={selectedCar.model} />
        </div>
        <div className=" border p-2 shadow-md">
          <Label className="font-light">{t("car_type")}</Label>
          <Input disabled value={selectedCar.car_type} />
        </div>
        <div className=" border p-2 shadow-md">
          <Label className="font-light">{t("transmission")}</Label>
          <Input
            disabled
            value={new Date(
              selectedCar.first_registration,
            ).toLocaleDateString()}
          />
        </div>
        <div className=" border p-2 shadow-md">
          <Label className="font-light">{t("mileage")}</Label>
          <Input disabled value={selectedCar.mileage.toString()} />
        </div>
        <div className=" border p-2 shadow-md">
          <Label className="font-light">{t("engine_power")}</Label>
          <Input disabled value={selectedCar.engine_power.toString()} />
        </div>
        <div className=" border p-2 shadow-md">
          <Label className="font-light">{t("cylinder")}</Label>
          <Input disabled value={selectedCar.cylinder.toString()} />
        </div>
        <div className=" border p-2 shadow-md">
          <Label className="font-light">{t("fuel")}</Label>
          <Input disabled value={selectedCar.fuel.toString()} />
        </div>
        <div className=" border p-2 shadow-md">
          <Label className="font-light">{t("co2")}</Label>
          <Input disabled value={selectedCar.co2.toString()} />
        </div>
        <div className=" border p-2 shadow-md">
          <Label className="font-light">{t("color")}</Label>
          <Input disabled value={selectedCar.color} />
        </div>
        <div className=" border p-2 shadow-md">
          <Label className="font-light">{t("number_keys")}</Label>
          <Input disabled value={selectedCar.number_keys.toString()} />
        </div>
        <div className=" border p-2 shadow-md">
          <Label className="font-light">{t("cer_of_conf")}</Label>
          <Input disabled value={selectedCar.cer_of_conf.toString()} />
        </div>
        <div className=" border p-2 shadow-md">
          <Label className="font-light">{t("inspection_form")}</Label>
          <Input disabled value={selectedCar.inspection_form.toString()} />
        </div>
        <div className=" border p-2 shadow-md">
          <Label className="font-light">{t("car_pass")}</Label>
          <Input disabled value={selectedCar.car_pass.toString()} />
        </div>
        <div className=" border p-2 shadow-md">
          <Label className="font-light">{t("register_cert")}</Label>
          <Input disabled value={selectedCar.register_cert.toString()} />
        </div>
      </div>
    </div>
  );
}
