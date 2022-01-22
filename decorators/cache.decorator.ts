import Redis from 'ioredis';

const Cache = (ttl: number) => {
  return (target: any, name: any, descriptor: any) => {
    const original = descriptor.value;

    if (typeof original === 'function') {
      descriptor.value = async function (...args: any) {
        const getKey = () => {
          return args
            .map((i) => {
              if (typeof i === 'object') return Object.entries(i);

              return i;
            })
            .flat()
            .join();
        };

        const redis = new Redis({
          host: process.env.REDIS_HOST || '127.0.0.1',
          port: parseInt(process.env.REDIS_PORT || '6379', 10),
          autoResendUnfulfilledCommands: false,
          maxRetriesPerRequest: 1,
          autoResubscribe: false,
        });
        const getVal = async () => {
          const result = await redis.get(getKey());

          if (result) return JSON.parse(result);
        };

        return new Promise(async (resolve, reject) => {
          redis.on('error', () => {
            redis.disconnect();
            resolve(original.apply(this, args));
          });

          try {
            let result = await getVal();

            if (!result) {
              result = await original.apply(this, args);

              await redis.set(
                getKey(),
                JSON.stringify(result || {}),
                'EX',
                ttl,
              );
            }

            resolve(result);
          } catch (e) {
            reject(e);
          }
        });
      };
    }
    return descriptor;
  };
};

export default Cache;
