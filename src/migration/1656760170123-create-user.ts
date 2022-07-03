import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUser1656760170123 implements MigrationInterface {
    name = 'createUser1656760170123'

    /**
     * @param queryRunner
     */
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fullName\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('ROLE_USER', 'ROLE_ADMIN') NOT NULL DEFAULT 'ROLE_USER', \`email\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`email_index\` (\`email\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    /**
     * @param queryRunner
     */
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`email_index\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
