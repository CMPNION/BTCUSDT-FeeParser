import { HttpException, Injectable, HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SchedulerRegistry } from "@nestjs/schedule";
import { CacheService } from "../cache/cache.service";
import axios from "axios";
import { IBookTicker } from "src/interfaces/IBookTikcker.interface";
import { IPrices } from "src/interfaces/IPrices.interface";

@Injectable()
export class BurseService {
  private readonly cacheKey = "BTCUSDT_FEE";

  constructor(
    private readonly configService: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly cacheService: CacheService
  ) {
    const delay = this.configService.get<number>("update_delay");

    const interval = setInterval(() => this.defineBTCPriceFee(), delay * 1000); //Оно просто не запустит, если делэя не будет)
    this.schedulerRegistry.addInterval("btc-price-checker", interval);
  }

  async getBTCBookTicker(): Promise<IPrices> {
    try {
      const response = await axios.get(
        "https://api.binance.com/api/v3/ticker/bookTicker",
        {
          params: {
            symbol: "BTCUSDT",
          },
        }
      );
      const data: IBookTicker = response.data;

      const clearPrices: IPrices = {
        symbol: "BTCUSDT",
        bidPrice: +parseFloat(data.bidPrice).toFixed(8), //8 digits after comma
        askPrice: +parseFloat(data.askPrice).toFixed(8),
      };
      this.cacheService.delete(this.cacheKey);

      return clearPrices;
    } catch {
      throw new HttpException(
        "Error with binance API",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async defineBTCPriceFee() {
    let prices: IPrices = await this.getBTCBookTicker();
    const fee = 1 + this.configService.get<number>("service_fee") / 100;
    const fee1 = this.configService.get<number>("service_fee");

    prices.askPrice *= fee;
    prices.bidPrice *= fee;
    prices.averagePrice = (prices.askPrice + prices.bidPrice) / 2;
    this.cacheService.save(this.cacheKey, prices, 10);
    return prices;
  }

  async getBTCWithFee() {
    const data = this.cacheService.get(this.cacheKey);

    if (!data) {
      return await this.defineBTCPriceFee();
    }

    return data;
  }
}
