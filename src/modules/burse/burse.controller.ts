import { Get } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { BurseService } from "./burse.service";

@Controller("burse")
export class BurseController {
  constructor(private readonly burseService: BurseService) {}

  @Get("/price/BTCUSDT") //Я бы юзал параметры, но в ТЗ строго сказано БТСЮСДТ
  async getPriceWithFee() {
    return await this.burseService.getBTCWithFee();
  }
}
