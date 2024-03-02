"use client";
import React, { useState } from "react";
import CarView from "./carView";
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

export default function SelectCar({ company_id }: { company_id: string }) {
  const t = useTranslations("Car");
  const [selectedCar, setSelectedCar] = useState<string>("");
  const { data: cars } = api.car.getCompanyCars.useQuery(parseInt(company_id));
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex border">
      <div className="flex-1">
        {cars && cars.length > 0 ? (
          <Select
            onValueChange={setSelectedCar}
            onOpenChange={() => setIsOpen(true)}
          >
            <SelectTrigger className="w-full">
              <div>
                <SelectValue placeholder={t("select_car")} />
              </div>
            </SelectTrigger>
            <SelectContent>
              {cars.map((car, index) => (
                <SelectItem value={index.toString()} key={car.id}>
                  {car.chassis_number}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <p>No cars available</p>
        )}
      </div>
      {cars && cars.length > 0 && isOpen && parseInt(selectedCar) >= 0 && (
        <div className="flex items-center transition delay-150 ease-in-out">
          <ArrowRight onClick={() => setIsOpen(false)} />
          <CarView car={cars[parseInt(selectedCar)]} />
        </div>
      )}
    </div>
  );
}
