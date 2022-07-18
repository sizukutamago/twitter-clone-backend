import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelation1658120531358 implements MigrationInterface {
  name = 'AddRelation1658120531358';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tweets\` ADD \`userId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tweets\` ADD CONSTRAINT \`FK_8039099215c037f10c11b0cf228\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tweets\` DROP FOREIGN KEY \`FK_8039099215c037f10c11b0cf228\``,
    );
    await queryRunner.query(`ALTER TABLE \`tweets\` DROP COLUMN \`userId\``);
  }
}
