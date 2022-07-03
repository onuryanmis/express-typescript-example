import { MigrationInterface, QueryRunner } from 'typeorm';

export class createPost1656361730227 implements MigrationInterface {
    name = 'createPost1656361730227'

    /**
     * @param queryRunner
     */
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`content\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(100) NOT NULL, \`slug\` varchar(130) NOT NULL, \`description\` varchar(250) NOT NULL, \`content\` text NOT NULL, \`isActive\` tinyint NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`categoryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`content\` ADD CONSTRAINT \`FK_dedf4676dc7654f0320fcdc5d53\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    /**
     * @param queryRunner
     */
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`content\` DROP FOREIGN KEY \`FK_dedf4676dc7654f0320fcdc5d53\``);
        await queryRunner.query(`DROP TABLE \`content\``);
    }
}
