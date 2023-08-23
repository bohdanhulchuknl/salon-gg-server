import { Request } from "express";
import ServiceGroup from "../models/ServiceGroup.model";
import Service from "../models/Service.model";

//service
export const checkIsProvideBodyCreateService = (req: Request) => {
  const { title, price, time, serviceGroup, editors } = req.body;

  if (!title || typeof title !== "object") {
    throw new Error("Title must be provide or title type isn`t object");
  } else {
    if (!title.ua || title.ua.length === 0)
      throw new Error(`Title UA must be provide`);
    if (!title.pl || title.pl.length === 0)
      throw new Error(`Title PL must be provide`);
  }

  if (!price || typeof price !== "object") {
    throw new Error("Price must be provide");
  } else {
    if (!price.junior) throw new Error("Price.junior must be provide");
    if (!price.middle) throw new Error("Price.middle must be provide");
    if (!price.senior) throw new Error("Price.senior must be provide");
  }
  if (!time) throw new Error("Time must be provide");
  if (!serviceGroup) throw new Error("Service group must be provide");
};

export const checkIsServiceExist = async ({
  title,
}: {
  title: { ua: string; pl: string };
}) => {
  const serviceInDB = await Service.find().or([
    { "title.ua": title.ua.trim() },
    { "title.pl": title.pl.trim() },
  ]);
  if (serviceInDB.length)
    throw new Error(
      `Service with title ${title.ua} or ${title.pl} already exist`
    );
};

export const storeNewServiceInDb = async ({
  price,
  serviceGroup,
  time,
  title,
  editors,
}: {
  title: string;
  price: number;
  time: number;
  serviceGroup: string;
  editors: string[];
}) => {
  const serviceGroupInDB = await ServiceGroup.findById(serviceGroup);

  if (!serviceGroupInDB)
    throw new Error(`Service group with id ${serviceGroup} don't found`);

  const newService = new Service({ price, serviceGroup, time, title, editors });
  await newService.save();
  serviceGroupInDB.variants.push(newService._id);
  await serviceGroupInDB.save();
  return await newService.populate("serviceGroup");
};

//service group
export const checkIsProvideBodyCreateServiceGroup = (req: Request) => {
  const { title } = req.body;

  if (!title || typeof title !== "object") {
    throw new Error("Title must be provide or type of title isn`t object");
  } else {
    if (!title.ua || !title.ua.length)
      throw new Error("Title UA must be provide");
    if (!title.pl || !title.pl.length)
      throw new Error("Title PL must be provide");
  }
};

export const checkIsGroupExist = async (title: { ua: string; pl: string }) => {
  const group = await ServiceGroup.find().or([
    { "title.ua": title.ua.trim() },
    { "title.pl": title.pl.trim() },
  ]);
  if (group.length)
    throw new Error(
      `Service group with title ${title.pl} or ${title.ua} already exist`
    );
};

export const storeNewServiceGroupInDB = async (
  title: string,
  variants: string[]
) => {
  const newServiceGroup = new ServiceGroup({ title, variants });
  return await newServiceGroup.save();
};
