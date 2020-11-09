import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Client from "../models/Client";
import * as Yup from "yup";

import clientView from "../views/clients_view";

export default {
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const clientsRepository = getRepository(Client);

    const client = await clientsRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return response.json(clientView.render(client));
  },

  async index(request: Request, response: Response) {
    const clientsRepository = getRepository(Client);

    const clients = await clientsRepository.find({ relations: ["images"] });

    return response.json(clientView.renderMany(clients));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      whatsapp,
      products,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const clientsRepository = getRepository(Client);

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      whatsapp,
      products,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === "true",
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required("Nome obrigatório"),
      latitude: Yup.number().required("Campo obrigatório"),
      longitude: Yup.number().required("Campo obrigatório"),
      whatsapp: Yup.number().required("Número obrigatório"),
      products: Yup.string().required("Campo obrigatório").max(500),
      instructions: Yup.string().required("Campo obrigatório"),
      opening_hours: Yup.string().required("Campo obrigatório"),
      open_on_weekends: Yup.boolean().required("Campo obrigatório"),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required("Imagem obrigatório"),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const client = clientsRepository.create(data);

    await clientsRepository.save(client);

    return response.status(201).json(client);
  },
};
