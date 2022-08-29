import { Session, serviceClients } from '@yandex-cloud/nodejs-sdk';
import { SymmetricDecryptRequest } from '@yandex-cloud/nodejs-sdk/dist/generated/yandex/cloud/kms/v1/symmetric_crypto_service.js';

export class KmsClient {
  /**
   * @param {Session} session
   * @param {string} keyId
   */
  constructor(session) {
    this.client = session.client(serviceClients.SymmetricCryptoServiceClient);
  }

  async decrypt(secret, keyId) {
    return this.client.decrypt(
      SymmetricDecryptRequest.fromPartial({
        ciphertext: secret,
        keyId,
      })
    );
  }
}
