import * as pinning from '../../src/modules/pinning'
import * as file from '../../src/modules/file'
import * as collection from '../../src/modules/collection'
import { beeUrl, randomByteArray } from '../utils'
import { Collection } from '../../src/types'

const BEE_URL = beeUrl()

describe('modules/pin', () => {
  const invalidReference = '0000000000000000000000000000000000000000000000000000000000000000'
  const okResponse = {
    code: 200,
    message: 'OK',
  }

  describe('should work with files', () => {
    const randomData = randomByteArray(5000)

    it('should pin an existing file', async () => {
      const hash = await file.upload(BEE_URL, randomData)
      const response = await pinning.pinFile(BEE_URL, hash)

      expect(response).toEqual(okResponse)
    })

    it('should unpin an existing file', async () => {
      const hash = await file.upload(BEE_URL, randomData)
      const response = await pinning.unpinFile(BEE_URL, hash)

      expect(response).toEqual(okResponse)
    })

    it('should not pin a non-existing file', async () => {
      await expect(pinning.pinFile(BEE_URL, invalidReference)).rejects.toThrow('Not Found')
    })

    it('should not unpin a non-existing file', async () => {
      await expect(pinning.unpinFile(BEE_URL, invalidReference)).rejects.toThrow('Not Found')
    })
  })

  describe('should work with collections', () => {
    const testCollection: Collection<Uint8Array> = [
      {
        path: '0',
        data: Uint8Array.from([0]),
      },
      {
        path: '1',
        data: Uint8Array.from([1]),
      },
    ]

    it('should pin an existing collection', async () => {
      const hash = await collection.upload(BEE_URL, testCollection)
      const response = await pinning.pinCollection(BEE_URL, hash)

      expect(response).toEqual(okResponse)
    })

    it('should unpin an existing file', async () => {
      const hash = await collection.upload(BEE_URL, testCollection)
      const response = await pinning.unpinCollection(BEE_URL, hash)

      expect(response).toEqual(okResponse)
    })

    it('should not pin a non-existing file', async () => {
      await expect(pinning.pinCollection(BEE_URL, invalidReference)).rejects.toThrow('Not Found')
    })

    it('should not unpin a non-existing file', async () => {
      await expect(pinning.unpinCollection(BEE_URL, invalidReference)).rejects.toThrow('Not Found')
    })
  })
})