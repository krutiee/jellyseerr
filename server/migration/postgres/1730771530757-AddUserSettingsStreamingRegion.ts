import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserSettingsStreamingRegion1727907530757
  implements MigrationInterface
{
  name = 'AddUserSettingsStreamingRegion1727907530757';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_user_settings" (
        "id" SERIAL PRIMARY KEY,
        "notificationTypes" text,
        "discordId" varchar,
        "userId" integer,
        "originalLanguage" varchar,
        "telegramChatId" varchar,
        "telegramSendSilently" boolean,
        "pgpKey" varchar,
        "locale" varchar NOT NULL DEFAULT '',
        "pushbulletAccessToken" varchar,
        "pushoverApplicationToken" varchar,
        "pushoverUserKey" varchar,
        "watchlistSyncMovies" boolean,
        "watchlistSyncTv" boolean,
        "pushoverSound" varchar,
        CONSTRAINT "UQ_986a2b6d3c05eb4091bb8066f78" UNIQUE ("userId"),
        CONSTRAINT "FK_986a2b6d3c05eb4091bb8066f78" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
      )`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user_settings"(
        "id", "notificationTypes", "discordId", "userId", "originalLanguage", "telegramChatId", "telegramSendSilently", "pgpKey", "locale", "pushbulletAccessToken", "pushoverApplicationToken", "pushoverUserKey", "watchlistSyncMovies", "watchlistSyncTv", "pushoverSound"
      ) SELECT
        "id", "notificationTypes", "discordId", "userId", "originalLanguage", "telegramChatId", "telegramSendSilently", "pgpKey", "locale", "pushbulletAccessToken", "pushoverApplicationToken", "pushoverUserKey", "watchlistSyncMovies", "watchlistSyncTv", "pushoverSound"
      FROM "user_settings"`
    );
    await queryRunner.query(`DROP TABLE "user_settings"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_user_settings" RENAME TO "user_settings"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_settings" ADD COLUMN "discoverRegion" varchar`
    );
    await queryRunner.query(
      `ALTER TABLE "user_settings" ADD COLUMN "streamingRegion" varchar`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_settings" DROP COLUMN "streamingRegion"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_settings" DROP COLUMN "discoverRegion"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_settings" RENAME TO "temporary_user_settings"`
    );
    await queryRunner.query(
      `CREATE TABLE "user_settings" (
        "id" SERIAL PRIMARY KEY,
        "notificationTypes" text,
        "discordId" varchar,
        "userId" integer,
        "originalLanguage" varchar,
        "telegramChatId" varchar,
        "telegramSendSilently" boolean,
        "pgpKey" varchar,
        "locale" varchar NOT NULL DEFAULT '',
        "pushbulletAccessToken" varchar,
        "pushoverApplicationToken" varchar,
        "pushoverUserKey" varchar,
        "watchlistSyncMovies" boolean,
        "watchlistSyncTv" boolean,
        "pushoverSound" varchar,
        CONSTRAINT "UQ_986a2b6d3c05eb4091bb8066f78" UNIQUE ("userId"),
        CONSTRAINT "FK_986a2b6d3c05eb4091bb8066f78" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
      )`
    );
    await queryRunner.query(
      `INSERT INTO "user_settings"(
        "id", "notificationTypes", "discordId", "userId", "originalLanguage", "telegramChatId", "telegramSendSilently", "pgpKey", "locale", "pushbulletAccessToken", "pushoverApplicationToken", "pushoverUserKey", "watchlistSyncMovies", "watchlistSyncTv", "pushoverSound"
      ) SELECT
        "id", "notificationTypes", "discordId", "userId", "originalLanguage", "telegramChatId", "telegramSendSilently", "pgpKey", "locale", "pushbulletAccessToken", "pushoverApplicationToken", "pushoverUserKey", "watchlistSyncMovies", "watchlistSyncTv", "pushoverSound"
      FROM "temporary_user_settings"`
    );
    await queryRunner.query(`DROP TABLE "temporary_user_settings"`);
  }
}