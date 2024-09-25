// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';
import { Response } from 'node-fetch';

const client = new LlamaStackClient({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource jobs', () => {
  test('list', async () => {
    const responsePromise = client.postTraining.jobs.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.postTraining.jobs.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      LlamaStackClient.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.postTraining.jobs.list(
        { 'X-LlamaStack-ProviderData': 'X-LlamaStack-ProviderData' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LlamaStackClient.NotFoundError);
  });

  test('artifacts: only required params', async () => {
    const responsePromise = client.postTraining.jobs.artifacts({ job_uuid: 'job_uuid' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('artifacts: required and optional params', async () => {
    const response = await client.postTraining.jobs.artifacts({
      job_uuid: 'job_uuid',
      'X-LlamaStack-ProviderData': 'X-LlamaStack-ProviderData',
    });
  });

  test('cancel: only required params', async () => {
    const responsePromise = client.postTraining.jobs.cancel({ job_uuid: 'job_uuid' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('cancel: required and optional params', async () => {
    const response = await client.postTraining.jobs.cancel({
      job_uuid: 'job_uuid',
      'X-LlamaStack-ProviderData': 'X-LlamaStack-ProviderData',
    });
  });

  test('logs: only required params', async () => {
    const responsePromise = client.postTraining.jobs.logs({ job_uuid: 'job_uuid' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('logs: required and optional params', async () => {
    const response = await client.postTraining.jobs.logs({
      job_uuid: 'job_uuid',
      'X-LlamaStack-ProviderData': 'X-LlamaStack-ProviderData',
    });
  });

  test('status: only required params', async () => {
    const responsePromise = client.postTraining.jobs.status({ job_uuid: 'job_uuid' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('status: required and optional params', async () => {
    const response = await client.postTraining.jobs.status({
      job_uuid: 'job_uuid',
      'X-LlamaStack-ProviderData': 'X-LlamaStack-ProviderData',
    });
  });
});
