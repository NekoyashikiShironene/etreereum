"use client";

import { useContract } from "@/contexts/ContractContext";
import { useWallet } from "@/contexts/WalletContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner"
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import type { TTreeType } from "@/types/tree";

import { mintTree } from "@/actions/nftree";


export default function NFTCollection() {
  const { accountAddress } = useWallet();
  const { nftreeContract } = useContract();
  const { balance } = nftreeContract;

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("12:00");
  const [currentLocaltion, setCurrentLocation] = useState({
    latitude: 13,
    longitude: 100
  });

  const [treeTypes, setTreeTypes] = useState<TTreeType[]>([]);

  useEffect(() => {
    const fetchTreeType = async () => {
      const response = await fetch("/api/trees/types");
      const json = await response.json();
      setTreeTypes(json.data);
    }

    fetchTreeType();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.info("Sending tree request...");
    const formData = new FormData(e.currentTarget);

    if (date) {
      const [hours, minutes] = time.split(":").map(Number)
      const dateTime = new Date(date)
      dateTime.setHours(hours, minutes, 0, 0)
      const unixTimestamp = Math.floor(dateTime.getTime() / 1000)
      formData.set("plantedAt", dateTime.toISOString())
      formData.set("plantedAtTimestamp", unixTimestamp.toString())
    }

    const result = await mintTree(formData);

    if (result.error) {
      console.error("Minting Error:", { description: result.message });
      toast.error("Sending error", {
        description: typeof result.message === "string" ? result.message : "An unknown error occurred."
      });
    }

    else
      toast.success("Succeed!");
  }


  useEffect(() => {

    function success(position: { coords: { latitude: number; longitude: number; }; }) {
      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    }

    function error() {}
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [])



  return (
    <div className="bg-green-100 rounded-xl p-6 shadow">
      <h3 className="text-lg font-medium mb-2">NFT Collection</h3>
      <p className="text-3xl font-bold text-green-700">{typeof balance === "string" ? `${balance} Trees` : "Loading..."}</p>
      <button className="mt-4 border px-4 py-1 rounded bg-white hover:bg-gray-100">
        🌲 View Gallery
      </button>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">🌲 Mint Tree</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Mint a New Tree</DialogTitle>
            <DialogDescription>Enter the details to mint a new tree NFT.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="accountAddress" className="text-left">
                  Owner Address
                </Label>
                <Input
                  id="accountAddress"
                  name="accountAddress"
                  className="col-span-3"
                  placeholder="0x..."
                  defaultValue={accountAddress}
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="latitude" className="text-left">
                  Latitude
                </Label>
                <Input
                  id="latitude"
                  name="latitude"
                  type="number"
                  step="0.000001"
                  className="col-span-3"
                  defaultValue={currentLocaltion.latitude}
                  onChange={(e) => setCurrentLocation(prev => ({...prev, latitude: Number(e.target.value)}))}
                  placeholder="e.g. 37.7749"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="longitude" className="text-left">
                  Longitude
                </Label>
                <Input
                  id="longitude"
                  name="longitude"
                  type="number"
                  step="0.000001"
                  className="col-span-3"
                  defaultValue={currentLocaltion.longitude}
                  onChange={(e) => setCurrentLocation(prev => ({...prev, longitude: Number(e.target.value)}))}
                  placeholder="e.g. -122.4194"
                  required
                />
              </div>
              <iframe src={`https://maps.google.com/maps?q=+${currentLocaltion.latitude}+,+${currentLocaltion.longitude}+&hl=en&z=14&output=embed`} className="w-full" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="treeType" className="text-left">
                  Tree Type
                </Label>
                <div className="col-span-3">
                  <Select name="treeType" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tree type" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        treeTypes.map((tree: TTreeType) => (
                          <SelectItem key={tree.typeId} value={tree.typeId.toString()}>{tree.type}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plantingDate" className="text-left">
                  Planting Date
                </Label>
                <div className="col-span-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <input type="hidden" name="plantingDate" value={date ? format(date, "yyyy-MM-dd") : ""} />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plantingTime" className="text-left">
                  Planting Time
                </Label>
                <div className="col-span-3 flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="plantingTime"
                    name="plantingTime"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="treeImage" className="text-right">
                  Tree Image
                </Label>
                <div className="col-span-3">
                  <Input
                    id="treeImage"
                    name="treeImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <Image
                        src={imagePreview || "/placeholder.svg"}
                        width={200}
                        height={200}
                        alt="Tree preview"
                        className="max-h-32 rounded-md object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Mint Tree</Button>
              </DialogClose>
            </DialogFooter>
          </form>

        </DialogContent>
      </Dialog>
    </div>
  );
}
