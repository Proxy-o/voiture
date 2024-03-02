import React from "react";
import { useTranslations } from "use-intl";
import { type z } from "zod";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { type createCarSchema } from "~/server/api/types";

// add id to carSchema
type carSchema = z.infer<typeof createCarSchema> & { id: number };
export default function CarView({ car }: { car: carSchema }) {
  const t = useTranslations("Car");
  return (
    <Card className="  grid  h-screen w-full gap-2 overflow-auto p-2 md:grid-cols-2">
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("chassis_number")}</Label>
        <Input disabled value={car.chassis_number} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("brand")}</Label>
        <Input disabled value={car.brand} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("model")}</Label>
        <Input disabled value={car.model} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("car_type")}</Label>
        <Input disabled value={car.car_type} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("transmission")}</Label>
        <Input
          disabled
          value={new Date(car.first_registration).toLocaleDateString()}
        />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("mileage")}</Label>
        <Input disabled value={car.mileage.toString()} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("engine_power")}</Label>
        <Input disabled value={car.engine_power.toString()} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("cylinder")}</Label>
        <Input disabled value={car.cylinder.toString()} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("fuel")}</Label>
        <Input disabled value={car.fuel.toString()} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("co2")}</Label>
        <Input disabled value={car.co2.toString()} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("color")}</Label>
        <Input disabled value={car.color} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("number_keys")}</Label>
        <Input disabled value={car.number_keys.toString()} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("cer_of_conf")}</Label>
        <Input disabled value={car.cer_of_conf.toString()} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("inspection_form")}</Label>
        <Input disabled value={car.inspection_form.toString()} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("car_pass")}</Label>
        <Input disabled value={car.car_pass.toString()} />
      </div>
      <div className="space-y-2 border p-2 shadow-md">
        <Label className="font-light">{t("register_cert")}</Label>
        <Input disabled value={car.register_cert.toString()} />
      </div>
    </Card>
  );
}
