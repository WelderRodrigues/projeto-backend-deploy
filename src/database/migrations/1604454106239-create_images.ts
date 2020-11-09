import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1604454106239 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "imagesclient",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "path",
            type: "varchar",
          },
          {
            name: "client_id",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            name: "ImageClient",
            columnNames: ["client_id"],
            referencedTableName: "clients",
            referencedColumnNames: ["id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("imagesclient");
  }
}
