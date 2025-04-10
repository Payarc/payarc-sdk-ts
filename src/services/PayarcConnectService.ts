import axios, { AxiosResponse } from 'axios';
import { CommonService } from './CommonService';

interface PayarcTokenResponse {
  BearerTokenInfo?: {
    AccessToken?: string;
  };
  [key: string]: any;
}

interface PayarcTransactionResponse {
  ErrorCode?: number;
  [key: string]: any;
}

interface Seed {
  source: string;
}

export class PayarcConnectService {
    constructor(
        private bearerToken: string | null,
        private payarcConnectAccessToken: string | null,
        private payarcConnectBaseUrl: string,
        private commonService: CommonService
    ) { }
//   private bearerToken: string;
//   private payarcConnectAccessToken: string = '';
//   private payarcConnectBaseUrl: string;

//   constructor(bearerToken: string, baseUrl: string) {
//     this.bearerToken = bearerToken;
//     this.payarcConnectBaseUrl = baseUrl;
//   }

  private payarcConnectError(seed: Seed, data: any): any {
    // Implement your custom error logic
    console.error(seed, data);
    return data;
  }

  async pcLogin(): Promise<PayarcTokenResponse> {
    const seed = { source: 'Payarc Connect Login' };
    try {
      const requestBody = { SecretKey: this.bearerToken };
      const response: AxiosResponse<PayarcTokenResponse> = await axios.post(`${this.payarcConnectBaseUrl}/Login`, requestBody);
      const accessToken = response.data?.BearerTokenInfo?.AccessToken;
      // console.log('BaseUrl', this.payarcConnectBaseUrl);
      // console.log('AccessToken', accessToken);
      // console.log('Response', response.data);
      // console.log('BearerToken', this.bearerToken);
      if (accessToken) {
        this.payarcConnectAccessToken = accessToken;
      } else {
        return this.payarcConnectError(seed, response.data);
      }
      return response.data;
    } catch (error: any) {
      return CommonService.manageError(seed, error.response || {});
    }
  }

  async pcSale(tenderType: string, ecrRefNum: string, amount: string, deviceSerialNo: string): Promise<PayarcTransactionResponse> {
    return this.sendTransactionRequest({
      TransType: "SALE",
      TenderType: tenderType,
      ECRRefNum: ecrRefNum,
      Amount: amount,
      DeviceSerialNo: deviceSerialNo
    }, 'Payarc Connect Sale');
  }

  async pcVoid(payarcTransactionId: string, deviceSerialNo: string): Promise<PayarcTransactionResponse> {
    return this.sendTransactionRequest({
      TransType: "VOID",
      PayarcTransactionId: payarcTransactionId,
      DeviceSerialNo: deviceSerialNo
    }, 'Payarc Connect Void');
  }

  async pcRefund(amount: string, payarcTransactionId: string, deviceSerialNo: string): Promise<PayarcTransactionResponse> {
    return this.sendTransactionRequest({
      TransType: "REFUND",
      Amount: amount,
      PayarcTransactionId: payarcTransactionId,
      DeviceSerialNo: deviceSerialNo
    }, 'Payarc Connect Refund');
  }

  async pcBlindCredit(ecrRefNum: string, amount: string, token: string, expDate: string, deviceSerialNo: string): Promise<PayarcTransactionResponse> {
    return this.sendTransactionRequest({
      TransType: "RETURN",
      ECRRefNum: ecrRefNum,
      Amount: amount,
      Token: token,
      ExpDate: expDate,
      DeviceSerialNo: deviceSerialNo
    }, 'Payarc Connect Blind Credit');
  }

  async pcAuth(ecrRefNum: string, amount: string, deviceSerialNo: string): Promise<PayarcTransactionResponse> {
    return this.sendTransactionRequest({
      TransType: "AUTH",
      ECRRefNum: ecrRefNum,
      Amount: amount,
      DeviceSerialNo: deviceSerialNo
    }, 'Payarc Connect Auth');
  }

  async pcPostAuth(ecrRefNum: string, origRefNum: string, amount: string, deviceSerialNo: string): Promise<PayarcTransactionResponse> {
    return this.sendTransactionRequest({
      TransType: "POSTAUTH",
      ECRRefNum: ecrRefNum,
      OrigRefNum: origRefNum,
      Amount: amount,
      DeviceSerialNo: deviceSerialNo
    }, 'Payarc Connect Post Auth');
  }

  async pcLastTransaction(deviceSerialNo: string): Promise<PayarcTransactionResponse> {
    const seed = { source: 'Payarc Connect Last Transaction' };
    try {
      const response: AxiosResponse<PayarcTransactionResponse> = await axios.get(`${this.payarcConnectBaseUrl}/LastTransaction`, {
        headers: { Authorization: `Bearer ${this.payarcConnectAccessToken}` },
        params: { DeviceSerialNo: deviceSerialNo }
      });

      if (response.data?.ErrorCode !== 0) {
        return this.payarcConnectError(seed, response.data);
      }

      return response.data;
    } catch (error: any) {
      return CommonService.manageError(seed, error.response || {});
    }
  }

  async pcServerInfo(): Promise<any> {
    const seed = { source: 'Payarc Connect Server Info' };
    try {
      const response: AxiosResponse = await axios.get(`${this.payarcConnectBaseUrl}/ServerInfo`);
      return response.data;
    } catch (error: any) {
      return CommonService.manageError(seed, error.response || {});
    }
  }

  async pcTerminals(): Promise<PayarcTransactionResponse> {
    const seed = { source: 'Payarc Connect Terminals' };
    try {
      const response: AxiosResponse<PayarcTransactionResponse> = await axios.get(`${this.payarcConnectBaseUrl}/Terminals`, {
        headers: { Authorization: `Bearer ${this.payarcConnectAccessToken}` }
      });

      if (response.data?.ErrorCode !== 0) {
        return this.payarcConnectError(seed, response.data);
      }

      return response.data;
    } catch (error: any) {
      return CommonService.manageError(seed, error.response || {});
    }
  }

  private async sendTransactionRequest(body: Record<string, any>, source: string): Promise<PayarcTransactionResponse> {
    const seed = { source };
    try {
      const response: AxiosResponse<PayarcTransactionResponse> = await axios.post(`${this.payarcConnectBaseUrl}/Transactions`, body, {
        headers: { Authorization: `Bearer ${this.payarcConnectAccessToken}` }
      });

      if (response.data?.ErrorCode !== 0) {
        return this.payarcConnectError(seed, response.data);
      }

      return response.data;
    } catch (error: any) {
      return CommonService.manageError(seed, error.response || {});
    }
  }
}
