import { createClient } from 'redis';
import type { Handler, Request, Response, NextFunction } from 'express';

const client = createClient();
client.connect();

type CacheOptions = {
  time: number;
};

export const configureCache = (res: Response, next: NextFunction, options : CacheOptions) => {
  res.locals.cacheOptions = options;
  next();
};

export const withCache : Handler = async (req, res, next) => {
  const cacheKey = `${req.method}:${req.url}:${JSON.stringify(req.params)}:${JSON.stringify(req.query)}:${req.headers.authorization}:${JSON.stringify(req.body)}`;

  const options = res.locals.cacheOptions;

  if (await client.EXISTS(cacheKey)) {
    const cacheValue = await client.GET(cacheKey) as string;
    const cachedResponse = JSON.parse(cacheValue) as { body: any, status: number };
    return res.status(cachedResponse.status).json(cachedResponse.body);
  }

  const originalEnd = res.end;
  const originalWrite = res.write;
  const originalStatus = res.status;

  const bodyChunks : Buffer[] = [];
  let status : number;

  res.status = function(chunk) {
    status = chunk;
    return originalStatus.apply(res, arguments as any);
  }

  res.write = function(chunk) {
    bodyChunks.push(chunk);
    return originalWrite.apply(res, arguments as any);
  }
  
  res.end = async function(chunk) {
    bodyChunks.push(chunk);
    const body = JSON.parse(Buffer.concat(bodyChunks).toString());
    const response = {
      status,
      body,
    };
    const cacheValue = JSON.stringify(response);
    await client.SET(cacheKey, cacheValue);
    await client.EXPIRE(cacheKey, options?.time || 30);
    
    originalEnd.apply(res, arguments as any);
  }

  next();
};
