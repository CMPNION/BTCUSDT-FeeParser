import { Module } from "@nestjs/common";
import { BurseService } from "./burse.service";
import { BurseController } from "./burse.controller";
import { ScheduleModule } from "@nestjs/schedule";
import { CacheModule } from "../cache/cache.module";

@Module({
  imports: [ScheduleModule.forRoot(), CacheModule],
  controllers: [BurseController],
  providers: [BurseService],
})
export class BurseModule {}
