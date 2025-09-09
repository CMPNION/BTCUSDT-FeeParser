import { Module } from "@nestjs/common";
import { ConfigHostModule } from "./config/config.module";
import { CacheModule } from "./modules/cache/cache.module";
import { BurseModule } from "./modules/burse/burse.module";
@Module({
  imports: [ConfigHostModule, CacheModule, BurseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
