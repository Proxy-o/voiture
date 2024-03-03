import React from "react";
import { useTranslations } from "use-intl";
import { type z } from "zod";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { type createCarSchema } from "~/server/api/types";

// carSchema can be undefined
type carSchema = {
  id: bigint;
  chassis_number: string;
  brand: string;
  model: string;
  car_type: string;
  transmission: string;
  first_registration: Date;
  mileage: number;
  engine_power: number;
  cylinder: number;
  fuel: string;
  co2: string;
  color: string;
  number_keys: number;
  cer_of_conf: boolean;
  inspection_form: boolean;
  car_pass: boolean;
  register_cert: boolean;
};

export default function CarView({ car }: { car: carSchema | undefined }) {
  const t = useTranslations("Car");
  if (!car) {
    return <Card>{t("no_car")}</Card>;
  }
  return (
    <Card className="  grid  h-screen w-full gap-2 overflow-auto p-2 md:grid-cols-2">
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("chassis_number")}</Label>
        <Input disabled defaultValue={car.chassis_number} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("brand")}</Label>
        <Input disabled defaultValue={car.brand} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("model")}</Label>
        <Input disabled defaultValue={car.model} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("car_type")}</Label>
        <Input disabled defaultValue={car.car_type} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("transmission")}</Label>
        <Input
          disabled
          defaultValue={new Date(car.first_registration).toLocaleDateString()}
        />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("mileage")}</Label>
        <Input disabled defaultValue={car.mileage.toString()} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("engine_power")}</Label>
        <Input disabled defaultValue={car.engine_power.toString()} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("cylinder")}</Label>
        <Input disabled defaultValue={car.cylinder.toString()} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("fuel")}</Label>
        <Input disabled defaultValue={car.fuel.toString()} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("co2")}</Label>
        <Input disabled defaultValue={car.co2.toString()} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("color")}</Label>
        <Input disabled defaultValue={car.color} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("number_keys")}</Label>
        <Input disabled defaultValue={car.number_keys.toString()} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("cer_of_conf")}</Label>
        <Input disabled defaultValue={car.cer_of_conf.toString()} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("inspection_form")}</Label>
        <Input disabled defaultValue={car.inspection_form.toString()} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("car_pass")}</Label>
        <Input disabled defaultValue={car.car_pass.toString()} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("register_cert")}</Label>
        <Input disabled defaultValue={car.register_cert.toString()} />
      </div>
    </Card>
  );
}
