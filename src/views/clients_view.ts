import Client from "../models/Client";
import imagesView from "./images_view";

export default {
  render(client: Client) {
    return {
      id: client.id,
      name: client.name,
      latitude: Number(client.latitude),
      longitude: Number(client.longitude),
      whatsapp: client.whatsapp,
      products: client.products,
      instructions: client.instructions,
      opening_hours: client.opening_hours,
      open_on_weekends: client.open_on_weekends,
      images: imagesView.renderMany(client.images),
    };
  },

  renderMany(clients: Client[]) {
    return clients.map((client) => this.render(client));
  },
};
