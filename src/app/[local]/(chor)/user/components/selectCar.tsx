"use client";
import React, { useContext, useState } from "react";
import CarView, { type Car } from "./carView";
import { api } from "~/trpc/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useTranslations } from "next-intl";
import { ArrowRight, X } from "lucide-react";
import { UserContext } from "../context/userContext";

export default function SelectCar({
  company_id,
  setCarId,
}: {
  company_id: string;
  setCarId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [selectedCar, setSelectedCar] = useState<Car>();
  const { isCarOpen, setIsCarOpen, setClientIsOpen } = useContext(UserContext);
  const t = useTranslations("Car");
  const { data: cars } = api.car.getCompanyCars.useQuery(parseInt(company_id));

  const handelCarChange = (id: string) => {
    setCarId(id);
    const car = cars?.find((car: Car) => car.id.toString() === id);
    setSelectedCar(car);
  };
  const handelOpenChange = () => {
    setClientIsOpen(false);
    setIsCarOpen(true);
  };

  return (
    <div className="flex border">
      <div className="flex-1">
        {cars && cars.length > 0 ? (
          <Select
            onValueChange={handelCarChange}
            onOpenChange={handelOpenChange}
          >
            <SelectTrigger className="w-full">
              <div>
                <SelectValue placeholder={t("select_car")} />
              </div>
            </SelectTrigger>
            <SelectContent>
              {cars.map((car) => (
                <SelectItem value={car.id.toString()} key={car.id}>
                  {car.chassis_number}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <p>{t("no_car_yet")}</p>
        )}
      </div>

      {isCarOpen && selectedCar && (
        <div className="flex items-center transition delay-150 ease-in-out">
          <ArrowRight onClick={() => setIsCarOpen(false)} />
          <CarView selectedCar={selectedCar} />
        </div>
      )}
    </div>
  );
}
