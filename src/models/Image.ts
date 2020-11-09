import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Client from "./Client";

@Entity("imagesclient")
export default class Image {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Client, (client) => client.images)
  @JoinColumn({ name: "client_id" })
  client: Client;
}
